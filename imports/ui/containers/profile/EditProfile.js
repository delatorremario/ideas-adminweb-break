import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { ReactiveVar } from 'meteor/reactive-var';

import Loading from '../../components/Loading.js';
import Persons from '../../../api/persons/persons';

import EditProfile from '../../pages/profile/EditProfile';


const composer = ({ match }, onData) => {
  const user = Meteor.user();
  const email = user && user.emails && user.emails[0] && user.emails[0].address || '';

  // buscar en personas para ver si existe el perfil
  const subscription = Meteor.subscribe('persons.email', email);

  if (subscription.ready()) {
    const person = Persons.findOne({ email });
    onData(null, { user, person });
  }

};

export default composeWithTracker(composer, Loading)(EditProfile);
