import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Alerts = new Mongo.Collection('alerts')
export default Alerts

Alerts.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
})

Alerts.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
})

Alerts.schema = new SimpleSchema({
    // fecha de creación de la notificación
    createdAt: { type: Date },
    // Es el usuario que genera la notificación. Puede ser user_Id o "system"
    userOwner: { type: String },
    // inactive-user, normal-notification, corporation-request
    type: { type: String },
    // users Ids
    usersDestination: { type: [String] },
    // new, opened, complete
    state: { type: String },
    // Título y mensaje de la notificación
    path: { type: String },
    body: { type: Object },
    "body.title": { type: String },
    "body.message": { type: String }
})

Alerts.attachSchema(Alerts.schema);
