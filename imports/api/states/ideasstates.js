const ideasstates = [
    { code:'1A', step:'IDEA GENERADA', state:'CONFIRMADA', description:'Idea ingresada, disponible para ser leida por mejoramiento y luego Derivada', color:'#f67b2f'},
    { code:'1B', step:'IDEA GENERADA', state:'LEIDA', description:'Idea leida por la oficina de mejoramiento, correo de recepción enviado', color:'#f67b2f'},
    
    { code:'2', step:'EN REVISIÓN CON LA LÍNEA', state:'DERIVADA', description:'Idea derivada a una Area', color:'#e65400'},
    { code:'2A', step:'EN REVISIÓN CON LA LÍNEA', state:'REDERIVADA', description:'Idea re derivada a otro Encargado de Area', color:'#e65400'},
    { code:'2B', step:'EN REVISIÓN CON LA LÍNEA', state:'DEVUELTA', description:'Idea devuelta a la Oficina de Mejoramiento', color:'#e65400'},
    { code:'2C', step:'EN REVISIÓN CON LA LÍNEA', state:'REVISADA', description:'Idea revisada por el Encargado del Area', color:'#e65400'},
    
    { code:'3',  step:'RECHAZADA', state:'RECHAZADA SIN FEEDBACK', description:'Idea rechazada por mejoramiento a la espera feedback', color:'#1966b1'},
    { code:'3A', step:'RECHAZADA', state:'YA EN INICIATIVA', description:'Idea rechazada por mejoramiento, ya considerada dentro de iniciativas existentes', color:'#1966b1'},
    { code:'3B', step:'RECHAZADA', state:'REPETIDA', description:'Idea rechazada por mejoramiento, repetida dentro de "ideas 3.0"', color:'#1966b1'},
    { code:'3C', step:'RECHAZADA', state:'NO FACTIBLE', description:'Idea no factible dadas las condiciones generales del Area', color:'#1966b1'},

    { code:'4', step:'STAND BY', state:'STAND BY SIN FEEDBACK', description:'Idea pasada a espera de nuevas condiciones para ser evaluada a la espera de feedback', color:'#9f2996'},
    { code:'4A', step:'STAND BY', state:'STAND BY CON FEEDBACK', description:'Idea pasada a espera de nuevas condiciones para ser evaluada', color:'#9f2996'},

    { code:'5', step:'IDEA APROBADA', state:'APROBADA SIN FEEDBACK',   description:'Idea aprobada a la espera de Feedback', color:'#01ab8b'},
    { code:'5A', step:'IDEA APROBADA', state:'APROBADA CON FEEDBACK', description:'Idea aprobada a la espera de el Plan de Ejecución', color:'#01ab8b'},
    { code:'5B', step:'IDEA APROBADA', state:'IMPACT JUST DO IT', description:'Idea entra a plataforma Impact como un Just Do It', color:'#01ab8b'},
    { code:'5C', step:'IDEA APROBADA', state:'IMPACT INICIATIVA NUEVA', description:'Idea entra a plataforma Impact como una iniciativa nueva', color:'#01ab8b'},
    { code:'5D', step:'IDEA APROBADA', state:'IMPLEMENTADA JUST DO IT', description:'Idea 100% Implementada', color:'#01ab8b'},
    { code:'5E', step:'IDEA APROBADA', state:'IMPLEMENTADA INICIATIVA NUEVA', description:'Idea 100% Implementada', color:'#01ab8b'},
];

export default ideasstates;
