import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

import rateLimit from '../../modules/rate-limit.js';

Meteor.methods(
    {
        updateProfile: (user) =>{
            check(user, Object);
            return Meteor.users.update({ _id: user._id }, { $set: { profile: user.profile } });
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


