import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Alerts from '../alerts';
import _ from 'lodash';

Meteor.publish('alerts.list', () => Alerts.find());

Meteor.publish('alerts.listByUserDestination', () => {
  const user = Meteor.user();
  if(user) return Alerts.find({ usersDestination: Meteor.userId() })
});

Meteor.publish('alerts.topList', limit => {
  check(limit, Number);
  const user = Meteor.user();
  if(user) return Alerts.find({ usersDestination: Meteor.userId()}, { limit: limit });
});

Meteor.publish('alerts.view', (_id) => {
  check(_id, String);
  return Alerts.find(_id)
});
