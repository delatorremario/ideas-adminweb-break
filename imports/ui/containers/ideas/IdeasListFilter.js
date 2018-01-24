import React from 'react';
import { composeWithTracker } from 'react-komposer';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import _ from 'lodash';
import moment from 'moment';

import Ideas from '../../../api/ideas/ideas';
import IdeasFilter from '../../pages/ideas/IdeasFilter';
import Areas from '../../../api/areas/areas';
// import ideasstates from '../../../api/ideasStatesSchema/ideasstates';

import Loading from '../../components/Loading.js';

const ideasFindLimit = new ReactiveVar(10);

const composer = ({ match }, onData) => {

	const { areaId, stateCode, month } = match.params;

	const areasviewsub = areaId ==='funciones' && Meteor.subscribe('areas.list') || Meteor.subscribe('areas.view', areaId || '');

	if (areasviewsub.ready()) {

		//const statessub = Meteor.subscribe('states.list');

		/*** set filters */

		const user = Meteor.user();
		const area = Areas.findOne({ _id: areaId });

		const filters = {};

		if (stateCode) _.extend(filters, {
			$where: `this.states[this.states.length - 1].code === '${stateCode}'`
		});

		if (areaId && areaId!='funciones') _.extend(filters, { 'chief.areaId': { $in: area && area.family || [] } });
		if (areaId && areaId==='funciones') {
			const areasFunctionals = Areas.find({function:true}).fetch();
			const areasFunctionalsFamilyIds = _.flattenDeep(_.map(areasFunctionals, 'family'));
			_.extend(filters, { 'chief.areaId': { $in: areasFunctionalsFamilyIds } });
		}
		if (!areaId) _.extend(filters, {
			$or: [
				{ 'person._id': user && user.profile && user.profile._id },
				{ 'collaborators._id': user && user.profile && user.profile._id }]
		})

		/* ---month--- */
		
		switch (_.toInteger(month)) {
			case 0:
				_.extend(filters, {
					date: {
						$gte: moment().startOf('month').toDate(),
						$lt: moment().endOf('month').toDate(),
					}
				})
				break;
			case 1:
				_.extend(filters, {
					date: {
						$gte: moment().subtract(1, 'month').startOf('month').toDate(),
						$lt: moment().subtract(1, 'month').endOf('month').toDate(),
					}
				})
				break;
			case 3:
				_.extend(filters, {
					date: {
						$gte: moment().subtract(3, 'month').startOf('month').toDate(),
						$lt: moment().subtract(1, 'month').endOf('month').toDate(),
					}
				})
				break;
			case 6:
				_.extend(filters, {
					date: {
						$gte: moment().subtract(6, 'month').startOf('month').toDate(),
						$lt: moment().subtract(1, 'month').endOf('month').toDate(),
					}
				})
				break;
			default:
		}

		/*** end set filters */
		const subsIdeas = Meteor.subscribe('ideas.filters', filters, 0);

		if (subsIdeas.ready()) {

			let ideas = Ideas.find(filters, { sort: { date: 1 }, limit: 0 }).fetch();

			const showEdit = Roles.userIsInRole(user && user._id, ['SuperAdminHolos', 'Leader'])

			onData(null, { ideas, user, showEdit, ideasFindLimit });
		}
	}
};

export default composeWithTracker(composer, Loading)(IdeasFilter);
