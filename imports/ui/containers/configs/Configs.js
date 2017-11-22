import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import ConfigList from '../../components/configs/ConfigsList';
import Loading from '../../components/Loading';

const composer = ({ match }, onData) => {

     

    onData(null, { });


}

export default composeWithTracker(composer, Loading)(ConfigList);
