import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import Loading from '../../components/Loading';

import EditConfig from '../../pages/configs/EditConfig'
import States from '../../../api/states/states';



const composer = ({ match }, onData) => {
    const docId = match.params._id || '';
    const subscription = Meteor.subscribe('states.view', docId);

    if (subscription.ready()) {
        const doc = States.findOne(docId);
        onData(null, { doc });
   }
};

export default composeWithTracker(composer, Loading)(EditConfig);
