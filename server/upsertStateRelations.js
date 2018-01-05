import { Meteor } from 'meteor/meteor';
import _ from 'lodash';

import Ideas from '../imports/api/ideas/ideas';
import States from '../imports/api/states/states';

Meteor.methods({
    'states.relations': () => {
        if (!Meteor.isServer) return;
        state1A();
        state1B();
        state2A();
        state2B();
        state2C();
        state2D();
        state3A();
        state3B();
        state3C();
        state3D();
        state4A();
        state5A();
        state5B();
        state6A();
        state6B();
        state7A();
        state7B();
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
        { type: 'area', label: 'Area Nuevo Lider', name: 'areaId', },
        { type: 'text', label: 'Comentario', name: 'comment', },
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
        "title": "Derivar",
        "action": "Derivar Idea",
        "code": "2A",
        "color": "green",
    },
    {
        "title": "Rechazar / Repetida",
        "action": "Rechazar Idea Repetida",
        "code": "3B",
        "color": "grey",
    },
    {
        "title": "Rechazar / Proceso",
        "action": "Rechazar Idea en Proceso",
        "code": "3A",
        "color": "orange",
    }
    ]

    const toChanges = [{ type: 'date', label: 'Fecha Compromiso Feedback', name: 'feedback' }];

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

const state2A = () => {
    const code = '2A';

    const arrRoles = [{ role: 'Executive', title: 'Ideas Nuevas' }];
    const arrNext = [
        {
            "title": "No Corresponde a mi Area",
            "action": "Devolver Idea",
            "code": "2C",
            "color": "green",
        },
        {
            "title": "Corresponde a mi Area, pero la decisión es de otro lider de Area",
            "action": "Rederivar Idea",
            "code": "2B",
            "color": "grey",
        },
        {
            "title": "La decisión si me corresponde",
            "action": "Dar Continuidad",
            "code": "2D",
            "color": "orange",
        },
    ]

    const toChanges = [
        { type: 'chief', label: 'Encargado de Area', name: 'chief' },
        { type: 'text', label: 'Comentario', name: 'comment' },
    ];

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

const state2B = () => {
    const code = '2B';

    const arrRoles = [{ role: 'Executive', title: 'Idea Derivada Por Otro Ejecutivo' }];
    const arrNext = [
        {
            "title": "No Corresponde a mi Area",
            "action": "Devolver Idea",
            "code": "2C",
            "color": "green",
        },
        {
            "title": "Corresponde a mi Area, pero la decisión es de otro lider de Area",
            "action": "Rederivar Idea",
            "code": "2B",
            "color": "grey",
        },
        {
            "title": "La decisión si me corresponde",
            "action": "Dar Continuidad",
            "code": "2D",
            "color": "orange",
        },
    ]

    const toChanges = [
        { type: 'chief', label: 'Otro Ejecutivo de mi Area', name: 'chief' },
        { type: 'text', label: 'Comentario', name: 'comment' },
    ];

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

const state2C = () => {
    const code = '2C';

    const arrRoles = [{ role: 'Leader', title: 'Idea Derivada Por Otro Lider' }];
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
        { type: 'text', label: 'Motivo', name: 'motivo' },
    ];
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

const state2D = () => {
    const code = '2D';

    const arrRoles = [{ role: 'Executive', title: 'Ideas Pendientes' }];
    const arrNext = [
        {
            "title": "Aprobar",
            "action": "Aceptar Idea",
            "code": "5A",
            "color": "green",
        },
        {
            "title": "Rechazar",
            "action": "Rechazar Idea",
            "code": "3C",
            "color": "grey",
        },
        {
            "title": "Postergar",
            "action": "Postergar Idea",
            "code": "4A",
            "color": "orange",
        },
        {
            "title": "Reprogramar Feedback",
            "action": "Reprogramar Feedback",
            "code": "2D",
            "color": "orange",
        },
    ]

    const toChanges = [{ type: 'date', label: 'Fecha Compromiso Feedback', name: 'feedback' }];


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



const state3A = () => {
    const code = '3A';

    const arrRoles = [
        { role: 'Leader', title: 'Ideas Rechazadas' },
        { role: 'Employee', title: 'Ideas Rechazadas' },
    ];
    const arrNext = [
        {
            "title": "Aceptar Rechazo",
            "action": "Aceptar Rechazo",
            "code": "3D",
            "color": "green",
        },
    ]

    const toChanges = [
        { type: 'text', label: 'Comentario', name: 'comment' },
        { type: 'check', label: 'Conversación', name: 'conversation' },
    ];

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

const state3B = () => {
    const code = '3B';

    const arrRoles = [
        { role: 'Leader', title: 'Ideas Rechazadas' },
        { role: 'Employee', title: 'Ideas Rechazadas' },
    ];
    const arrNext = [
        {
            "title": "Aceptar Rechazo",
            "action": "Aceptar Rechazo",
            "code": "3D",
            "color": "green",
        },
    ]

    const toChanges = [
        { type: 'text', label: 'Comentario', name: 'comment' },
        { type: 'check', label: 'Conversación', name: 'conversation' },
    ];

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
const state3C = () => {
    const code = '3C';

    const arrRoles = [
        { role: 'Executive', title: 'Ideas Rechazadas' },
        { role: 'Leader', title: 'Ideas Rechazadas' },
        { role: 'Employee', title: 'Ideas Rechazadas' },
    ];
    const arrNext = [
        {
            "title": "Aceptar Rechazo",
            "action": "Aceptar Rechazo",
            "code": "3D",
            "color": "green",
        },
    ]

    const toChanges = [
        { type: 'text', label: 'Motivo', name: 'comment' },
        { type: 'check', label: 'Conversación', name: 'conversation' },
    ];

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
const state3D = () => {
    const code = '3D';

    const arrRoles = [
        { role: 'Executive', title: 'Ideas Rechazadas' },
        { role: 'Leader', title: 'Ideas Rechazadas' },
        { role: 'Employee', title: 'Ideas Rechazadas' },
    ];
    const arrNext = [];

    const toChanges = [
        { type: 'check', label: 'Conversación', name: 'conversation' },
    ];

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
const state4A = () => {
    const code = '4A';

    const arrRoles = [
        { role: 'Executive', title: 'Ideas StandBy' },
        { role: 'Leader', title: 'Ideas StandBy' },
        // { role: 'Employee', title: 'Ideas Rechazadas' },
    ];
    const arrNext = [
        {
            "title": "Comenzar Proceso",
            "action": "Comenzar Proceso",
            "code": "2D",
            "color": "green",
        },
        {
            "title": "Postergar Nuevamente",
            "action": "Postergar Idea",
            "code": "4A",
            "color": "green",
        },
    ]

    const toChanges = [
        { type: 'text', label: 'Motivo', name: 'comment' },
        { type: 'check', label: 'Conversación', name: 'conversation' },
        { type: 'date', label: 'Fecha Compromiso Postergación', name: 'postergation' },
    ];

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

const state5A = () => {
    const code = '5A';

    const arrRoles = [
        { role: 'Executive', title: 'Ideas Pendientes Ingreso Plan de Acción' },
        { role: 'Leader', title: 'Ideas Pendientes Ingreso Plan de Acción' },
        // { role: 'Employee', title: 'Ideas Rechazadas' },
    ];
    const arrNext = [
        {
            "title": "Ingresar Plan de Acción",
            "action": "Ingresar Plan de Acción",
            "code": "5B",
            "color": "green",
        },
    ]

    const toChanges = [
        { type: 'text', label: 'Mensaje', name: 'message' },
        { type: 'option', label: 'Ideas', name: 'clasification' },
        { type: 'option', label: 'Círculo', name: 'clasification' },
        { type: 'check', label: 'Conversación', name: 'conversation' },
        { type: 'date', label: 'Fecha Compromiso Postergación', name: 'date' },
    ];

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

const state5B = () => {
    const code = '5B';

    const arrRoles = [
        // { role: 'Executive', title: 'Ideas Pendientes Ingreso Plan de Acción' },
        { role: 'Leader', title: 'Ideas Pendientes de Exportación' },
        // { role: 'Employee', title: 'Ideas Rechazadas' },
    ];
    const arrNext = [
        {
            "title": "Exportar plan de acción formato Just Do It",
            "action": "Exportar plan de acción",
            "code": "6A",
            "color": "green",
        },
        {
            "title": "Exportar plan de acción Formato Iniciativa Nueva",
            "action": "Exportar plan de acción",
            "code": "6A",
            "color": "green",
        },
    ]

    const toChanges = [
        { type: 'text', label: 'Plan de Acción', name: 'actionplan' },
    ];

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

const state6A = () => {
    const code = '6A';

    const arrRoles = [
        // { role: 'Executive', title: 'Ideas Pendientes Ingreso Plan de Acción' },
        { role: 'Leader', title: 'Ideas Ingresadas a Impact' },
        // { role: 'Employee', title: 'Ideas Rechazadas' },
    ];
    const arrNext = [
        {
            "title": "Idea Implementada Just Do it",
            "action": "Cerrar Ciclo",
            "code": "7A",
            "color": "green",
        },
    ]

    const toChanges = [
        { type: 'date', label: 'Fecha Compromiso Carga a Impact', name: 'compromise' },
    ];

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

const state6B = () => {
    const code = '6B';

    const arrRoles = [
        // { role: 'Executive', title: 'Ideas Pendientes Ingreso Plan de Acción' },
        { role: 'Leader', title: 'Ideas Ingresadas a Impact' },
        // { role: 'Employee', title: 'Ideas Rechazadas' },
    ];
    const arrNext = [
        {
            "title": "Idea Implementada Iniciativa Nueva",
            "action": "Cerrar Ciclo",
            "code": "7B",
            "color": "green",
        },
    ]

    const toChanges = [
        { type: 'date', label: 'Fecha Compromiso Carga a Impact', name: 'compromise' },
    ];

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

const state7A = () => {
    const code = '7A';

    const arrRoles = [
        { role: 'Executive', title: 'Ideas Implementadas' },
        { role: 'Leader', title: 'Ideas Implementadas' },
        // { role: 'Employee', title: 'Ideas Rechazadas' },
    ];
    const arrNext = []

    const toChanges = [
        { type: 'text', label: 'Código Impact', name: 'impactCode' },
        { type: 'check', label: 'Cierre en Impact', name: 'impactClose' },
        { type: 'date', label: 'Fecha Implementación de la Idea', name: 'date' },
    ];

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

const state7B = () => {
    const code = '7B';

    const arrRoles = [
        { role: 'Executive', title: 'Ideas Implementadas' },
        { role: 'Leader', title: 'Ideas Implementadas' },
        // { role: 'Employee', title: 'Ideas Rechazadas' },
    ];
    const arrNext = []

    const toChanges = [
        { type: 'text', label: 'Identificación', name: 'indentification' },
        { type: 'check', label: 'Cierre en Impact', name: 'impactClose' },
        { type: 'date', label: 'Fecha Implementación de la Idea', name: 'date' },
    ];

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

const setColors = () => {
    const states = States.find().fetch();
    _.each(states, state => {
        _.each(state.nexts, next => {
            const oneState = States.findOne({ code: next.code });
            States.update({ _id: oneState._id })
        })
    })
}