import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import _ from 'lodash';

import Loading from '../../components/Loading.js';

import SetStatePage from '../../pages/set-state/SetStatePage';
import Ideas from '../../../api/ideas/ideas';
import States from '../../../api/states/states';

const composer = ({ match }, onData) => {
    // console.log('--match --', match)
    const ideaId = match.params.ideaId;
    const code = match.params.code;
    const ideaSub = Meteor.subscribe('ideas.view', ideaId);
    const stateSub = Meteor.subscribe('states.viewByCode', code)
    if (ideaSub.ready() && stateSub.ready()) {
        const idea = Ideas.findOne({ _id: ideaId });
        const state = States.findOne({ code: code })
        const last = _.last(idea.states);
        const next = _.find(last.nexts, { code })
        if (!state.toChanges) {
            console.log('---- havent  toChange ------');
            state.toChanges = []
        }

        onData(null, { idea, state, next });
    }
};

export default composeWithTracker(composer, Loading)(SetStatePage);
