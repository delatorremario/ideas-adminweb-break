import { Meteor } from 'meteor/meteor';
import _ from 'lodash';

import Ideas from '../imports/api/ideas/ideas';
import States from '../imports/api/states/states';

Meteor.methods({
    'states.relations': () => {
        if (!Meteor.isServer) return;
        console.log('-- begin states relations --');
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
        console.log('-- end states relations --');
    }
});

const state1A = () => {
    const code = '1A';
    const arrRoles = [
        { role: 'Leader', title: 'Ideas Nuevas' },
        { role: 'Employee', title: 'Ideas Nuevas', onlyView: true }
    ];
    const arrNext = [{
        "title": "Dar Continuidad",
        "action": "Dar Continuidad",
        "code": "1B",
        "color": States.findOne({ code: "1B" }).color,
    },
    {
        "title": "Derivar a otro Lider",
        "action": "Derivar a otro Lider",
        "code": "1A",
        "color": States.findOne({ code: "1A" }).color,
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

    const arrRoles = [
        { role: 'Leader', title: 'Ideas Pendientes' },
        { role: 'Employee', title: 'Ideas Pendientes', onlyView: true }

    ];
    const arrNext = [{
        "title": "Derivar",
        "action": "Derivar Idea",
        "code": "2A",
        "color": States.findOne({ code: "2A" }).color,
    },
    {
        "title": "Rechazar / Repetida",
        "action": "Rechazar Idea Repetida",
        "code": "3B",
        "color": States.findOne({ code: "3B" }).color,
    },
    {
        "title": "Rechazar / Proceso",
        "action": "Rechazar Idea en Proceso",
        "code": "3A",
        "color": States.findOne({ code: "3A" }).color,
    }
    ]

    const toChanges = [{ type: 'date', label: 'Fecha Compromiso Feedback', name: 'feedback', maxDais: 7 }];

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

    const arrRoles = [
        { role: 'Executive', title: 'Ideas Nuevas' },
        { role: 'Employee', title: 'Ideas Nuevas', onlyView: true }
    ];
    const arrNext = [
        {
            "title": "No Corresponde a mi Area",
            "action": "Devolver Idea",
            "code": "2C",
            "color": States.findOne({ code: "2C" }).color,
        },
        {
            "title": "Corresponde a mi Area, pero la decisión es de otro lider de Area",
            "action": "Rederivar Idea",
            "code": "2B",
            "color": States.findOne({ code: "2B" }).color,
        },
        {
            "title": "La decisión si me corresponde",
            "action": "Dar Continuidad",
            "code": "2D",
            "color": States.findOne({ code: "2D" }).color,
        },
    ]

    const toChanges = [
        { type: 'chief', label: 'Encargado de Area', name: 'chief', parents: false },
        { type: 'text', label: 'Comentario', name: 'comment' },
        { type: 'option', label: 'Seguridad', name: 'clasification' },
        { type: 'option', label: 'Producción', name: 'clasification' },
        { type: 'option', label: 'Cultura', name: 'clasification' },
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
    console.log('-enter- 2b');
    
    const code = '2B';

    const arrRoles = [
        { role: 'Executive', title: 'Idea Derivada Por Otro Ejecutivo' },
        { role: 'Leader', title: 'Idea Derivada Por Otro Ejecutivo', onlyView: true },
        { role: 'Employee', title: 'Idea Derivada Por Otro Ejecutivo', onlyView: true },
    ];
    const arrNext = [
        {
            "title": "No Corresponde a mi Area",
            "action": "Devolver Idea",
            "code": "2C",
            "color": States.findOne({ code: "2C" }).color,
        },
        {
            "title": "Corresponde a mi Area, pero la decisión es de otro lider de Area",
            "action": "Rederivar Idea",
            "code": "2B",
            "color": States.findOne({ code: "2B" }).color,
        },
        {
            "title": "La decisión si me corresponde",
            "action": "Dar Continuidad",
            "code": "2D",
            "color": States.findOne({ code: "2D" }).color,
        },
    ]

    const toChanges = [
        { type: 'chief', label: 'Otro Ejecutivo de mi Area', name: 'chief', parents: true },
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

    const arrRoles = [
        { role: 'Leader', title: 'Idea Devuelta por Area' },
        { role: 'Employee', title: 'Idea Devuelta por Area', onlyView: true }
    ];
    const arrNext = [{
        "title": "Dar Continuidad",
        "action": "Dar Respuesta",
        "code": "1B",
        "color": States.findOne({ code: "1B" }).color,
    },
    {
        "title": "Derivar a otra Area",
        "action": "Derivar a otra Area",
        "code": "1A",
        "color": States.findOne({ code: "1A" }).color,
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

    const arrRoles = [
        { role: 'Executive', title: 'Ideas Pendientes' },
        { role: 'Employee', title: 'Ideas Pendientes', onlyView: true }
    ];
    const arrNext = [
        {
            "title": "Aprobar",
            "action": "Aceptar Idea",
            "code": "5A",
            "color": States.findOne({ code: "5A" }).color,
        },
        {
            "title": "Rechazar / Proceso",
            "action": "Rechazar Idea en Proceso",
            "code": "3A",
            "color": States.findOne({ code: "3A" }).color,
        },
        {
            "title": "Rechazar / Repetida",
            "action": "Rechazar Idea Repetida",
            "code": "3B",
            "color": States.findOne({ code: "3B", }).color,
        },
        {
            "title": "Rechazar / No factible",
            "action": "Rechazar Idea",
            "code": "3C",
            "color": States.findOne({ code: "3C", }).color,
        },
        {
            "title": "Postergar",
            "action": "Postergar Idea",
            "code": "4A",
            "color": States.findOne({ code: "4A", }).color,
        },
        {
            "title": "Reprogramar Feedback",
            "action": "Reprogramar Feedback",
            "code": "2D",
            "color": States.findOne({ code: "2D", }).color,
        },
    ]

    const toChanges = [{ type: 'date', label: 'Fecha Compromiso Feedback', name: 'feedback', maxDais: 21 }];


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
        { role: 'Leader', title: 'Ideas Rechazadas', onlyView: true },
        //  { role: 'Executive', title: 'Ideas Rechazadas', onlyView: true },
        { role: 'Employee', title: 'Ideas Rechazadas' },
    ];
    const arrNext = [
        {
            "title": "Confirmar Rechazo",
            "action": "Confirmar Rechazo",
            "code": "3D",
            "color": States.findOne({ code: "3D" }).color,
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

const state3B = () => {
    const code = '3B';

    const arrRoles = [
        { role: 'Leader', title: 'Ideas Rechazadas', onlyView: true },
        //{ role: 'Executive', title: 'Ideas Rechazadas', onlyView: true },
        { role: 'Employee', title: 'Ideas Rechazadas' },
    ];
    const arrNext = [
        {
            "title": "Confirmar Rechazo",
            "action": "Confirmar Rechazo",
            "code": "3D",
            "color": States.findOne({ code: "3D", }).color,
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
const state3C = () => {
    const code = '3C';

    const arrRoles = [
        { role: 'Executive', title: 'Ideas Rechazadas', onlyView: true },
        { role: 'Leader', title: 'Ideas Rechazadas', onlyView: true },
        { role: 'Employee', title: 'Ideas Rechazadas' },
    ];
    const arrNext = [
        {
            "title": "Confirmar Rechazo",
            "action": "Confirmar Rechazo",
            "code": "3D",
            "color": States.findOne({ code: "3D", }).color,
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
        { role: 'Executive', title: 'Ideas Rechazadas', onlyView: true },
        { role: 'Leader', title: 'Ideas Rechazadas', onlyView: true },
        { role: 'Employee', title: 'Ideas Rechazadas', onlyView: true },
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
        { role: 'Leader', title: 'Ideas StandBy', onlyView: true },
        { role: 'Employee', title: 'Ideas Rechazadas', onlyView: true },
    ];
    const arrNext = [
        {
            "title": "Comenzar Proceso",
            "action": "Comenzar Proceso",
            "code": "2D",
            "color": States.findOne({ code: "2D", }).color,
        },
        {
            "title": "Postergar Nuevamente",
            "action": "Postergar Idea",
            "code": "4A",
            "color": States.findOne({ code: "4A", }).color,
        },
    ]

    const toChanges = [
        { type: 'text', label: 'Motivo', name: 'comment' },
        { type: 'check', label: 'Conversación', name: 'conversation' },
        { type: 'date', label: 'Fecha Compromiso Postergación', name: 'postergation', maxDais: 365 },
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
        { role: 'Employee', title: 'Ideas Pendientes Ingreso Plan de Acción', onlyView: true },
    ];
    const arrNext = [
        {
            "title": "Ingresar Plan de Acción",
            "action": "Ingresar Plan de Acción",
            "code": "5B",
            "color": States.findOne({ code: "5B", }).color,
        },
    ]

    const toChanges = [
        { type: 'text', label: 'Mensaje', name: 'message' },
        { type: 'option', label: 'Ideas', name: 'clasification' },
        { type: 'option', label: 'Círculo', name: 'clasification' },
        { type: 'check', label: 'Conversación', name: 'conversation' },
        { type: 'date', label: 'Fecha Compromiso Ingreso de Plan de Acción', name: 'date', maxDais: 21 },
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
        { role: 'Executive', title: 'Ideas Pendientes de Exportación', onlyView: true },
        { role: 'Leader', title: 'Ideas Pendientes de Exportación' },
        { role: 'Employee', title: 'Ideas Pendientes de Exportación', onlyView: true },
    ];
    const arrNext = [
        {
            "title": "Exportar plan de acción formato Just Do It",
            "action": "Exportar plan de acción",
            "code": "6A",
            "color": States.findOne({ code: "6A", }).color,
        },
        // {
        //     "title": "Exportar plan de acción Formato Iniciativa Nueva",
        //     "action": "Exportar plan de acción",
        //     "code": "6A",
        //     "color": States.findOne({code: "6A",}).color,
        // },
    ]

    const toChanges = [

        { type: 'text', label: 'Acción', name: 'actionplan1' },
        { type: 'text', label: 'Responsable', name: 'actionplan1' },
        { type: 'date', label: 'Fecha Inicio', name: 'iniDate1' },
        { type: 'date', label: 'Fecha Fin', name: 'endDate1', maxDais: 100 },

        { type: 'text', label: 'Acción', name: 'actionplan2', optional: true },
        { type: 'text', label: 'Responsable', name: 'actionplan2', optional: true },
        { type: 'date', label: 'Fecha Inicio', name: 'iniDate2', optional: true },
        { type: 'date', label: 'Fecha Fin', name: 'endDate2', maxDais: 100, optional: true },

        { type: 'text', label: 'Acción', name: 'actionplan3', optional: true },
        { type: 'text', label: 'Responsable', name: 'actionplan3', optional: true },
        { type: 'date', label: 'Fecha Inicio', name: 'iniDate3', optional: true },
        { type: 'date', label: 'Fecha Fin', name: 'endDate3', maxDais: 100, optional: true },

        { type: 'text', label: 'Acción', name: 'actionplan4', optional: true },
        { type: 'text', label: 'Responsable', name: 'actionplan4', optional: true },
        { type: 'date', label: 'Fecha Inicio', name: 'iniDate4', optional: true },
        { type: 'date', label: 'Fecha Fin', name: 'endDate4', maxDais: 100, optional: true },

        { type: 'text', label: 'Acción', name: 'actionplan5', optional: true },
        { type: 'text', label: 'Responsable', name: 'actionplan5', optional: true },
        { type: 'date', label: 'Fecha Inicio', name: 'iniDate5', optional: true },
        { type: 'date', label: 'Fecha Fin', name: 'endDate5', maxDais: 100, optional: true },

        { type: 'text', label: 'Acción', name: 'actionplan6', optional: true },
        { type: 'text', label: 'Responsable', name: 'actionplan6', optional: true },
        { type: 'date', label: 'Fecha Inicio', name: 'iniDate6', optional: true },
        { type: 'date', label: 'Fecha Fin', name: 'endDate6', maxDais: 100, optional: true },

        { type: 'text', label: 'Acción', name: 'actionplan7', optional: true },
        { type: 'text', label: 'Responsable', name: 'actionplan7', optional: true },
        { type: 'date', label: 'Fecha Inicio', name: 'iniDate7', optional: true },
        { type: 'date', label: 'Fecha Fin', name: 'endDate7', maxDais: 100, optional: true },

        { type: 'text', label: 'Acción', name: 'actionplan8', optional: true },
        { type: 'text', label: 'Responsable', name: 'actionplan8', optional: true },
        { type: 'date', label: 'Fecha Inicio', name: 'iniDate8', optional: true },
        { type: 'date', label: 'Fecha Fin', name: 'endDate8', maxDais: 100, optional: true },

        { type: 'text', label: 'Acción', name: 'actionplan9', optional: true },
        { type: 'text', label: 'Responsable', name: 'actionplan9', optional: true },
        { type: 'date', label: 'Fecha Inicio', name: 'iniDate9', optional: true },
        { type: 'date', label: 'Fecha Fin', name: 'endDate9', maxDais: 100, optional: true },

        { type: 'text', label: 'Acción', name: 'actionplan10', optional: true },
        { type: 'text', label: 'Responsable', name: 'actionplan10', optional: true },
        { type: 'date', label: 'Fecha Inicio', name: 'iniDate10', optional: true },
        { type: 'date', label: 'Fecha Fin', name: 'endDate10', maxDais: 100, optional: true },

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
        { role: 'Employee', title: 'Ideas Ingresadas a Impact', onlyView: true },
    ];
    const arrNext = [
        {
            "title": "Idea Implementada Just Do it",
            "action": "Cerrar Ciclo",
            "code": "7A",
            "color": States.findOne({ code: "7A", }).color,
        },
    ]

    const toChanges = [
        { type: 'date', label: 'Fecha Compromiso Carga a Impact', name: 'compromise', maxDais: 3 },
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
        { role: 'Executive', title: 'Ideas Ingresadas a Impact', onlyView: true },
        { role: 'Leader', title: 'Ideas Ingresadas a Impact' },
        { role: 'Employee', title: 'Ideas Ingresadas a Impact', onlyView: true },
    ];
    const arrNext = [
        {
            "title": "Idea Implementada Iniciativa Nueva",
            "action": "Cerrar Ciclo",
            "code": "7B",
            "color": States.findOne({ code: "7B", }).color,
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
        { role: 'Employee', title: 'Ideas Implementadas' },
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
        { role: 'Employee', title: 'Ideas Implementadas' },
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