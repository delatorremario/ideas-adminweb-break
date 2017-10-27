
import React from 'react';
import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Areas from '../../../api/areas/areas';
import AreasList from '../../components/areas/AreaList';
import Loading from '../../components/Loading.js';

const composer = (params, onData) => {
    const subscription = Meteor.subscribe('areas.list');
    if (subscription.ready()) {
        const areas = Areas.find({}, { sort: { name: 1 } }).fetch();
        onData(null, { areas });
    }
}

export default composeWithTracker(composer, Loading)(AreasList);
