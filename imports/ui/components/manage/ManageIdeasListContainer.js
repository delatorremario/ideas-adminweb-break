import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import _ from 'lodash';

import Ideas from '../../../api/ideas/ideas';
import ManageIdeasListComponent from './ManageIdeasListComponent';
import Loading from '../../components/Loading';

const composer = ({ }, onData) => {

    const filter = {}
    const subsIdeas = Meteor.subscribe('ideas.list',
        '',
        [],
        // stepFilter.get(),
        [],
        10,
    );
    if (subsIdeas.ready()) {
        const ideas = Ideas.find({}).fetch();
        onData(null, { ideas });
    }
};

export default composeWithTracker(composer, Loading)(ManageIdeasListComponent);
