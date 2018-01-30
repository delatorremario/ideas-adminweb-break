import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import Ideas from '../../imports/api/ideas/ideas';
import Persons from '../../imports/api/persons/persons';
import States from '../../imports/api/states/states';
import Areas from '../../imports/api/areas/areas';
import { findChiefOne } from '../../imports/api/areas/methods';

import historicalDataDb from './historicalDataDb';

Meteor.methods({
    'import.historical': () => {
        const errors = [];
        let updated = 0
        let inserted = 0
        _.each(historicalDataDb, (data, index) => {
            const { date, origin, personRef, stateCode, impactId, stateDate, areaCode, opportunity, description, drivers } = data;
            let person = Persons.findOne({
                $or: [{ masterCode: _.toLower(personRef) }, { email: _.toLower(personRef) }, { rut: _.toLower(personRef) }]
            });
            const state = States.findOne({ code: stateCode });
            state.createdAt = new Date()
            state.updatedAt = new Date()
            const area = Areas.findOne({ code: areaCode });

            const chief = area && findChiefOne(area);

            if (!area) { errors.push({ err: 'no existe area', index, areaCode }); return; }
            if (!person) {
                if (validateEmail(_.toLower(personRef))) {
                    const idPerson = Persons.insert({ email: _.toLower(personRef), areaId: area._id })
                    console.log('idPerson', idPerson);

                    person = Persons.findOne(idPerson);
                }
                else
                    errors.push({ err: 'no existe persona', index, personRef }); return;
            }
            if (!state) { errors.push({ err: 'no existe state', index, stateCode }); return; }
            if (!chief) { _.extend(chief, { areaId: area._id }); errors.push({ warning: 'no existe chief', index, areaCode }); }

            const idea = {
                date: new Date(date),
                origin,
                person,
                chief,
                description,
                opportunity,
                drivers,
                states: [state],
                impactId
            }

            Ideas.upsert({
                description,
                opportunity,
            }, { $set: { ...idea } }, (err, data) => {
                if (err) { errors.push({ err: err.message, index }); return; }
                const { insertedId } = data;
                if (insertedId) { inserted++; Meteor.call('idea.addViewers', insertedId) }
                else updated++
                console.log('upsert', index, data);
            })

        })
        const result = { inserted, updated, total: inserted + updated, from: historicalDataDb.length, errors }
        console.log('result', result);
        return result
    }
})


const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}