import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import Loading from '../../components/Loading.js';

import ManagePage from '../../pages/manage/ManagePage';


const composer = ({ match }, onData) => {

      onData(null, { });

};

export default composeWithTracker(composer, Loading)(ManagePage);
