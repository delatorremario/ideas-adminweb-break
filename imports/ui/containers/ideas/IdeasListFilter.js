
import React from 'react';
import { composeWithTracker } from 'react-komposer';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

import Ideas from '../../../api/ideas/ideas';
import IdeasFilter from '../../pages/ideas/IdeasFilter';
import Areas from '../../../api/areas/areas';
// import ideasstates from '../../../api/ideasStatesSchema/ideasstates';

import Loading from '../../components/Loading.js';
import IdeaList from '../../components/ideas/IdeaList';

// const ideasFindLimit = new ReactiveVar(0);

const composer = ({ match }, onData) => {

	const { areaId, stateCode } = match.params;

	const areasviewsub = Meteor.subscribe('areas.view', areaId || '');

	if (areasviewsub.ready()) {

		//const statessub = Meteor.subscribe('states.list');

		/*** set filters */

		const user = Meteor.user();
		const area = Areas.findOne({ _id: areaId });

		const filters = {};

		if (stateCode) _.extend(filters, {
			$where: `this.states[this.states.length - 1].code === '${stateCode}'`
		});

		if (areaId) _.extend(filters, { 'chief.areaId': { $in: area && area.family || [] } });
		if (!areaId) _.extend(filters, {
			$or: [
				{ 'person._id': user && user.profile && user.profile._id },
				{ 'collaborators._id': user && user.profile && user.profile._id }]
		})

		/*** end set filters */

		const subsIdeas = Meteor.subscribe('ideas.filters', filters, 0);

		if (subsIdeas.ready()) {

			let ideas = Ideas.find(filters, { sort: { date: 1 }, limit: 0 }).fetch();

			const showEdit = Roles.userIsInRole(user && user._id, ['SuperAdminHolos', 'Leader'])
			console.log('--IDEAS--container--', ideas)

			onData(null, { ideas, user, showEdit });
		}
	}
};

export default composeWithTracker(composer, Loading)(IdeasFilter);
