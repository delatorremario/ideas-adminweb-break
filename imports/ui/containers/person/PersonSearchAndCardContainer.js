import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { ReactiveVar } from 'meteor/reactive-var';
import Loading from '../../components/Loading.js';
import Persons from '../../../api/persons/persons';
import PersonSearchAndCard from '../../components/persons/PersonSearchAndCard';

const textSearch = new ReactiveVar('');
const textSearchLimit = new ReactiveVar(0);
const personReactiveVar = new ReactiveVar(undefined);

const onChangeSearchPerson = (e) => {
      e.preventDefault()
      // console.log('__onChangeSearchPerson__', e.target.value);
      textSearch.set(e.target.value);
}

const composer = ({ selectPerson, person, onlyChief, myArea, parentArea }, onData) => {
      const subscriptionPersons = Meteor.subscribe('persons.search', textSearch.get(), onlyChief || false, myArea || false, parentArea || false, textSearchLimit.get());
      //const subAreas = Meteor.subscribe('areas.list');
      if (subscriptionPersons.ready()) {
            const persons = Persons.find({}, { sort: { score: -1 }, limit: textSearchLimit.get() }).fetch();
            if (person) textSearch.set('');
            onData(null, { persons, person, onChangeSearchPerson, selectPerson });
      }
};

export default composeWithTracker(composer, Loading)(PersonSearchAndCard);
