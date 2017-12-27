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
    fixStates()
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

const leaders = ['mauricio.ma.rodriguez@bhpbilliton.com', 'delatorremario@gmail.com', 'demo@holos.cl',];
const executives = ['felipte.f.duery@bhpbilliton.com', 'felipe.fs.aguilera@bhpbilliton.com']
const employees = ['usuario@holos.cl', 'neftali.a.herrera@bhpbilliton.com'];

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




  /* state2A 2B */

  // const arrNext2A = [
  //   {
  //     "title": "No Corresponde a mi Area",
  //     "code": "2C",
  //     "color": "orange",
  //     "action": "Devolver Idea",
  //   },
  //   {
  //     "title": "Corresponde a mi área, pero la decisión es de otro líder de área",
  //     "code": "2B",
  //     "color": "grey",
  //     "action": "Derivar Idea",
  //   },
  //   {
  //     "title": "La decisión si me corresponde",
  //     "code": "2D",
  //     "color": "green",
  //     "action": "Revisada",
  //   }
  // ]
  // const arrRoles2A = [{ role: 'Executive', title: 'Ideas Nuevas' }, { role: 'Leader', title: 'Ideas por Derivar' }];
  // _.each(['2A', '2B'], code => {
  //   const toChange = [];
  //   States.update({ "code": code }, {
  //     $set: {
  //       "roles": arrRoles2A,
  //       "nexts": arrNext2A,
  //       toChange
  //     }
  //   }, { multi: true });


  //   Ideas.update({ "states.code": code }, {
  //     $set: {
  //       "states.$.roles": arrRoles2A,
  //       "states.$.nexts": arrNext2A
  //     }
  //   }
  //     , { multi: true }
  //   )
  // })
  /* END state2A */

  /******* init 2C *******/

  // const arrNext2C = []
  // const arrRoles2C = [];
  // const title2C = "2C"
  // _.each(['2C'], code => {
  //   const toChanges = [{ text: true, label: 'Motivo' }]
  //   States.update({ "code": code }, {
  //     $set: {
  //       "roles": arrRoles2C,
  //       "nexts": arrNext2C,
  //       toChanges,
  //     }
  //   }, { multi: true });


  //   Ideas.update({ "states.code": code }, {
  //     $set: {
  //       "states.$.roles": arrRoles2C,
  //       "states.$.nexts": arrNext2C,
  //     }
  //   }
  //     , { multi: true }
  //   )
  // })


  /******* END 2C ********/

// export default Start;
