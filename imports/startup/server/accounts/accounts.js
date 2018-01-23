import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import _ from 'lodash';

import Persons from '../../../api/persons/persons';
import Areas from '../../../api/areas/areas';
import Corporations from '../../../api/corporations/corporations';

Accounts.onLogin((data) => {
    const user = data.user;

  

    const email = user.emails[0].address

    const person = Persons.findOne({ email });

    if(person && person.group==='EXECUT.') Roles.addUsersToRoles(user, ['Executive']);
    
    if (user && !Roles.userIsInRole(user, ['SuperAdminHolos', 'AdminGrupoNegocio', 'Leader', 'Employee', 'Executive', 'Reporter'])) {
        Roles.addUsersToRoles(user, ['Employee']);
    }

    if (!user.profile) _.extend(user, { profile: {} })
    if (!user.profile.corporationId) {
        const corp = Corporations.findOne();
        Meteor.users.update({ _id: user._id }, { $set: { 'profile.corporationId': corp && corp._id } })
    }
    if (!person) {
        const area = Areas.findOne();
        const areaId = area && area._id;
        _.extend(user.profile, { areaId, email })
        console.log('--- no existe en persons ---');
        // si el usuario no existe en PERSONS lo agrega

        Persons.insert({ ...user.profile }, (err, data) => {
            console.log('upsert person', err, data);
        })
    }
    console.log('Login complete!');


});