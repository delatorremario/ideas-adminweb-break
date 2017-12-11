import { Meteor } from 'meteor/meteor';
import { developmentEnv, productionEnv } from './env';

//import '../imports/startup/server/accounts/email-templates';
//import '../imports/startup/server/accounts/default-roles';

import '../imports/startup/server/index.js';


Meteor.startup(() => {
  if (Meteor.isDevelopment) {
    console.log('Meteor.isDevelopment');
    developmentEnv();
  }
  if (Meteor.isProduction) {
    console.log('Meteor.isProduction');
    productionEnv();
  }
});


