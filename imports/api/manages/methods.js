import { Meteor } from 'meteor/meteor';

import States from '../../api/states/states';
import Ideas from '../../api/ideas/ideas';
import Areas from '../../api/areas/areas';

Meteor.methods({
    'manages.states': () => {
        // role this user
        if (!Meteor.isServer) return;

        const { roles, profile } = Meteor.user();
        const states = States.aggregate([
            { $unwind: '$roles' },
            { $match: { 'roles.role': { $in: roles } } },
            { $group: { _id: '$roles.title', codes: { $addToSet: '$code' } } },
            { $project: { _id: 0, title: '$_id', codes: 1 } },
        ]);

        const filters = {}

        const area = Areas.findOne({ _id: profile && profile.leaderAreaId })
        _.extend(filters, {
            $or: [
                { 'person._id': profile && profile._id },
                { 'chief.areaId': { $in: area && area.family } }
            ]
        })

        _.map(states, state => {

            const codesFilter = [];
            _.each(state.codes, code => {
                codesFilter.push({ $where: `this.states[this.states.length - 1].code === '${code}'` })
            })
            _.extend(filters, { $or: codesFilter })
            const ideas = Ideas.find(filters).fetch();
            _.extend(state, { ideas, count: ideas.length });
            return state;
        })
        return _.sortBy(states, 'codes');
    }
})