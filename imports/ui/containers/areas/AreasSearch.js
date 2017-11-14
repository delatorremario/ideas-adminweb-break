
import React from 'react';
import { composeWithTracker } from 'react-komposer';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';

import Areas from '../../../api/areas/areas';
import AreasSearch from '../../components/areas/AreasSearch';

import Loading from '../../components/Loading.js';

const textSearch = new ReactiveVar('');

const composer = ({ selectArea }, onData) => {
	const subscription = Meteor.subscribe('areas.search', textSearch.get());

	if (subscription.ready()) {
		const areas = Areas.find().fetch();
		onData(null, { textSearch, selectArea, areas });
	}
};

export default composeWithTracker(composer, Loading)(AreasSearch);
