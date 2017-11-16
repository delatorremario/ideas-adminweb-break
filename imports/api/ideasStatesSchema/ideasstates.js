const ideasstates = [
    { code:'1A', step:'IDEA GENERADA', state:'CONFIRMADA', description:'Idea ingresada, disponible para ser leida por mejoramiento y luego Derivada', color:'#ffffcc'},
    { code:'1B', step:'IDEA GENERADA', state:'LEIDA', description:'Idea leida por la oficina de mejoramiento, correo de recepción enviado', color:'#ffffcc'},
    { code:'2', step:'EN REVISIÓN CON LA LÍNEA', state:'DERIVADA', description:'Idea derivada a una Area', color:'#e6e6e6'},
    { code:'2A', step:'EN REVISIÓN CON LA LÍNEA', state:'REDERIVADA', description:'Idea re derivada a otro super intendente del Area', color:'#e6e6e6'},
    { code:'2B', step:'EN REVISIÓN CON LA LÍNEA', state:'DEVUELTA', description:'Idea devuelta a la Oficina de Mejoramiento', color:'#e6e6e6'},
    { code:'2C', step:'EN REVISIÓN CON LA LÍNEA', state:'REVISADA', description:'Idea revisada por el Encargado del Area', color:'#e6e6e6'},
    { code:'3A', step:'RECHAZADA', state:'YA EN INICIATIVA', description:'Idea rechazada por mejoramiento, ya considerada dentro de iniciativas existentes', color:'#cce6ff'},
    { code:'3B', step:'RECHAZADA', state:'REPETIDA', description:'Idea rechazada por mejoramiento, repetida dentro de "ideas 3.0"', color:'#cce6ff'},
    { code:'3C', step:'RECHAZADA', state:'NO FACTIBLE', description:'Idea no factible dadas las condiciones generales del área', color:'#cce6ff'},
    { code:'4A', step:'STAND BY', state:'STAND BY', description:'Idea pasada a espera de nuevas condiciones para ser evaluada', color:'#ffe6cc'},
    { code:'5', step:'IDEA APROBADA', state:'APROBADA', description:'Idea aprobada a la espera de el Plan de Ejecución', color:'#ffe6cc'},
    { code:'5A', step:'IDEA APROBADA', state:'IMPACT JUST DO IT', description:'Idea entra a plataforma Impact como un Just Do It', color:'#e6ffcc'},
    { code:'5B', step:'IDEA APROBADA', state:'IMPACT INICIATIVA NUEVA', description:'Idea entra a plataforma Impact como una iniciativa nueva', color:'#e6ffcc'},
    { code:'5C', step:'IDEA APROBADA', state:'IMPLEMENTADA JUST DO IT', description:'Idea 100% Implementada', color:'#e6ffcc'},
    { code:'5D', step:'IDEA APROBADA', state:'IMPLEMENTADA INICIATIVA NUEVA', description:'Idea 100% Implementada', color:'#e6ffcc'},
];

export default ideasstates;
