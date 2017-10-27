import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import _ from 'lodash';

import TypesAreas from '../imports/api/typesareas/typesareas';
import Corporations from '../imports/api/corporations/corporations';

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

const addSomeCollections = () => {
  const corporations = Corporations.find().fetch();

  /* add typesareas */
  _.map(corporations, corp =>
    _.map(['Presidencia', 'Vicepresidencia', 'Gerencia General', 'Gerencia', 'SuperIntendencia'], (typearea, key) => {
      const find = TypesAreas.findOne({ name: typearea, corporationId: corp._id });
      if (!find) {
        TypesAreas.insert({
          name: typearea,
          order: key + 1,
          corporationId: corp._id || '',
        });
      }
    }));
};

const Start = {
  start: () => {
    createAccounts();
    initRoles();
    addMeToAdmin();
    addSomeCollections();
  },
};

export default Start;
