import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import _ from 'lodash';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Email } from 'meteor/email';

import Ideas from './ideas';
import rateLimit from '../../modules/rate-limit.js';
import PersonSchema from '../../api/persons/personSchema';
import States from '../../api/states/states';

export const upsertIdea = new ValidatedMethod({
    name: 'ideas.upsert',
    validate: new SimpleSchema({

        _id: { type: String, optional: true },
        userId: { type: String, optional: true },
        corporationId: { type: String, optional: true },
        createdAt: { type: Date, optional: true },
        date: { type: Date },
        origin: { type: String },
        person: { type: PersonSchema },
        chief: { type: PersonSchema },
        description: { type: String },
        opportunity: { type: String },
        drivers: { type: [String] },
        collaborators: { type: [PersonSchema], optional: true },
        states: { type: [States.schema], optional: true },

    }).validator(),
    run(idea) {
        return Ideas.upsert({ _id: idea._id }, { $set: idea }, (err, data) => {
            if (err) { console.log('ERROR', err); return; }
            if (Meteor.isServer) {
                const ideastate = _.last(idea.states);
                const states = States.find({ _id: ideastate._id, 'alerts.stateChange': true }).fetch();
                
                _.each(states, state => {
                    _.each(state.alerts, alert =>{
                        if (alert.stateChange) {
                            const to = ['mauricio.ma.rodriguez@bhpbilliton.com', 'dblazina@holos.cl ', 'mariodelatorre@holos.cl']
        
                            const from = 'Ideas 3.0 <no-replay@ideas.e-captum.com>';
                            const subject = `Cambio al estado ${state.step} ${state.state}`;
                            const text = `${alert.message}. La idea de ${idea.person.lastName}, ${idea.person.firstName} ${idea.person.secondName} cambió de estado`;
        
                            Email.send({ to, from, subject, text });
                            console.log('Email enviado ***', alert.message);
        
                        }
                    })
                   
                })
               
            }
        });
    },
});

export const removeIdea = new ValidatedMethod({
    name: 'ideas.remove',
    validate: new SimpleSchema({
        _id: { type: String },
    }).validator(),
    run({ _id }) {
        Ideas.remove(_id);
    },
});

rateLimit({
    methods: [
        upsertIdea,
        removeIdea,
    ],
    limit: 5,
    timeRange: 1000,
});

Meteor.methods({
    'getIdeasByIds': (ids) => {
        check(ids, [String]);
        if (!Meteor.isServer) return;
        return Ideas.aggregate([
            { $match: { _id: { $in: ids } } },
            { $lookup: { from: 'areas', foreignField: '_id', localField: 'chief.areaId', as: 'destinationarea' } },
            { $unwind: '$destinationarea' },
            { $lookup: { from: 'areas', foreignField: '_id', localField: 'person.areaId', as: 'personarea' } },
            { $unwind: '$personarea' },
            { $sort: { date: 1 } },
        ]);
    }
})