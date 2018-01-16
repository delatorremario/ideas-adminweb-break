
import React from 'react';
import { composeWithTracker } from 'react-komposer';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

import Ideas from '../../../api/ideas/ideas';
import MyIdeasList from '../../components/ideas/MyIdeasList';

import Loading from '../../components/Loading.js';

const ideasFindLimit = new ReactiveVar(0);

const composer = ({ match }, onData) => {
	const user = Meteor.user();
	if (!user) return;
	const filters = {
		$or: [{ 'person._id': user && user.profile._id }, { 'collaborators._id': user && user.profile._id }]
	};

	const subscription = Meteor.subscribe('ideas.filters', filters, ideasFindLimit.get());

	if (subscription.ready()) {

		const ideas = Ideas.find(filters, { sort: { date: 1 }, limit: ideasFindLimit.get() }).fetch();
		const showEdit = Roles.userIsInRole(user && user._id, ['SuperAdminHolos', 'Leader'])

		onData(null, { ideas, ideasFindLimit, user, showEdit });
	}
};

export default composeWithTracker(composer, Loading)(MyIdeasList);
