import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Ideas from '../../../api/ideas/ideas.js';
import ViewIdea from '../../pages/ideas/ViewIdea.js';
import Loading from '../../components/Loading.js';

const composer = ({ match }, onData) => {
  // console.log('match.params._id', match.params._id)
  const subscription = Meteor.subscribe('idea.view', match.params._id);

  if (subscription.ready()) {
    const doc = Ideas.findOne(match.params._id);
    onData(null, { doc });
  }
};

export default composeWithTracker(composer, Loading)(ViewIdea);
