import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser = (options, user) => {
    console.log('onCreated', options, user);
    user.roles = ['Empleado'];
    return user;
}
