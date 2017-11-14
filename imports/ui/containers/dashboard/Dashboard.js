import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Dashboard from '../../../ui/pages/dashboard/Dashboard';
import Loading from '../../components/Loading';

const composer = ({ match }, onData) => {

    Meteor.call('getDashboard', (err, data) => {
        // console.log('data', data);
        // console.log('err', err);
        onData(null, { data });
    })

}

export default composeWithTracker(composer, Loading)(Dashboard);
