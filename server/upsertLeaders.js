import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

import _ from 'lodash';

import Areas from '../imports/api/areas/areas';

Meteor.methods({
    'leaders.update': () => {
        console.log('**** leaders.update call START ****')
        if (!Meteor.isServer) return;

        const leadersMails = [
            { mail: 'Jorge.JN.Tom@bhpbilliton.com', areasCodes: ['30007385'] },
            { mail: 'Camila.CA.Perez@bhpbilliton.com', areasCodes: ['30000637'] },
            { mail: 'Jorge.JM.Jalil@bhpbilliton.com', areasCodes: ['3000638'] },
            { mail: 'mauricio.ma.rodriguez@bhpbilliton.com', areasCodes: ['30007434'] },
            { mail: 'Maria.MP.Bustamante@bhpbilliton.com', areasCodes: ['30000311','30000005','30007387','30058188','30058053','30000092'] },
            { mail: 'delatorremario@gmail.com', areasCodes: ['30000092', '30000311', '30000005'] },
        ]

        _.each(leadersMails, leader => {
            const email = _.toLower(leader.mail);
            _.each(leader.areasCodes, code => {
                const myarea = Areas.findOne({ code });
                if (!myarea) { console.log('-- NO EXISTE AREA --', code); return; }
                const user = Meteor.users.findOne({ 'emails.address': email });
                if (user && !user.profile) Meteor.users.update({ _id: user._id }, { $set: { profile: { leaderAreasIds: [] } } });
                if (!user) { console.log('-- NO EXISTE USUARIO --', email); return; }
                Roles.addUsersToRoles(user._id, 'Leader');
                Meteor.users.update({ _id: user._id }, { $addToSet: { 'profile.leaderAreasIds': myarea._id } });
                console.log('add Leader', email);
            })
        })



        console.log('**** leaders.update call END ****')
    }
});
