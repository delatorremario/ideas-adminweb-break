import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Ideas from '../../../api/ideas/ideas';
import EditIdea from '../../pages/ideas/EditIdea';
import Loading from '../../components/Loading.js';

const composer = ({ match }, onData) => {

  const subscriptionPersons = Meteor.subscribe('persons.list');
  const subscriptionAreas = Meteor.subscribe('areas.list');
  
  if (subscriptionPersons.ready() && subscriptionAreas.ready()) {
    onData(null, { doc: {} });
  }

};

export default composeWithTracker(composer, Loading)(EditIdea);
