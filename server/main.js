import { Meteor } from 'meteor/meteor'
import './start'

Meteor.startup(() => {

    if (!Meteor.users.findOne({ 'emails.address': 'mariodelatorre@holos.cl' }))
        Accounts.createUser({ email: 'mariodelatorre@holos.cl', password: 'Holos123' })

    if (!Meteor.users.findOne({ 'emails.address': 'cbaiardi@holos.cl' }))
        Accounts.createUser({ email: 'cbaiardi@holos.cl', password: 'Holos123' })

    Start.start()

    // console.log(Roles.getAllRoles())

    // 1) code to run on server at startup
    // 2) preguntar por el suuario cbaiardi@holos.cl, mariodelatorre@holos.cl si no crearlos
    // 3) preguntar por el rol superadmin , si no existe... crearlo
    // 4) preguntar si el correo cbaiardi@holos.cl, mariodelatorre@holos.cl esta en ese rol... sino agregarlo
});
