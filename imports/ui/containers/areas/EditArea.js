import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Areas from '../../../api/areas/areas';
import EditArea from '../../pages/areas/EditArea';
import Loading from '../../components/Loading.js';

const composer = ({ match }, onData) => {
  const docId = match.params._id;
  const subscription = Meteor.subscribe('areas.view', docId);

  if (subscription.ready()) {
    const doc = Areas.findOne(docId);
    onData(null, { doc });
  }
};

export default composeWithTracker(composer, Loading)(EditArea);
