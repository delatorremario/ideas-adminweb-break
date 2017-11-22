import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import ConfigList from '../../components/configs/ConfigsList';
import Loading from '../../components/Loading';
import States from '../../../api/states/states';

const composer = ({ match }, onData) => {

    const statessub = Meteor.subscribe('states.list');

    if (statessub.ready()) {
        const ideasstates = States.find().fetch();
        onData(null, { ideasstates });
    }

}

export default composeWithTracker(composer, Loading)(ConfigList);
