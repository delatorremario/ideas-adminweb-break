
import React from 'react';
import { composeWithTracker } from 'react-komposer';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

import Ideas from '../../../api/ideas/ideas';
import IdeasListPage from '../../pages/ideas/IdeasListPage';
import States from '../../../api/states/states';
// import ideasstates from '../../../api/ideasStatesSchema/ideasstates';

import Loading from '../../components/Loading.js';

const statesCodesFilter = new ReactiveVar([]);
const areasIdsFilter = new ReactiveVar([]);
const ideasFindLimit = new ReactiveVar(5);
const textSearch = new ReactiveVar('');

const composer = ({ match }, onData) => {

	/*** set filters */

	const user = Meteor.user();

	const filters = {};

	const text = textSearch.get()
	const states = statesCodesFilter.get()
	const areasIds = areasIdsFilter.get()
	const limit = ideasFindLimit.get()

	if (textSearch.get()) _.extend(filters, { $text: { $search: text } });
	if (statesCodesFilter.get().length > 0) {
		const codesFilter = [];
            _.each(states, code => {
                codesFilter.push({ $where: `this.states[this.states.length - 1].code === '${code}'` })
            })
		_.extend(filters, { $or: codesFilter});
			//'states.code': { $in: statesCodesFilter.get() } 
		
	}
	if (areasIdsFilter.get().length > 0) _.extend(filters, { 'chief.areaId': { $in: areasIds } });

	console.log('---areasids---', areasIds);

	/*** end set filters */

	const subsIdeas = Meteor.subscribe('ideas.filters', filters, limit);

	const statessub = Meteor.subscribe('states.list');

	if (subsIdeas.ready() && statessub.ready()) {

		const ideasstates = States.find({}, {}).fetch();
		console.log('---filters---', filters);
		const ideas = _.isEmpty(filters) && [] || Ideas.find({}, { sort: { date: 1 }, limit: ideasFindLimit.get() }).fetch();
		//const ideas = Ideas.find({}, { sort: { date: 1 }, limit: ideasFindLimit.get() }).fetch();

		// if (states.length > 0) {
		// 	ideas = _.filter(ideas, (idea) => {
		// 		const last = _.last(idea.states);
		// 		return last && _.some(states, s => s === last.code);
		// 	})
		// }

		const showEdit = Roles.userIsInRole(user && user._id, ['SuperAdminHolos', 'Leader'])


		onData(null, { ideas, ideasstates, ideasFindLimit, textSearch, statesCodesFilter, areasIdsFilter, user, showEdit });
	}
};

export default composeWithTracker(composer, Loading)(IdeasListPage);
