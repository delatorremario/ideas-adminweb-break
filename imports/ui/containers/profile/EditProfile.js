import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { ReactiveVar } from 'meteor/reactive-var';

import Loading from '../../components/Loading.js';
import Persons from '../../../api/persons/persons';
import Areas from '../../../api/areas/areas';

import EditProfile from '../../pages/profile/EditProfile';

const imageIdVar = new ReactiveVar('');

const composer = ({ match }, onData) => {
  const user = Meteor.user();
  imageIdVar.set(user && user.profile && user.profile.imageId || '');
  const email = user && user.emails && user.emails[0] && user.emails[0].address || '';

  // buscar en personas para ver si existe el perfil
  const subsFiles = Meteor.subscribe('files.list', [imageIdVar.get()]);

  if (subsFiles.ready()) {
    Meteor.call('persons.view.email', email, (err, person) => {
       onData(null, { user, person, imageIdVar });
    });
  }
}

export default composeWithTracker(composer, Loading)(EditProfile);
