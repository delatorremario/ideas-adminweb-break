import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import _ from 'lodash';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Email } from 'meteor/email';
import moment from 'moment';
import Ideas from './ideas';
import rateLimit from '../../modules/rate-limit.js';
import PersonSchema from '../../api/persons/personSchema';
import States from '../../api/states/states';
import Areas from '../../api/areas/areas';

import { findLeader } from '../../api/areas/methods';


const ViewerSchema = new SimpleSchema({
    userId: { type: String },
    viewedAt: { type: Date, optional: true }
})

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
        chief: { type: PersonSchema, optional: true },
        description: { type: String },
        opportunity: { type: String },
        drivers: { type: [String] },
        collaborators: { type: [PersonSchema], optional: true },
        states: { type: [States.schema] },
        images: { type: [String], optional: true },
        viewers: { type: [ViewerSchema], optional: true }

    }).validator(),
    run(idea) {
        return Ideas.upsert({ _id: idea._id }, { $set: idea }, (err, result) => {
            if (err) { console.log('ERROR', err); return; }
            if (!Meteor.isServer) return;
            Meteor.call('sendAlertChangeState', result.insertedId, (err, data) => {
                if (err) { console.log('ERROR', err); return; }
                console.log('--result sendAlertChangeState--', data);
            });
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
        const ideas = Ideas.aggregate([
            { $match: { _id: { $in: ids } } },
            { $lookup: { from: 'areas', foreignField: '_id', localField: 'chief.areaId', as: 'destinationarea' } },
            { $unwind: '$destinationarea' },
            { $lookup: { from: 'areas', foreignField: '_id', localField: 'person.areaId', as: 'personarea' } },
            { $unwind: '$personarea' },
            { $sort: { date: 1 } },
        ]);
        _.map(ideas,idea=>{
            const area = Areas.findOne({ code: idea.chief && idea.chief.areaCode })
            const leader = findLeader(area);
            _.extend(idea, { leader });
        })
        return ideas;
    },
    'idea.setState': (_id, state) => {
        if (!Meteor.isServer) return;
        check(_id, String);
        check(state, Object);

        _.extend(state, { createdAt: new Date })

        const update = { $push: { states: state } };

        _.map(state.toChanges, onchange => {
            if (onchange.chief) _.extend(update, { $set: { chief: onchange.chief } })
        })

        Ideas.update({ _id }, update, (err) => {
            if (err) { console.log(err); return }
            Meteor.call('sendAlertChangeState', _id, (err) => {
                if (err) { console.log(err); return }
            })
        });
    },
    'idea.saveComment': (_id, comment) => {
        check(_id, String);
        check(comment, Object);
        Ideas.update({ _id }, { $push: { comments: comment } });
    },
    'idea.readComment': (_id, index) => {
        if (!Meteor.isServer) return;
        check(_id, String);
        check(index, Number);

        const idea = Ideas.findOne(_id);

        _.map(idea.comments[index].viewers, viewer => {
            return (viewer.userId === Meteor.userId()) && _.extend(viewer, { viewedAt: new Date })
        })

        Ideas.update({ _id }, { $set: { comments: idea.comments } });

    },
    'idea.addViewers': (_id) => {
        if (!Meteor.isServer) return;
        check(_id, String);

        let viewers = [];
        const idea = Ideas.findOne(_id);

        // owner
        const owner = Meteor.users.findOne({ 'emails.address': idea.person.email })
        if (owner) viewers.push({ userId: owner._id, group: 'owner' });

        // leaders
        const area = Areas.findOne({ _id: idea.chief.areaId });
        const profile = findLeader(area);
        const leaders = Meteor.users.find({ profile }, { fields: { _id: 1 } }).fetch();
        viewers = _.union(viewers, _.map(leaders, u => ({ userId: u._id, group: 'leader' })));

        // chief
        if (idea.chief && idea.chief.email) {
            const chief = Meteor.users.findOne({ 'emails.address': idea.chief.email })
            if (chief) viewers = _.union(viewers, [{ userId: chief._id, group: 'chief' }])
        };

        // collaborators
        if (idea.collaborators) {
            const collMails = _.map(idea.collaborators, 'email')
            const collaborators = Meteor.users.find({ 'emails.address': { $in: collMails } }).fetch()
            viewers = _.union(viewers, _.map(collaborators, u => ({ userId: u._id, group: 'collaborator' })));
        }

        // viewers = _.map(viewers, id => ({ userId: id }));
        Ideas.update({ _id }, { $set: { viewers } });
        return Ideas.findOne({ _id });
    },
    'idea.setAllViewers': () => {
        const ideas = Ideas.find({}, { fields: { _id: 1 } }).fetch();
        _.each(ideas, idea => Meteor.call('idea.addViewers', idea._id));
    }
})