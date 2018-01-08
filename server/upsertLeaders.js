import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

import _ from 'lodash';

import Areas from '../imports/api/areas/areas';

Meteor.methods({
    'leaders.update': () => {
        console.log('**** leaders.update call START ****')
        if (!Meteor.isServer) return;

        const leadersMails = [
            { mail: 'Jorge.JM.Jalil@bhpbilliton.com', area: 'Cathode Operations' },
            { mail: 'Jorge.JN.Tom@bhpbilliton.com', area: 'Mine Operations' },
            { mail: 'Camila.CA.Perez@bhpbilliton.com', area: 'Concentrate Operations' },
            { mail: 'Mauricio.MA.Rodriguez@bhpbilliton.com', area: 'NPI & Conc. Handling Operations' },
            { mail: 'Maria.MP.Bustamante@bhpbilliton.com', area: 'Logistic & Execution Integ Operations' },
        ]

        _.each(leadersMails, leader => {
            const email = _.toLower(leader.mail);

            const area = Areas.findOne({ name: leader.area });
            if (!area) { console.log('-- NO EXISTE AREA --', leader.area); return; }
            const user = Meteor.users.findOne({ 'emails.address': email });
            if (!user) { console.log('-- NO EXISTE USUARIO --', email); return; }

            Roles.addUsersToRoles(user._id, 'Leader');
            Meteor.users.update({ _id: user._id }, { $set: { 'profile.leaderAreaId': area._id } });

            console.log('add Leader', email);
        })



        console.log('**** leaders.update call END ****')
    }
});
