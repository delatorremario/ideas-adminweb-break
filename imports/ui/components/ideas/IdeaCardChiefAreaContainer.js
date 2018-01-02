import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import _ from 'lodash';

import Loading from '../../components/Loading';

import IdeaCardChiefAreaComponent from '../../components/ideas/IdeaCardChiefAreaComponent';

const composer = ({ chief }, onData) => {
    Meteor.call('area.get', chief.areaId, (err, area) => {
        if (err) { console.log('err', err); return; }
        chief.area = area;
        onData(null, { chief });
    })
};

export default composeWithTracker(composer, Loading)(IdeaCardChiefAreaComponent);
