import { Meteor } from 'meteor/meteor';

import masterPersons from '../imports/api/persons/personsData';
import Persons from '../imports/api/persons/persons';
import Corporations from '../imports/api/corporations/corporations';
import Areas from '../imports/api/persons/persons';
import _ from 'lodash';


Meteor.startup(() => {

    const corporations = Corporations.find().fetch();

    /* add typesareasstructure */
    _.map(corporations, (corp) => {
        _.map(masterPersons, person => {

            _.extend(person, { corporationId: corp._id })

            const area = person.masterArea && Areas.findOne({ name: person.masterArea, corporationId:corp._id })
            const find = Persons.findOne(person)

            if (area) _.extend(person, { areaId: area._id })
            if (find) Persons.upsert({ _id: find._id }, { $set: { person } }, (data, err) => console.log('upsert', data, err));
            else Persons.insert(person, (data, err) => console.log('insert', data, err));

        })
    })
})