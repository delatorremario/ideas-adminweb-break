import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { ReactiveVar } from 'meteor/reactive-var';

import EditIdea from '../../pages/ideas/EditIdea';
import Loading from '../../components/Loading.js';
import Persons from '../../../api/persons/persons';


const textSearch = new ReactiveVar('');
const textSearchLimit = new ReactiveVar(10);

const composer = ({ match }, onData) => {

  const subscriptionPersons = Meteor.subscribe('persons.search', textSearch.get(), textSearchLimit.get());
  const subscriptionAreas = Meteor.subscribe('areas.list');

  if (subscriptionPersons.ready() && subscriptionAreas.ready()) {
    const persons = Persons.find({}, { sort: { score: -1 }, limit: textSearchLimit.get() }).fetch();
    onData(null, { doc: {}, textSearch, persons });
  }

};

export default composeWithTracker(composer, Loading)(EditIdea);
