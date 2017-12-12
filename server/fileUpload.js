import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Email } from 'meteor/email';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base'
import Files from '../imports/api/files/files';

Meteor.methods({
    RemoveFileStartActivities: _id => {
        check(_id, String);
        Files.findOne({ _id }).remove();
        // Contracts.update({}, { $unset: { pdfStartActivities: 1 } }, false, true);
    },
    RemoveFileRisksPrevention: _id => {
        check(_id, String);
        Files.findOne({ _id }).remove();
        // Contracts.update({}, { $unset: { pdfRisksPrevention: 1 } }, false, true);
    },
    RemoveFileCriticalTasksPlan: _id => {
        check(_id, String);
        Files.findOne({ _id }).remove();
        // Contracts.update({}, { $unset: { pdfStartActivities: 1 } }, false, true);
    },
    // checkUserState: email => {
    //     check(email, String);
    //     const user = Meteor.users.find({ "emails.address": email }).fetch();
    //     if (user[0].profile.enabled) {
    //         return user[0].profile.enabled
    //     }
    // },
    // hanldeCreateUser: (userData, htmlBody) => {
    //     check(userData, Object);
    //     check(htmlBody, String);
    //     const userId = Accounts.createUser(userData);
    //     const to = userData.email;
    //     const from = "no-replay@simin.com";
    //     const subject = "Bienvenido!";
    //     const html = htmlBody;
        
    //     Email.send({ to, from, subject, html })
    //     Roles.addUsersToRoles(userId, 'AdminGrupoNegocio');
    // }
});
