import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import _ from 'lodash';

const createAccounts = () => {
  if (!Meteor.users.findOne({ 'emails.address': 'mariodelatorre@holos.cl' }))
    Accounts.createUser({ email: 'mariodelatorre@holos.cl', password: 'Holos123' });

  if (!Meteor.users.findOne({ 'emails.address': 'cbaiardi@holos.cl' }))
    Accounts.createUser({ email: 'cbaiardi@holos.cl', password: 'Holos123' });

  if (!Meteor.users.findOne({ 'emails.address': 'ctomba@holos.cl' }))
    Accounts.createUser({ email: 'ctomba@holos.cl', password: 'Holos123' });

  if (!Meteor.users.findOne({ 'emails.address': 'dblazina@holos.cl' }))
    Accounts.createUser({ email: 'dblazina@holos.cl', password: 'HolosBlazina' });
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
