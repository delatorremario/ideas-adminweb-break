import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import TypesAreaStructure from './typesareastructure';
import rateLimit from '../../modules/rate-limit.js';

export const upsertAreaStructure = new ValidatedMethod({
    name: 'typesareastructure.upsert',
    validate:  new SimpleSchema({
        _id: { type: String, optional: true },
        name: { type: String },
        order: { type: Number },
      }).validator(),
    run(area) {
        return TypesAreaStructure.upsert({ _id: area._id }, { $set: area });
    },
});

export const removeTypeAreaStructure = new ValidatedMethod({
    name: 'typesareastructure.remove',
    validate: new SimpleSchema({
        _id: { type: String },
    }).validator(),
    run({ _id }) {
        TypesAreaStructure.remove(_id);
    },
});

rateLimit({
    methods: [
        upsertTypeAreaStructure,
        removeTypeAreaStructure,
    ],
    limit: 5,
    timeRange: 1000,
});