
import React from 'react';
import { composeWithTracker } from 'react-komposer';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';

import Ideas from '../../../api/ideas/ideas';
import IdeasList from '../../components/ideas/IdeaList';
import ideasstates from '../../../api/ideasStatesSchema/ideasstates';

import Loading from '../../components/Loading.js';

const ideasStateCodeFilter = new ReactiveVar('');
const textSearch = new ReactiveVar('');
const ideasFindLimit = new ReactiveVar(10);


const composer = (params, onData) => {
    console.log('ideasStateCodeFilter', ideasStateCodeFilter.get());
    console.log('textSearch', textSearch.get());
    console.log('ideasFindLimit', ideasFindLimit.get());
    const subscription = Meteor.subscribe('ideas.list');
    if (subscription.ready()) {

        const codeState = ideasStateCodeFilter.get();
        const filter = codeState && { 'states.code': ideasStateCodeFilter.get() } || {}

        let ideas = Ideas.find(filter, { createdAt: -1, limit: ideasFindLimit.get() }).fetch();

        if (codeState) ideas = _.filter(ideas, idea => {
            const last = _.last(idea.states);
            return last && last.code === ideasStateCodeFilter.get()
        })

        onData(null, { ideas, ideasstates, ideasFindLimit, textSearch, ideasStateCodeFilter });
    }
};

export default composeWithTracker(composer, Loading)(IdeasList);
