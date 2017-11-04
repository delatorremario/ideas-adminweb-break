import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Ideas from '../../../api/ideas/ideas';
import EditIdea from '../../pages/ideas/EditIdea';
import Loading from '../../components/Loading.js';

const composer = ({ match }, onData) => {
  // const docId = match.params._id;
  // const subscription = Meteor.subscribe('ideas.view', docId);

  const subscriptionPersons = Meteor.subscribe('persons.list');

  if (subscriptionPersons.ready()) {
    console.log('READY subscription');
    // const doc = Ideas.findOne(docId);
    onData(null, { doc: {} });
  }

};

export default composeWithTracker(composer, Loading)(EditIdea);
