import { Meteor } from 'meteor/meteor';

import masterPersons from '../imports/api/persons/personsData';
import Persons from '../imports/api/persons/persons';
import Corporations from '../imports/api/corporations/corporations';
import Areas from '../imports/api/areas/areas';
import _ from 'lodash';

Meteor.methods({
    'persons.populate': () => {
        console.log('persons.populate call');
        if (!Meteor.isServer) return;
        console.log('persons.populate is server');
        const corporations = Corporations.find().fetch();

        /* add typesareasstructure */
        _.map(corporations, (corp) => {
            _.map(masterPersons, person => {

                _.extend(person, { corporationId: corp._id });
                // console.log('PERSON', person);
                let area = person.masterarea && Areas.findOne({ name: person.masterarea, corporationId: corp._id });
                if (!area) area = Areas.findOne({ name: 'Escondida' });
                const find = Persons.findOne({ rut: person.rut });
                // console.log('FIND', find)
                if (area) _.extend(person, { areaId: area._id });
                else console.log('sin area');
                if (find) {
                    const { firstName, secondName, lastName, email, rut, masterarea, corporationId, areaId } = person;
                    const update = { $set: { firstName, secondName, lastName, email, rut, masterarea, corporationId, areaId } };
                    // console.log('UPDATE', update);
                    Persons.update({ _id: find._id }, update, (data, err) => console.info('UPSERT', data, err.message));
                }
                else Persons.insert(person, (data, err) => err && console.error('insert', data, err.message));

            })
        })

        console.log('**** persons.populate call END ****')
    }
});
