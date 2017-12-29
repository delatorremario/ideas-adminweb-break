import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import Loading from '../../components/Loading.js';
import PersonSearch from '../../components/ideas/PersonSearch';

const composer = ({ match }, onData) => {


      Meteor.call('manages.states', (err, listStates) => {
            if (err) { console.log('ERR', err.message); return; }

            onData(null, { listStates });

      })


};

export default composeWithTracker(composer, Loading)(ManagePage);