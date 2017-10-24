import { Meteor } from 'meteor/meteor';
import { AccountsServer } from 'meteor/accounts-base';

import { check } from 'meteor/check';


import Corporations from '../corporations';

Meteor.publish('corporations.list', () => {
  const self = this;
  console.log('corporations.list user', self.userId);
  return Corporations.find();
});


Meteor.publish('corporation.view', (_id) => {
  check(_id, String);
  return Corporations.find(_id);
});
