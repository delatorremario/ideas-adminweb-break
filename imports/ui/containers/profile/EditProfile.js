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
  const subscription = Meteor.subscribe('persons.email', email);
  const subsFiles = Meteor.subscribe('files.list', [imageIdVar.get()]);


  if (subscription.ready() && subsFiles.ready()) {
    const person = Persons.findOne({ email });

    Meteor.call('persons.view', person._id, (err, personview) => {
      onData(null, { user, person: personview, imageIdVar });
      //onData(null, { history, person });
    });
    // const areaId = person && person.areaId || '';
    // const subsArea = Meteor.subscribe('areas.view', areaId);

    // if (subsArea.ready()) {
    //   const area = Areas.findOne({ _id: areaId });
    //   if (area) _.extend(person, ({ area: area.name }));


  }
}

export default composeWithTracker(composer, Loading)(EditProfile);
