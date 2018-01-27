import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import rateLimit from '../../modules/rate-limit.js';

import Persons from '../../api/persons/persons';

export const completedProfile = () => {
    const user = Meteor.user();

    const { origin } = user.profile;

    switch (origin) {
        case 'MEL':
            return user && user.profile
                && user.profile._id
                && user.profile.firstName
                && user.profile.lastName
                && user.profile.rut
                && user.profile.area &&
                (
                    user.profile.oneUp ||
                    user.emails[0].address === 'mauro.nevesdemoraes@bhpbilliton.com'
                )
            break;
        case 'Contratista':
            return user && user.profile
                && user.profile._id
                && user.profile.firstName
                && user.profile.lastName
                && user.profile.rut
                && user.profile.area
                && user.profile.oneUp
                && user.profile.company;
            break;
        default:
            return user && user.profile
                && user.profile._id
                && user.profile.firstName
                && user.profile.lastName
                && user.profile.rut
                && user.profile.area
    }



}

Meteor.methods(
    {
        updateProfile: (user) => {
            check(user, Object);
            console.log('--user--', user);
            Meteor.users.update({ _id: user._id }, { $set: { profile: user.profile } }, (err) => {
                if (err) { console.log(err); return; }
                Persons.upsert({ _id: user && user.profile && user.profile._id }, { $set: { ...user.profile, email: user.emails[0].address } }, (err, data) => {
                    console.log('--DATA--', data)
                    if (data && data.insertedId) Meteor.users.update({ _id: user._id }, { $set: { 'profile._id': data.insertedId } })
                })
            });
        },
        'profile.setImage': (imageId) => {
            check(imageId, String)
            const user = Meteor.user();
            return Meteor.users.update({ _id: user._id }, { $set: { 'profile.imageId': imageId } });
        }
    }
)

// export const updateProfile = new ValidatedMethod({
//     name: 'profile.update',
//     validate: new SimpleSchema({

//         _id: { type: String },
//         group: { type: String },
//         personId: { type: String, optional: true },
//         rut: { type: String },
//         firstName: { type: String },
//         secondName: { type: String, optional: true },
//         lastName: { type: String },
//         nationality: { type: String },
//         enterprise: { type: String, optional: true },
//         'oneUp.email': { type: String, optional: true },
//         'oneUp.name': { type: String, optional: true },
//         areaId: { type: String, optional: true },

//     }).validator(),
//     run(profile) {
//         const { _id } = profile;
//         return Meteor.users.update({ _id }, { $set: profile });
//     },
// });

// rateLimit({
//     methods: [
//         updateProfile,
//     ],
//     limit: 5,
//     timeRange: 1000,
// });


