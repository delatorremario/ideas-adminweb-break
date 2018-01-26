import { Meteor } from "meteor/meteor";
import _ from 'lodash';
import moment from 'moment';
import { Email } from 'meteor/email';
import States from '../../imports/api/states/states';
import Ideas from '../../imports/api/ideas/ideas';

Meteor.startup(() => {
    Meteor.setInterval(() => {
        Meteor.call('sendAlertsTemporals')
    }, 86400000)
})

Meteor.methods({
    sendAlertsTemporals: () => {
        // buscar los estados configurados

        const filters = {
            // corporationId: (user.profile && user.profile.corporationId) || '',
            'alerts.temporal': true,
        };

        const states = States.find(filters).fetch();

        _.each(states, state => {
            // console.log('state.code', state.code);
            // buscar las ideas con ese estado
            const ideas = Ideas.find({
                $where: () => {
                    return _.last(this.states).code === state.code
                }
            }).fetch();
            _.each(ideas, idea => {
                const last = _.last(idea.states);
                // console.log('last:', last.code);
                // console.log('delay:', moment(last.createdAt).format('DD MMM YYYY'));
                const a = moment();
                const b = moment(last.createdAt);
                const diff = a.diff(b, 'days') // 1
                _.each(state.alerts, alert => {
                    if (!alert.temporal) return;
                    console.log('diff', diff);
                    console.log('config', alert.delay);
                    if (diff >= alert.delay) {

                        console.log('** :D ALEEEERT **');
                        const usersTo = Meteor.users.find({ _id: { $in: _.map(idea.viewers, 'userId') } }).fetch()
                        // const to = _.map(usersTo, u => (u.emails[0].address))
                        // const to = ['mauricio.ma.rodriguez@bhpbilliton.com', 'dblazina@holos.cl ', 'mariodelatorre@holos.cl', 'martingonzalez@holos.cl']

                        const from = 'Ideas 3.0 <no-replay@ideas.e-captum.com>';
                        const subject = 'Alerta!!';
                        const text = (alert.message || '') + `. La idea de ${idea.person.lastName}, ${idea.person.firstName} ${idea.person.secondName} tiene un atraso de ${diff} días`;

                        Meteor.call('userNotification',
                            (idea && idea.oportunity || 'Alerta de retraso!'),
                            text,
                            (_.map(idea.viewers, v => v.userId))
                        )

                        if (alert.sendEmail) {
                            const to = _.map(usersTo, u => (u.emails[0].address))
                            console.log('--alert.sendEmail to --', to);
                            console.log('Envío de Email ***', Email.send({ to, from, subject, text }));
                        }
                        
                        if (alert.sendInbox) {
                            Meteor.call('alerts.upsert', {
                                createdAt: new Date(),
                                userOwner: Meteor.userId(),
                                type: 'normal-notification',
                                usersDestination: (_.map(viewers, v => v.userId)),
                                state: 'new',
                                body: {
                                    title: subject,
                                    message: text,
                                },
                                path: `/idea/${idea._id}/view`
                            }, (err, data) => {
                                if (err) { console.log('err alerts.upsert', err) };
                                console.log('--alerts.upsert to --', _.map(viewers, v => v.userId), data);
                            });
                        }
                    }
                    else {
                        console.log('** :( no alert **');
                    }
                })
            })
        })
    },
    sendAlertChangeState: (ideaId) => {
        console.log('--sendAlertChangeState--', ideaId);
        check(ideaId, String);
        
        if (!Meteor.isServer) return;
        Meteor.call('idea.addViewers', ideaId, (err, idea) => {
            if (err) { console.log('ERROR', err); return; }
            const viewers = _.filter(idea.viewers, v => v.userId !== Meteor.userId());
            const ideastate = _.last(idea.states);
            const state = States.findOne({ _id: ideastate._id, 'alerts.stateChange': true });
            _.map(state.alerts, alert => {
                if (alert.stateChange) {
                    const usersTo = Meteor.users.find({ _id: { $in: _.map(viewers, 'userId') } }).fetch()
                    // const to = ['mauricio.ma.rodriguez@bhpbilliton.com', 'dblazina@holos.cl ', 'mariodelatorre@holos.cl', 'martingonzalez@holos.cl'];
                    const from = 'Ideas 3.0 <no-replay@ideas.e-captum.com>';
                    const subject = `Cambio al estado ${state.step} ${state.state}`;
                    const text = `${(alert.message ? alert.message + '. ' : '')}La idea de ${idea.person.lastName}, ${idea.person.firstName} ${idea.person.secondName || ''} cambió de estado.`;

                    Meteor.call('userNotification',
                        subject,
                        text,
                        (_.map(viewers, v => v.userId))
                        , (err, data) => {
                            if (err) { console.log('err userNotification', err) };
                            console.log('--userNotification to --', _.map(idea.viewers, v => v.userId), data);
                        })

                    if (alert.sendInbox) {
                        Meteor.call('alerts.upsert', {
                            createdAt: new Date(),
                            userOwner: Meteor.userId(),
                            type: 'normal-notification',
                            usersDestination: (_.map(viewers, v => v.userId)),
                            state: 'new',
                            body: {
                                title: subject,
                                message: text,
                            },
                            path: `/idea/${idea._id}/view`
                        }, (err, data) => {
                            if (err) { console.log('err alerts.upsert', err) };
                            console.log('--alerts.upsert to --', _.map(viewers, v => v.userId), data);
                        });
                    }


                    if (alert.sendEmail) {
                        const to = _.map(usersTo, u => (u.emails[0].address))
                        console.log('--alert.sendEmail to --', to);
                        console.log('Envío de Email ***', Email.send({ to, from, subject, text }));
                    }
                }
            })
        });


    },
})