import { Meteor } from 'meteor/meteor';
import _ from 'lodash';

import Ideas from '../imports/api/ideas/ideas';
import States from '../imports/api/states/states';

Meteor.methods({
    'states.relations': () => {
        if (!Meteor.isServer) return;
        state1A();
    }
});



const state1A = () => {
    const arrRoles = [{ role: 'Leader', title: 'Ideas Nuevas' }];
    const arrNext = [{
        "title": "Dar Continuidad",
        "action": "Dar Respuesta",
        "code": "1B",
        "color": "green",
    },
    {
        "title": "Derivar a otra Area",
        "action": "Derivar a otra Area",
        "code": "1A",
        "color": "grey",
    }]
    const code = '1A';
    const toChanges = [{ text: true, label: 'Fecha Compromiso Feedback' }]
    States.update({ "code": code }, {
        $set: {
            "roles": arrRoles,
            "nexts": arrNext,
            toChanges,
        }
    }, { multi: true });


    Ideas.update({ "states.code": code }, {
        $set: {
            "states.$.roles": arrRoles,
            "states.$.nexts": arrNext,
        }
    }
        , { multi: true }
    )

}