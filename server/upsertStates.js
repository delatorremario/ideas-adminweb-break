import { Meteor } from 'meteor/meteor';
import _ from 'lodash';

import Corporations from '../imports/api/corporations/corporations';
import ideasstates from '../imports/api/states/ideasstates';
import States from '../imports/api/states/states';

Meteor.methods({
    'states.populate': () => {
        if (!Meteor.isServer) return;
        const corporations = Corporations.find().fetch();

        /* add typesareasstructure */
        _.map(corporations, (corp) => {
            _.map(ideasstates, ideastate => {

                const { code, step, state, description, color } = ideastate;
                const update = { code, step, state, description, color, corporationId: corp._id, showInDashboard: false };

                States.update({ code, corporationId: corp._id },
                    { $set: update }, { upsert: true }
                )
            })
        })

        console.log('**** states.populate call END ****')
    }
});
