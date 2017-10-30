
import React from 'react';
import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Areas from '../../../api/areas/areas';
import AreasList from '../../components/areas/AreaList';
import TypesAreaStructure from '../../../api/typesareastructure/typesareastructure';
import Loading from '../../components/Loading.js';

const composer = (params, onData) => {
    const areassubs = Meteor.subscribe('areas.list');
    const areastructssubs = Meteor.subscribe('typesareastructure.list');
    if (areassubs.ready() && areastructssubs.ready()) {
        const typesAreaStructure = TypesAreaStructure.find({}, { sort: { order: 1 } }).fetch();
        const areas = Areas.find({}, { sort: { name: 1 } }).fetch();
        onData(null, { areas, typesAreaStructure });
    }
}

export default composeWithTracker(composer, Loading)(AreasList);
