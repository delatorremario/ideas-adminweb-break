import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { ReactiveVar } from 'meteor/reactive-var'

import Ideas from '../../../api/ideas/ideas';
import EditIdea from '../../pages/ideas/EditIdea';
import Loading from '../../components/Loading.js';
import Persons from '../../../api/persons/persons';


const textSearch = new ReactiveVar('');
const textSearchLimit = new ReactiveVar(10);

const composer = ({ match }, onData) => {

  console.log('textSearch', textSearch.get());
  
  const docId = match.params._id;
  const subscription = Meteor.subscribe('ideas.view', docId);

  const subscriptionPersons = Meteor.subscribe('persons.search', textSearch.get(), textSearchLimit.get());
  const subscriptionAreas = Meteor.subscribe('areas.list');

  if (subscription.ready() && subscriptionPersons.ready() && subscriptionAreas.ready()) {
    const persons = Persons.find({}, { sort: { score: -1 }, limit: textSearchLimit.get() }).fetch();
    const doc = Ideas.findOne(docId);
    onData(null, { doc, textSearch, persons });
  }

};

export default composeWithTracker(composer, Loading)(EditIdea);
