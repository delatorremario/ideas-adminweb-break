import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading.js';
import Persons from '../../../api/persons/persons';
import PersonsListComponent from '../../components/persons/PersonsListComponent';
import { ReactiveVar } from 'meteor/reactive-var';

const textSearch = new ReactiveVar('');
const textSearchLimit = new ReactiveVar(10);

const onChangeSearchPerson = (e) => {
    e.preventDefault()
    textSearch.set(e.target.value);
}
const composer = ({ history }, onData) => {
    const subscriptionPersons = Meteor.subscribe('persons.search', textSearch.get(), false, false, false, textSearchLimit.get());
    //const subAreas = Meteor.subscribe('areas.list');
    if (subscriptionPersons.ready()) {
        const persons = Persons.find({}, { sort: { score: -1 }, limit: textSearchLimit.get() }).fetch();
        onData(null, { persons, onChangeSearchPerson });
    }
};

export default composeWithTracker(composer, Loading)(PersonsListComponent);
