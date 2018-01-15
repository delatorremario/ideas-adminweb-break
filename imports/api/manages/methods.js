import { Meteor } from 'meteor/meteor';

import States from '../../api/states/states';
import Ideas from '../../api/ideas/ideas';
import Areas from '../../api/areas/areas';

Meteor.methods({
    'manages.states': () => {
        // role this user
        if (!Meteor.isServer) return;
        const user = Meteor.user();
        const { roles, profile } = user;
        const states = States.aggregate([
            { $unwind: '$roles' },
            { $match: { 'roles.role': { $in: roles } } },
            { $group: { _id: '$roles.title', codes: { $addToSet: '$code' } } },
            { $project: { _id: 0, title: '$_id', codes: 1 } },
        ]);

        const filters = {}

        if (Roles.userIsInRole(user._id, ['Leader'])) {
            const areas = Areas.find({ _id: { $in: user.profile.leaderAreasIds || [] } }).fetch();
            let families = [];
            _.each(areas, area => families = _.union(families, area.family))
            _.extend(filters, {
                // $or: [
                // { 'person._id': user && user.profile._id },
                //{
                'chief.areaId': { $in: families }
                //}
                // ]
            })
        }
        if (Roles.userIsInRole(user._id, ['Employee'])) {
            // const areas = Areas.find({ _id: { $in: user.profile.leaderAreasIds } }).fetch();
            //console.log('AREAS ', areas);
            let families = [];
            //_.each(areas, area => families = _.union(families, area.family))
            _.extend(filters, {
                // $or: [
                // { 
                'person._id': user && user.profile._id
                //},
                //{
                //'chief.areaId': { $in: families }
                //}
                // ]
            })
        }

        _.map(states, state => {
            const ideafilter = filters;
            const codesFilter = [];
            _.each(state.codes, code => {
                codesFilter.push({ $where: `this.states[this.states.length - 1].code === '${code}'` })
            })
            _.extend(ideafilter, { $or: codesFilter })
            const ideas = Ideas.find(ideafilter).fetch();
            _.extend(state, { ideas, count: ideas.length });
            return state;
        })
        return _.sortBy(states, 'codes');
    }
})