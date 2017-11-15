
import React from 'react';
import { composeWithTracker } from 'react-komposer';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';

import Ideas from '../../../api/ideas/ideas';
import IdeasList from '../../components/ideas/IdeaList';
import ideasstates from '../../../api/ideasStatesSchema/ideasstates';

import Loading from '../../components/Loading.js';

const textSearch = new ReactiveVar('');
const statesFilter = new ReactiveVar([]);
// const stepFilter = new ReactiveVar('');
const areasIdsFilter = new ReactiveVar([]);
const ideasFindLimit = new ReactiveVar(10);

const composer = ({ match }, onData) => {

	console.log('match', match);
	const { areaId } = match.params;
	const subscription = Meteor.subscribe('ideas.list',
		textSearch.get(),
		statesFilter.get(),
		// stepFilter.get(),
		areasIdsFilter.get(),
		ideasFindLimit.get(),
	);

	console.log('areaID', areaId);

	const areasviewsub = Meteor.subscribe('areas.view', areaId || '');

	if (subscription.ready() && areasviewsub.ready()) {
		const states = statesFilter.get();

		let ideas = Ideas.find({}, { sort: { date: -1}, limit: ideasFindLimit.get() }).fetch();

		// if (states) {
		// 	ideas = _.filter(ideas, (idea) => {
		// 		const last = _.last(idea.states);
		// 		return last && last.state === _.find(states, state);
		// 	})
		// }

		onData(null, { ideas, ideasstates, ideasFindLimit, textSearch, statesFilter, areasIdsFilter, params: match.params });
	}
};

export default composeWithTracker(composer, Loading)(IdeasList);
