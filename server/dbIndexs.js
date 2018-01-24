import { Meteor } from 'meteor/meteor';

import Persons from '../imports/api/persons/persons';
import Areas from '../imports/api/areas/areas';
import Ideas from '../imports/api/ideas/ideas';

Meteor.methods({
    'dbIndexs': () => {
        if (!Meteor.isServer) return;
        //Persons._dropIndex()
        Persons._ensureIndex ({"lastName":"text","firstName":"text", "secondName":"text", "email":"text", "rut": "text"},{"weights": { lastName: 1, firstName:2, secondName:3, email:4, rut:5 }})
        Areas._ensureIndex({"code":"text","name":"text"})
        Ideas._ensureIndex({
            "opportunity":"text","description":"text",
            "person.lastName":"text",
            "person.firstName":"text", 
            "person.secondName":"text", 
            "person.email":"text", 
            "person.rut": "text"},
            {"name":'search',
            "weights": { "opportunity":1,"description":1, 'person.lastName': 2, 'person.firstName':3, 'person.secondName':4, 'person.email':5, 'person.rut':6 }})
        
        console.log('**** dbindex call END ****')
    }
});
