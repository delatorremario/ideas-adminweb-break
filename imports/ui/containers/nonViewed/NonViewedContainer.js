import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import _ from 'lodash';
import Loading from '../../components/Loading.js';
import Vieweds from '../../../api/vieweds/vieweds';
import NonViewedComponent from '../../components/nonViewed/NonViewedComponent';

const composer = ({ }, onData) => {
    const sub = Meteor.subscribe('vieweds.quantityNonByUser');
    if (sub.ready()) {
        const nonViewed = Vieweds.find({ userId: Meteor.userId() }).fetch();
        let number = nonViewed.length;
        onData(null, { number });
    }
};

export default composeWithTracker(composer, Loading)(NonViewedComponent);
