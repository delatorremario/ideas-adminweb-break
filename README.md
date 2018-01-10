# ideas-adminweb-break
<h3>Installation</h3> <br> 
<p><b>$ meteor npm install</b></p>


<h4>Populates</h4>
<ul>
    <li>Meteor.call('start') <small>Crea Roles y Usuarios Iniciales</small></li>
    <li>Logearse y Creaer la Primer Corporación</li>
    <li>Meteor.call('areas.populate') <small>Crea y actualiza las Areas</small></li>
    <li>Meteor.call('areas.generateFamily') <small>Genera la Familia de Areas</small></li>
    <li>Meteor.call('persons.populate') <small>Crea y actualiza las Personas y las Asocia a las Areas</small></li>
    <li>Meteor.call('states.populate') <small>Crea y actualiza los Posibles Estados de las Ideas</small></li>
    <li>Meteor.call('states.relations') <small>Actualiza los posibles flujos de los estados</small></li>
    <li>Meteor.call('leaders.update') <small>Asigna las areas a los Líderes</small></li>
</ul>
<h4>DB Index</h4>
<p>Meteor.call('dbIndexs')</p>
