import { Meteor } from 'meteor/meteor';
import Start from './start';
import developmentEnv from './env';

Meteor.startup(() => {
  Start.start();
  if (Meteor.isDevelopment) {
    console.log('Meteor.isDevelopment');
    developmentEnv();
  }
  if (Meteor.isProduction) console.log('Meteor.isProduction');
});
