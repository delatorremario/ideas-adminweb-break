export default Start = {
    superAdminHolos: false,
    adminGrupoNegocio: false,
    start: () => {
        Start.initRoles()
        Start.addMeToAdmin()
    },
    initRoles: () => {
        var roles = Roles.getAllRoles()
        roles.map(role => {
            if (role.name == 'SuperAdminHolos')
                Start.superAdminHolos = true

            if (role.name == 'AdminGrupoNegocio')
                Start.adminGrupoNegocio = true
        });

        if (!Start.superAdminHolos)
            Roles.createRole('SuperAdminHolos')

        if (!Start.adminGrupoNegocio)
            Roles.createRole('AdminGrupoNegocio')

    },
    addMeToAdmin: () => {
        if (Meteor.users.find({ 'emails.address': 'mariodelatorre@holos.cl' }).count() > 0) {
            var usr = Meteor.users.findOne({ 'emails.address': 'mariodelatorre@holos.cl' })
            Roles.addUsersToRoles(usr, ['SuperAdminHolos'])
            console.log('user agreado a SuperAdminHolos',usr)
        }

        if (Meteor.users.find({ 'emails.address': 'cbaiardi@holos.cl' }).count() > 0) {
            var usr = Meteor.users.findOne({ 'emails.address': 'cbaiardi@holos.cl' })
            Roles.addUsersToRoles(usr, ['SuperAdminHolos'])
            console.log('user agreado a SuperAdminHolos',usr)
        }
    }
}