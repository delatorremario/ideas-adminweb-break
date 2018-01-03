const ideasstates = [
    { code:'1A', step:'IDEA GENERADA', state:'CONFIRMADA', description:'Idea ingresada, disponible para ser leida por mejoramiento y luego Derivada', color:'#f67b2f'},
    { code:'1B', step:'IDEA GENERADA', state:'LEIDA', description:'Idea leida por la oficina de mejoramiento, correo de recepción enviado', color:'#f67b2f'},
    
    { code:'2A', step:'EN REVISIÓN CON LA LÍNEA', state:'DERIVADA', description:'Idea derivada a una Area', color:'#e65400'},
    { code:'2B', step:'EN REVISIÓN CON LA LÍNEA', state:'REDERIVADA', description:'Idea re derivada a otro Encargado de Area', color:'#e65400'},
    { code:'2C', step:'EN REVISIÓN CON LA LÍNEA', state:'DEVUELTA', description:'Idea devuelta a la Oficina de Mejoramiento', color:'#e65400'},
    { code:'2D', step:'EN REVISIÓN CON LA LÍNEA', state:'REVISADA', description:'Idea revisada por el Encargado del Area', color:'#e65400'},
    
    { code:'3A', step:'RECHAZADA', state:'YA EN INICIATIVA', description:'Idea rechazada por mejoramiento, ya considerada dentro de iniciativas existentes.Pendiente de confirmación por parte del usuario creador.', color:'#1966b1'},
    { code:'3B', step:'RECHAZADA', state:'REPETIDA', description:'Idea rechazada por mejoramiento, repetida dentro de "Ideas 3.0". Pendiente de confirmación por parte del usuario creador', color:'#1966b1'},
    { code:'3C', step:'RECHAZADA', state:'NO FACTIBLE', description:'Idea rechazada por el encargado de área, no factible dadas las condiciones generales del área. Pendiente de confirmación por parte del usuario creador.', color:'#1966b1'},
    { code:'3D', step:'RECHAZADA', state:'ACEPTADA', description:'Rechazo Aceptado', color:'#1966b1'},

    { code:'4A', step:'STAND BY', state:'STAND BY', description:'Idea postergada por encargado de área.', color:'#9f2996'},

    { code:'5A', step:'IDEA APROBADA', state:'APROBADA',   description:'Idea aprobada a la espera del plan de ejecución.', color:'#01ab8b'},
    { code:'5B', step:'IDEA APROBADA', state:'APROBADA CON PLAN DE ACCIÓN',   description:'Idea aprobada con plan de ejecución pendiente de exportación', color:'#01ab8b'},
    
    { code:'6A', step:'IDEA EXPORTADA', state:'IMPACT JUST DO IT', description:'Idea exportada para Impact con formato Just Do It.', color:'#01ab8b'},
    { code:'6B', step:'IDEA EXPORTADA', state:'IMPACT INICIATIVA NUEVA', description:'Idea exportada para Impact con formato Iniciativa Nueva.', color:'#01ab8b'},
   
    { code:'7A', step:'IDEA IMPLEMENTADA', state:'JUST DO IT', description:'Idea Implementada como Just Do It.', color:'#01ab8b'},
    { code:'7B', step:'IDEA IMPLEMENTADA', state:'INICIATIVA NUEVA', description:'Idea 100% Implementada', color:'#01ab8b'},
];

export default ideasstates;
