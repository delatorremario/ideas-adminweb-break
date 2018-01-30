import { Meteor } from 'meteor/meteor';

import States from '../../api/states/states';
import Ideas from '../../api/ideas/ideas';
import Areas from '../../api/areas/areas';

Meteor.methods({
    'manages.states': () => {
        // role this user
        if (!Meteor.isServer) return;
        const user = Meteor.user();
        if (!user) return;
        if (!Roles.userIsInRole(user._id, ['Leader','Executive','Employee'])) return;
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
                'chief.areaId': { $in: families }
            })
        }
        if (Roles.userIsInRole(user._id, ['Executive'])) {
             _.extend(filters, {
                'chief._id': user && user.profile && user.profile._id
            })
        }
        if (Roles.userIsInRole(user._id, ['Employee'])) {
            let families = [];
            _.extend(filters, {
                'person._id': user && user.profile._id
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