
import React from 'react';
import { composeWithTracker } from 'react-komposer';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

import Ideas from '../../../api/ideas/ideas';
import IdeasList from '../../components/ideas/IdeaList';
import States from '../../../api/states/states';
// import ideasstates from '../../../api/ideasStatesSchema/ideasstates';

import Loading from '../../components/Loading.js';

const textSearch = new ReactiveVar('');
const statesCodesFilter = new ReactiveVar([]);
const areasIdsFilter = new ReactiveVar([]);
const ideasFindLimit = new ReactiveVar(10);

const composer = ({ match }, onData) => {

	const { areaId, showUser, remove } = match.params;

	/*** set filters */

	const user = Meteor.user();

	if (!user) return;

	const filters = {};


	if (textSearch.get()) _.extend(filters, { $text: { $search: textSearch.get() } });
	if (statesCodesFilter.get().length > 0) _.extend(filters, { 'states.code': { $in: statesCodesFilter.get() } });
	if (areasIdsFilter.get().length > 0) _.extend(filters, { 'chief.areaId': { $in: areasIdsFilter.get() } });

	/*** end set filters */

	const subscription = Meteor.subscribe('ideas.filters',
		filters,
		ideasFindLimit.get(),
	);

	const areasviewsub = Meteor.subscribe('areas.view', areaId || '');
	const statessub = Meteor.subscribe('states.list');

	if (subscription.ready() && areasviewsub.ready() && statessub.ready()) {
		const ideasstates = States.find({}, {}).fetch();

		const states = statesCodesFilter.get();

		let ideas = Ideas.find({}, { sort: { date: 1 }, limit: ideasFindLimit.get() }).fetch();

		if (states.length > 0) {
			ideas = _.filter(ideas, (idea) => {
				const last = _.last(idea.states);
				return last && _.some(states, s => s === last.code);
			})
		}

		const showEdit = Roles.userIsInRole(user && user._id, ['SuperAdminHolos', 'Leader'])


		onData(null, { ideas, ideasstates, ideasFindLimit, textSearch, statesCodesFilter, areasIdsFilter, params: match.params, user, showEdit, remove });
	}
};

export default composeWithTracker(composer, Loading)(IdeasList);
