import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import Corporations from '../corporations'

Meteor.publish('corporations.list', () => Corporations.find())

Meteor.publish('corporation.view', (_id) => {
  check(_id, String)
  return Corporations.find(_id)
})