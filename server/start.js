import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import Persons from '../imports/api/persons/persons';
import Corporations from '../imports/api/corporations/corporations';
import _ from 'lodash';

const Start = {
  start: () => {
    createAccounts();
    initRoles();
    addSuperAdminHolos();
    addLeaders();
    addEmployees();
    setProfile();
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
];

const leaders = ['mauricio.ma.rodriguez@bhpbilliton.com', 'delatorremario@gmail.com', 'demo@holos.cl',];

const employees = ['usuario@holos.cl', 'neftali.a.herrera@bhpbilliton.com'];

const createAccounts = () => {
  _.map(_.union(admins, leaders), (mail) => {
    if (!Meteor.users.findOne({ 'emails.address': mail })) {
      Accounts.createUser({ email: mail, password: 'Holos123' });
    }
  });
  _.map(employees, (mail) => {
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
  if (_.includes(Roles.getAllRoles(), 'Approver')) Roles.createRole('Approver');
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



// export default Start;
