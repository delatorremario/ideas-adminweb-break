import { Meteor } from 'meteor/meteor';

import States from '../../api/states/states';
import Ideas from '../../api/ideas/ideas';

Meteor.methods({
    'manages.states': () => {
        // role this user
        if (!Meteor.isServer) return;

        const { roles } = Meteor.user();
        const states = States.aggregate([
            { $unwind: '$roles' },
            { $match: { 'roles.role': { $in: roles } } },
            { $group: { _id: '$roles.title', codes: { $addToSet: '$code' } } },
            { $project: { _id: 0, title: '$_id', codes: 1 } },
        ]);

        _.map(states, state => {

            const codesFilter = [];
            _.each(state.codes, code => {
                codesFilter.push({ $where: `this.states[this.states.length - 1].code === '${code}'` })
            })

            const ideas = Ideas.find({
                $or: codesFilter
            }).fetch();
            _.extend(state, { ideas, count: ideas.length });
            return state;
        })
        return _.sortBy(states, 'codes');
    }
})