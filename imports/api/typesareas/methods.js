import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import TypesAreas from './typesareas';
import rateLimit from '../../modules/rate-limit.js';

export const upsertArea = new ValidatedMethod({
    name: 'typesareas.upsert',
    validate:  new SimpleSchema({
        _id: { type: String, optional: true },
        name: { type: String },
        order: { type: Number },
      }).validator(),
    run(area) {
        return TypesAreas.upsert({ _id: area._id }, { $set: area });
    },
});

export const removeTypeArea = new ValidatedMethod({
    name: 'typesareas.remove',
    validate: new SimpleSchema({
        _id: { type: String },
    }).validator(),
    run({ _id }) {
        TypesAreas.remove(_id);
    },
});

rateLimit({
    methods: [
        upsertTypeArea,
        removeTypeArea,
    ],
    limit: 5,
    timeRange: 1000,
});