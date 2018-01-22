import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import _ from 'lodash';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Email } from 'meteor/email';
import moment from 'moment';
import Ideas from './ideas';
import rateLimit from '../../modules/rate-limit.js';
import PersonSchema from '../../api/persons/personSchema';
import States from '../../api/states/states';
import { Meteor } from 'meteor/meteor';

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
        return Ideas.upsert({ _id: idea._id }, { $set: idea }, (err, data) => {
            if (err) { console.log('ERROR', err); return; }
            if (Meteor.isServer) {
                const ideastate = _.last(idea.states);
                const states = States.find({ _id: ideastate._id, 'alerts.stateChange': true }).fetch();

                _.each(states, state => {
                    _.each(state.alerts, alert => {
                        if (alert.stateChange) {
                            const to = ['mauricio.ma.rodriguez@bhpbilliton.com', 'dblazina@holos.cl ', 'mariodelatorre@holos.cl']

                            const from = 'Ideas 3.0 <no-replay@ideas.e-captum.com>';
                            const subject = `Cambio al estado ${state.step} ${state.state}`;
                            const text = `${alert.message}. La idea de ${idea.person.lastName}, ${idea.person.firstName} ${idea.person.secondName} cambió de estado`;

                            Email.send({ to, from, subject, text });
                            Meteor.call('alerts.upsert', {
                                createdAt: moment().locale('es'),
                                userOwner: Meteor.userId(),
                                type: 'normal-notification',
                                usersDestination: _.map(idea.viewers, v => v.userId),
                                state: 'new',
                                body: {
                                    title: idea && idea.oportunity || 'Alerta de retraso!',
                                    message: text,
                                },
                                path: `/idea/${idea._id}/view`
                            });
                            Meteor.call('userNotification',
                                (idea && idea.oportunity || 'Alerta de retraso!'),
                                text,
                                (_.map(idea.viewers, v => v.userId))
                            )

                            console.log('Email enviado ***', alert.message);
                        }
                    })

                })

            }
            Meteor.call('idea.addViewers', data.insertedId);
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

        Ideas.update({ _id }, update);
        Meteor.call('idea.addViewers', _id)
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
        if (owner) viewers.push(owner._id);

        // leaders
        const leaders = Meteor.users.find({ roles: 'Leader' }, { fields: { _id: 1 } }).fetch();
        viewers = _.union(viewers, _.map(leaders, '_id'));

        // chief
        if (idea.chief && idea.chief.email) {
            const chief = Meteor.users.findOne({ 'emails.address': idea.chief.email })
            if (chief) viewers = _.union(viewers, [chief._id])
        };

        // // collaborators
        if (idea.collaborators) {
            const collMails = _.map(idea.collaborators, 'email')
            const collaborators = Meteor.users.find({ 'emails.address': { $in: collMails } }).fetch()
            viewers = _.union(viewers, _.map(collaborators, '_id'));
        }

        viewers = _.map(viewers, id => ({ userId: id }));
        Ideas.update({ _id }, { $set: { viewers } });
    },
    'idea.setAllViewers': () => {
        const ideas = Ideas.find({}, { fields: { _id: 1 } }).fetch();
        _.each(ideas, idea => Meteor.call('idea.addViewers', idea._id));
    }
})