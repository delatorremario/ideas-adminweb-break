import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import Loading from '../../components/Loading.js';

import SetStatePage from '../../pages/set-state/SetStatePege';
import Ideas from '../../../api/ideas/ideas';
import States from '../../../api/states/states';

const composer = ({ match }, onData) => {
    const ideaId = match.params.ideaId;
    const code = match.params.code;
    const ideaSub = Meteor.subscribe('ideas.view', ideaId);
    const stateSub = Meteor.subscribe('states.viewByCode', code)
    if (ideaSub.ready() && stateSub.ready()) {
        const idea = Ideas.findOne({ _id: ideaId });
        const state = States.findOne({ code: code })
        onData(null, { idea, state });
    }
};

export default composeWithTracker(composer, Loading)(SetStatePage);
