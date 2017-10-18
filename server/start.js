import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import _ from 'lodash';

const createAccounts = () => {

  const mails = ['mariodelatorre@holos.cl', 'ctomba@holos.cl', 'cbaiardi@holos.cl', 'dblazina@holos.cl'];

  _.map(mails, (mail) => {
    if (!Meteor.users.findOne({ 'emails.address': mail }))
      Accounts.createUser({ email: mail, password: 'Holos123' });
  });
};

const initRoles = () => {
  if (_.includes(Roles.getAllRoles(), 'SuperAdminHolos')) Roles.createRole('SuperAdminHolos');
  if (_.includes(Roles.getAllRoles(), 'AdminGrupoNegocio')) Roles.createRole('AdminGrupoNegocio');
};

const addMeToAdmin = () => {
  const mails = ['mariodelatorre@holos.cl', 'ctomba@holos.cl', 'cbaiardi@holos.cl', 'dblazina@holos.cl'];

  _.map(mails, (mail) => {
    if (Meteor.users.find({ 'emails.address': mail }).count() > 0 && !Roles.userIsInRole(Meteor.users.find({ 'emails.address': mail }), ['SuperAdminHolos'])) {
      Roles.addUsersToRoles(Meteor.users.findOne({ 'emails.address': mail }), ['SuperAdminHolos']);
      console.log('user agreado a SuperAdminHolos', mail);
    }
  });
};

const Start = {
  start: () => {
    createAccounts();
    initRoles();
    addMeToAdmin();
  },
};

export default Start;
