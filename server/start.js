import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import _ from 'lodash';


const Start = {
  start: () => {
    createAccounts();
    initRoles();
    addSuperAdminHolos();
    addLeaders();
    addEmployees();
  },
};

Meteor.methods({
  'start': Start.start
})



const mails = ['mariodelatorre@holos.cl', 
'ctomba@holos.cl', 
'cbaiardi@holos.cl', 
'rmarambio@holos.cl', 
'asusel@holos.cl',
'dblazina@holos.cl',
'martingonzalez@holos.cl',
'demo@holos.cl',
'usuario@holos.cl'
];

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
  if (_.includes(Roles.getAllRoles(), 'Employee')) Roles.createRole('Employee');
  if (_.includes(Roles.getAllRoles(), 'Approver')) Roles.createRole('Approver');
  if (_.includes(Roles.getAllRoles(), 'Reporter')) Roles.createRole('Reporter');
};

const addSuperAdminHolos = () => {
  const admins = ['mariodelatorre@holos.cl', 
  'ctomba@holos.cl', 
  'cbaiardi@holos.cl', 
  'rmarambio@holos.cl', 
  'asusel@holos.cl',
  'dblazina@holos.cl',
  'martingonzalez@holos.cl',
  ];
  _.map(admins, (mail) => {
    const user = Meteor.users.findOne({ 'emails.address': mail });
    if (user && !Roles.userIsInRole(user, ['SuperAdminHolos'])) {
      Roles.addUsersToRoles(user, ['SuperAdminHolos']);
      console.log('user agreado a SuperAdminHolos', mail);
    }
  });
};

const addLeaders = () => {
  const leaders = ['mauricio.ma.rodriguez@bhpbilliton.com','delatorremario@gmail.com','demo@holos.cl',];
  _.map(leaders, (mail) => {
    const user = Meteor.users.findOne({ 'emails.address': mail });
    if (user && !Roles.userIsInRole(user, ['Leader'])) {
      Roles.addUsersToRoles(user, ['Leader']);
      console.log('user agreado a Leader', mail);
    }
  });
};
const addEmployees = () => {
  const employees = ['usuario@holos.cl'];
  _.map(employees, (mail) => {
    const user = Meteor.users.findOne({ 'emails.address': mail });
    if (user && !Roles.userIsInRole(user, ['Employee'])) {
      Roles.addUsersToRoles(user, ['Employee']);
      console.log('user agreado a Employee', mail);
    }
  });
};




// export default Start;
