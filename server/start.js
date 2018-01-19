import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import _ from 'lodash';

import Persons from '../imports/api/persons/persons';
import Corporations from '../imports/api/corporations/corporations';
import States from '../imports/api/states/states';
import Ideas from '../imports/api/ideas/ideas';

const Start = {
  start: () => {
    createAccounts();
    initRoles();
    addSuperAdminHolos();
    addLeaders();
    addEmployees();
    addExecutives();
    setProfile();
    // fixStates()
  },
};

Meteor.methods({
  'start': Start.start
})



const admins = ['mariodelatorre@holos.cl',
  'ctomba@holos.cl',
  'cbaiardi@holos.cl',
  'rmarambio@holos.cl',
  'asusel@holos.cl',
  'dblazina@holos.cl',
  'martingonzalez@holos.cl',
  'cguinez@holos.cl',
];

const leaders = ['mauricio.ma.rodriguez@bhpbilliton.com', 'delatorremario@gmail.com', 'demo@holos.cl',
  'jorge.jm.jalil@bhpbilliton.com', 'jorge.jn.tom@bhpbilliton.com',
  'camila.ca.perez@bhpbilliton.com', 'maria.mp.bustamante@bhpbilliton.com'
];

const executives = ['luis.gonzalez4@bhpbilliton.com', 'carlos.r.delgado@bhpbilliton.com']
const employees = ['usuario@holos.cl','cristhianco.diaz@bhpbilliton.com', 'neftali.a.herrera@bhpbilliton.com'];

const createAccounts = () => {
  _.map(_.union(admins, leaders), (mail) => {
    if (!Meteor.users.findOne({ 'emails.address': mail })) {
      Accounts.createUser({ email: mail, password: 'Holos123' });
    }
  });
  _.map(_.union(employees, executives), (mail) => {
    if (!Meteor.users.findOne({ 'emails.address': mail })) {
      Accounts.createUser({ email: mail, password: '123456' });
    }
  });
};

const initRoles = () => {
  if (_.includes(Roles.getAllRoles(), 'SuperAdminHolos')) Roles.createRole('SuperAdminHolos');
  if (_.includes(Roles.getAllRoles(), 'AdminGrupoNegocio')) Roles.createRole('AdminGrupoNegocio');
  if (_.includes(Roles.getAllRoles(), 'Leader')) Roles.createRole('Leader');
  if (_.includes(Roles.getAllRoles(), 'Employee')) Roles.createRole('Employee');
  if (_.includes(Roles.getAllRoles(), 'Executive')) Roles.createRole('Executive');
  if (_.includes(Roles.getAllRoles(), 'Reporter')) Roles.createRole('Reporter');
};

const addSuperAdminHolos = () => {

  _.map(admins, (mail) => {
    const user = Meteor.users.findOne({ 'emails.address': mail });
    if (user && !Roles.userIsInRole(user, ['SuperAdminHolos'])) {
      Roles.addUsersToRoles(user, ['SuperAdminHolos']);
      console.log('user agreado a SuperAdminHolos', mail);
    }
  });
};

const addLeaders = () => {
  _.map(leaders, (mail) => {
    const user = Meteor.users.findOne({ 'emails.address': mail });
    if (user && !Roles.userIsInRole(user, ['Leader'])) {
      Roles.addUsersToRoles(user, ['Leader']);
      console.log('user agreado a Leader', mail);
    }
  });
};
const addEmployees = () => {
  _.map(employees, (mail) => {
    const user = Meteor.users.findOne({ 'emails.address': mail });
    if (user && !Roles.userIsInRole(user, ['Employee'])) {
      Roles.addUsersToRoles(user, ['Employee']);
      console.log('user agreado a Employee', mail);
    }
  });
};
const addExecutives = () => {
  _.map(executives, (mail) => {
    const user = Meteor.users.findOne({ 'emails.address': mail });
    if (user && !Roles.userIsInRole(user, ['Executive'])) {
      Roles.addUsersToRoles(user, ['Executive']);
      console.log('user agreado a Executive', mail);
    }
  });
};

const setProfile = () => {
  _.map(_.union(admins, leaders, employees), (mail) => {
    const user = Meteor.users.findOne({ 'emails.address': mail })
    if (user) {

      let profile = Persons.findOne({ 'email': mail });
      if (!profile) {
        const corporation = Corporations.findOne();
        profile = corporation && { corporationId: corporation._id }
      }

      Meteor.users.update({ _id: user._id }, { $set: { profile } });
      console.log('set profile', user._id);
    }
  });
}
