import { Meteor } from "meteor/meteor";
import _ from 'lodash';
import moment from 'moment';
import { Email } from 'meteor/email';


import States from '../../imports/api/states/states';
import Ideas from '../../imports/api/ideas/ideas';


Meteor.startup(() => {
    Meteor.setInterval(() => {
        Meteor.call('sendAlerts')
    }, 86400000)
})





Meteor.methods({
    'sendAlerts':()=>{
    // buscar los estados configurados
        
        const filters = {
            // corporationId: (user.profile && user.profile.selectedCorporationId) || '',
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
                console.log('*** Idea:', idea._id);
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
                        
                        const to = ['delatorremario@gmail.com']
                        const from = 'no-replay@ideas.e-captum.com';
                        const subject = 'Alerta!!';
                        const text = alert.message || 'Alerta';

                        Email.send({ to, from, subject, text });
                    
                    }
                    else {
                        console.log('** :( no alert **');
                    }
                })
            })
        })
    }
})