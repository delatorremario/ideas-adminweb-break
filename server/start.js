import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import _ from 'lodash';



const mails = ['mariodelatorre@holos.cl', 'ctomba@holos.cl', 'cbaiardi@holos.cl', 'rmarambio@holos.cl', 'asusel@holos.cl'];

const createAccounts = () => {
  _.map(mails, (mail) => {
    if (!Meteor.users.findOne({ 'emails.address': mail })) {
      Accounts.createUser({ email: mail, password: 'Holos123' });
    }
  });
};

const initRoles = () => {
  if (_.includes(Roles.getAllRoles(), 'SuperAdminHolos')) Roles.createRole('SuperAdminHolos');
  if (_.includes(Roles.getAllRoles(), 'AdminGrupoNegocio')) Roles.createRole('AdminGrupoNegocio');
  if (_.includes(Roles.getAllRoles(), 'Leader')) Roles.createRole('Leader');
};

const addMeToAdmin = () => {
  _.map(mails, (mail) => {
    const user = Meteor.users.findOne({ 'emails.address': mail });
    if (user && !Roles.userIsInRole(user, ['SuperAdminHolos'])) {
      Roles.addUsersToRoles(user, ['SuperAdminHolos']);
      console.log('user agreado a SuperAdminHolos', mail);
    }
  });
};

const addLeaders = () => {
  const leaders = ['mauricio.ma.rodriguez@bhpbilliton.com','delatorremario@gmail.com'];
  _.map(leaders, (mail) => {
    const user = Meteor.users.findOne({ 'emails.address': mail });
    if (user && !Roles.userIsInRole(user, ['Leader'])) {
      Roles.addUsersToRoles(user, ['Leader']);
      console.log('user agreado a Leader', mail);
    }
  });
};


const Start = {
  start: () => {
    createAccounts();
    initRoles();
    addMeToAdmin();
    addLeaders();
  },
};

export default Start;
