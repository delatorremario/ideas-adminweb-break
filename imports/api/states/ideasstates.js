const ideasstates = [
    { code:'1A', step:'IDEA GENERADA', state:'CON LEAD', description:'Idea ingresada, disponible para ser leida por mejoramiento y luego Derivada', color:'#f67b2f'},
    { code:'1B', step:'IDEA GENERADA', state:'LEAD LEYO', description:'Idea leida por la oficina de mejoramiento, correo de recepción enviado', color:'#f67b2f'},
    
    { code:'2A', step:'LINEA', state:'CON SUPERINTENDENTE', description:'Idea derivada a una Area', color:'#e65400'},
    { code:'2B', step:'LINEA', state:'A OTRO SUPERINTENDENTE', description:'Idea re derivada a otro Encargado de Area', color:'#e65400'},
    { code:'2C', step:'LINEA', state:'REGRESA AL LEAD', description:'Idea devuelta a la Oficina de Mejoramiento', color:'#e65400'},
    { code:'2D', step:'LINEA', state:'SUPERINTENDENTE LEYO', description:'Idea revisada por el Encargado del Area', color:'#e65400'},
    
    { code:'3A', step:'RECHAZADA', state:'EN IMPLEMENTACION', description:'Idea rechazada por mejoramiento, ya considerada dentro de iniciativas existentes.Pendiente de confirmación por parte del usuario creador.', color:'#1966b1'},
    { code:'3B', step:'RECHAZADA', state:'IDEA REPETIDA', description:'Idea rechazada por mejoramiento, repetida dentro de "Ideas 3.0". Pendiente de confirmación por parte del usuario creador', color:'#1966b1'},
    { code:'3C', step:'RECHAZADA', state:'NO FACTIBLE', description:'Idea rechazada por el encargado de área, no factible dadas las condiciones generales del área. Pendiente de confirmación por parte del usuario creador.', color:'#1966b1'},
    { code:'3D', step:'RECHAZADA', state:'VALIDADO', description:'Rechazo Aceptado', color:'#1966b1'},

    { code:'4A', step:'STAND BY', state:'STAND BY', description:'Idea postergada por encargado de área.', color:'#9f2996'},

    { code:'5A', step:'APROBADA', state:'SIN PLAN DE ACCION',   description:'Idea aprobada a la espera del plan de ejecución.', color:'#01ab8b'},
    { code:'5B', step:'APROBADA', state:'CON PLAN DE ACCION',   description:'Idea aprobada con plan de ejecución pendiente de exportación', color:'#01ab8b'},
    
    { code:'6A', step:'EXPORTADA', state:'PLAN DE ACCION JUST DO IT', description:'Idea exportada para Impact con formato Just Do It.', color:'#01ab8b'},
    { code:'6B', step:'EXPORTADA', state:'PLAN DE ACCION INICIATIVA', description:'Idea exportada para Impact con formato Iniciativa Nueva.', color:'#01ab8b'},
   
    { code:'7A', step:'IMPLEMENTADA', state:'JUST DO IT', description:'Idea Implementada como Just Do It.', color:'#01ab8b'},
    { code:'7B', step:'IMPLEMENTADA', state:'INICIATIVA', description:'Idea 100% Implementada', color:'#01ab8b'},
];

export default ideasstates;
