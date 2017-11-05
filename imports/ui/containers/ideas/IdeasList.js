
import React from 'react';
import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Ideas from '../../../api/ideas/ideas';
import IdeasList from '../../components/ideas/IdeaList';
import TypesAreaStructure from '../../../api/typesareastructure/typesareastructure';

import Loading from '../../components/Loading.js';

const composer = (params, onData) => {
    const subscription = Meteor.subscribe('ideas.list');
    if (subscription.ready()) {
        const ideas = Ideas.find({}, { createdAt: -1, limit: 10 }).fetch();
        onData(null, { ideas });
    }
};

export default composeWithTracker(composer, Loading)(IdeasList);
