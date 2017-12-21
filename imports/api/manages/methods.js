import { Meteor } from 'meteor/meteor';

import States from '../../api/states/states';
import Ideas from '../../api/ideas/ideas';

Meteor.methods({
    'manages.states': () => {
        const states = States.aggregate([
            { $match: { roles: 'Executive' } },
            { $group: { _id: '$title', codes: { $addToSet: '$code' } } },
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
            _.extend(state, { ideas , count: ideas.length });
            return state;
        })
        return _.sortBy(states, 'codes');
    }
})