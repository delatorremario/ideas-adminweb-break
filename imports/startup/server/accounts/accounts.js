import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import _ from 'lodash';

import Persons from '../../../api/persons/persons';
import Areas from '../../../api/areas/areas';

Accounts.onLogin((data) => {
    const user = data.user;

    if (user && !Roles.userIsInRole(user, ['SuperAdminHolos', 'AdminGrupoNegocio', 'Leader', 'Employee', 'Executive', 'Reporter'])) {
        Roles.addUsersToRoles(user, ['Employee']);
    }

    const email = user.emails[0].address

    const person = Persons.findOne({ email });
    const areaId = Areas.findOne()._id;

    if (!user.profile) _.extend(user, { profile: {} })

    _.extend(user.profile, { areaId, email })
    
    // si el usuario no existe en PERSONS lo agrega
    Persons.upsert({ _id: person && person._id }, { $set: user && user.profile }, (err, data) => {
        console.log('upsert person', err, data);
    })
    console.log('Login complete!');


});