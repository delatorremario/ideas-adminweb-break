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
            _.map(masterPersons, (person, index) => {

                _.extend(person, { corporationId: corp._id, origin: 'MEL' });
                //console.log('index', index);
                /* set area */
                const area = person.areaCode && Areas.findOne({ code: person.areaCode, corporationId: corp._id });
                if (!area) area = Areas.findOne({ name: 'Escondida' });
                //console.log('--email--', person.email, area.name);
                //if (person.email != 'neftali.a.herrera@bhpbilliton.com') return;
                /* end set area */

                const find = Persons.findOne({ rut: person.rut });
                if (area) _.extend(person, { areaId: area._id, area: area.name });
                else console.log('sin area');
                person = _.merge(find, person);
                Persons.upsert({ _id: find && find._id || '' }, { $set: { ...person } }, (err, data) => {
                    console.info('UPSERT', data, person.email, err);
                    Meteor.users.update({ 'emails.address': person.email }, { $set: { profile: { ...person } } })
                });
            })
        })
        const message = '**** persons.populate call END ****'
        console.log(message)
        return message
    },
    'persons.update': (masterPersons) => {
        check(masterPersons, Array);
        console.log('persons.update call');
        if (!Meteor.isServer) return;
        const corporations = Corporations.find().fetch();

        /* add typesareasstructure */
        _.map(corporations, (corp) => {
            _.map(masterPersons, (person, index) => {

                _.extend(person, { corporationId: corp._id, origin: 'MEL' });
                //console.log('index', index);
                /* set area */
                const area = person.areaCode && Areas.findOne({ code: person.areaCode, corporationId: corp._id });
                if (!area) area = Areas.findOne({ name: 'Escondida' });
                //console.log('--email--', person.email, area.name);
                //if (person.email != 'neftali.a.herrera@bhpbilliton.com') return;
                /* end set area */

                const find = Persons.findOne({ rut: person.rut });
                if (area) _.extend(person, { areaId: area._id, area: area.name });
                else console.log('sin area');
                person = _.merge(find, person);
                Persons.upsert({ _id: find && find._id || '' }, { $set: { ...person } }, (err, data) => {
                    console.info('UPSERT', data, person.email, err);
                    Meteor.users.update({ 'emails.address': person.email }, { $set: { profile: { ...person } } })
                });
            })
        })
        const message = '**** persons.populate call END ****'
        console.log(message)
        return message
    }
});
