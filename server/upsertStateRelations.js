import { Meteor } from 'meteor/meteor';
import _ from 'lodash';

import Ideas from '../imports/api/ideas/ideas';
import States from '../imports/api/states/states';

Meteor.methods({
    'states.relations': () => {
        if (!Meteor.isServer) return;
        state1A();
        state1B();
    }
});



const state1A = () => {
    const code = '1A';
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

    const toChanges = [
        { type: 'text', label: 'Comentario', name: 'comment' },
        { type: 'area', label: 'Area Nuevo Lider', name: 'areaId' },
    ]

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

const state1B = () => {
    const code = '1B';
    
    const arrRoles = [{ role: 'Leader', title: 'Ideas Pendientes' }];
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

    const toChanges = [{ type: 'date', label: 'Fecha Compromiso Feedback', name: 'feedback' }]

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