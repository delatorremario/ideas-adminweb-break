import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading.js';
import Areas from '../../../api/areas/areas';
import AreasListComponent from '../../components/areas/AreasListComponent';
import { ReactiveVar } from 'meteor/reactive-var';

const textSearch = new ReactiveVar('');
const textSearchLimit = new ReactiveVar(10);

const onChangeSearchArea = (e) => {
    e.preventDefault()
    textSearch.set(e.target.value);
}
const composer = ({ history }, onData) => {
    const subscriptionAreass = Meteor.subscribe('areas.search', textSearch.get(), textSearchLimit.get());
    if (subscriptionAreass.ready()) {
        const areas = Areas.find({}, { sort: { score: -1 }, limit: textSearchLimit.get() }).fetch();
        onData(null, { areas, onChangeSearchArea });
    }
};

export default composeWithTracker(composer, Loading)(AreasListComponent);
