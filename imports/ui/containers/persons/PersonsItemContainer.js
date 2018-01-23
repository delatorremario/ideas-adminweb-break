import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading.js';
import Persons from '../../../api/persons/persons';
import PersonsItemComponent from '../../components/persons/PersonsItemComponent';

const composer = ({ history, _id }, onData) => {
    Meteor.call('persons.view', _id, (err, person) => {
        onData(null, { history, person });
    });
};

export default composeWithTracker(composer, Loading)(PersonsItemComponent);
