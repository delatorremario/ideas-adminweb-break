import { Meteor } from 'meteor/meteor';
import Start from './start';

Meteor.startup(() => {
  Start.start();
});
