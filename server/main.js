import { Meteor } from 'meteor/meteor';
import { developmentEnv, productionEnv } from './env';
import Start from './start';


Meteor.startup(() => {
  Start.start();
  if (Meteor.isDevelopment) {
    console.log('Meteor.isDevelopment');
    developmentEnv();
  }
  if (Meteor.isProduction) {
    console.log('Meteor.isProduction');
    productionEnv();
  }
});

