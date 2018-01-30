import { Meteor } from "meteor/meteor";
import _ from 'lodash';
import moment from 'moment';
import { Email } from 'meteor/email';
import States from '../../imports/api/states/states';
import Ideas from '../../imports/api/ideas/ideas';

moment.locale('es');

Meteor.startup(() => {
    Meteor.setInterval(() => {
        Meteor.call('sendAlertsTemporals')
        Meteor.call('sendAlertsFeedbacks')
    }, 86400000)
})

Meteor.methods({
    sendAlertsTemporals: () => {
        // buscar los estados configurados
        if (!Meteor.isServer) return;

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
                Meteor.call('idea.addViewers', idea._id, (err, idea) => {
                    if (err) { console.log('ERROR', err); return; }
                    const viewers = idea.viewers;
                    const last = _.last(idea.states);

                    const a = moment();
                    const b = moment(last.createdAt);
                    const diff = a.diff(b, 'days') // 1
                    _.each(state.alerts, alert => {
                        if (!alert.temporal) return;
                        if (diff >= alert.delay) {

                            console.log('** :D ALEEEERT **');

                            const subject = 'Alerta!!';
                            const text = (alert.message || '') + `. La idea de ${idea.person.lastName}, ${idea.person.firstName} tiene un atraso de ${diff} días`;

                            sendAlert(viewers, subject, text, alert, `/idea/${idea._id}/view`)

                        }
                        else {
                            console.log('** :( no alert **');
                        }
                    })
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
            console.log('--STATE--', state.step, state.state);

            _.map(state.alerts, alert => {
                console.log('---ALERT---', alert);
                if (alert.stateChange) {
                    // const to = ['mauricio.ma.rodriguez@bhpbilliton.com', 'dblazina@holos.cl ', 'mariodelatorre@holos.cl', 'martingonzalez@holos.cl'];
                    const subject = `Cambio al estado ${state.step} ${state.state}`;
                    const text = `${(alert.message ? alert.message + '. ' : '')}La idea de ${idea.person.lastName}, ${idea.person.firstName} ${idea.person.secondName || ''} cambió de estado.`;

                    sendAlert(viewers, subject, text, alert, `/idea/${idea._id}/view`)

                }
            })
        });
    },
    sendAlertsFeedbacks: () => {
        // buscar los estados configurados
        if (!Meteor.isServer) return;

        // buscar las ideas con feedback
        const ideas = Ideas.find({ 'states.toChanges.type': 'date' }).fetch()
        //     $where: () => {
        //         return _.last(this.states).toChanges.type === 'date'
        //     }
        // }).fetch();


        _.each(ideas, (idea, index) => {
            console.log('--idea--', index, idea._id);
            Meteor.call('idea.addViewers', idea._id, (err, idea) => {
                if (err) { console.log('ERROR', err); return; }
                const viewers = idea.viewers;
                const laststate = _.last(idea.states);
                const toChangesDates = _.filter(laststate.toChanges, { type: 'date', name: 'feedback' })
                _.each(toChangesDates, toChangeDate => {
                   
                    const { date, label } = toChangeDate;
                    const a = moment();
                    const b = moment(date);
                    const diff = a.diff(b, 'days')
                    
                    let message = ''
                    if (diff === 0) message = 'vence hoy'
                    if (diff < 0 && diff >= -2) {
                        message = `venció hace ${b.fromNow()}`;
                    }
                    if (diff > 0 && diff <= 2) {
                        message = `vence en ${b.toNow()}`;
                    }

                    const subject = `${label} ${message}`;
                    const text = `${label} para la idea de ${idea.person.lastName}, ${idea.person.firstName} con estado ${laststate.step} ${laststate.state}, ${message}.`;
                                   
                    const alert = {
                        sendInbox: true,
                        sendEmail: false,
                        owner: false,
                        lead: true,
                        oneUp: true,
                        chief: true
                    };

                    sendAlert(viewers, subject, text, alert, `/idea/${idea._id}/view`)

                })
            })
        })
    },
})

const sendAlert = (viewers, subject, text, alert, path) => {
    console.log('enter on sendAlert');

    const from = 'Ideas 3.0 <no-replay@ideas.e-captum.com>';

    const { sendInbox, sendEmail, owner, lead, oneUp, chief } = alert;

    const viewersUserId = _.map(_.filter(viewers, v => (
        owner && v.group === 'owner' ||
        lead && v.group === 'leader' ||
        oneUp && v.group === 'oneUp' ||
        chief && v.group === 'chief') &&
        v.userId
    ), 'userId');

    const to = _.map(Meteor.users.find({ _id: { $in: viewersUserId } }).fetch(), u => (u.emails[0].address))

    console.log('--viewers--', viewers );
    console.log('-- viewersUserId --', viewersUserId);
    console.log('-- to --', to);
    Meteor.call('userNotification',
        subject,
        text,
        viewersUserId,
        (err, data) => {
            if (err) { console.log('err userNotification', err) };
        })


    if (sendInbox && viewersUserId.length > 0) {
        Meteor.call('alerts.upsert', {
            createdAt: new Date(),
            userOwner: Meteor.userId(),
            type: 'normal-notification',
            usersDestination: viewersUserId,
            state: 'new',
            body: {
                title: subject,
                message: text,
            },
            path, // `/idea/${idea._id}/view`
        }, (err, data) => {
            if (err) { console.log('err alerts.upsert', err) };
        });
    }

    if (sendEmail && to.length > 0) {
        Email.send({ to, from, subject, text });
    }
}