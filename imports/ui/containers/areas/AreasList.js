
import React from 'react';
import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Areas from '../../../api/areas/areas';
import AreasList from '../../components/areas/AreaList';
import TypesAreaStructure from '../../../api/typesareastructure/typesareastructure';
import { getAreasTree } from '../../../api/areas/methods';

import Loading from '../../components/Loading.js';

const composer = (params, onData) => {
    Meteor.call('areas.getTree', (err, res) => {
        if (err) { console.log('err', err); return; }
        console.log('res', res);
        onData(null, { areas: res });
    });
};

export default composeWithTracker(composer, Loading)(AreasList);
