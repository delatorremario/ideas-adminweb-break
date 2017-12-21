import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import _ from 'lodash';

import Ideas from '../../../api/ideas/ideas';
import ManageIdeasListComponent from './ManageIdeasListComponent';
import Loading from '../../components/Loading';

const composer = ({ state }, onData) => {
        const ideas = state.ideas
        onData(null, { ideas });
};

export default composeWithTracker(composer, Loading)(ManageIdeasListComponent);
