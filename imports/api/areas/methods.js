import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Areas from './areas';
import rateLimit from '../../modules/rate-limit.js';

export const upsertArea = new ValidatedMethod({
    name: 'areas.upsert',
    validate: new SimpleSchema({
        _id: { type: String, optional: true },
        name: { type: String, optional: true },
    }).validator(),
    run(area) {
        return Areas.upsert({ _id: area._id }, { $set: area });
    },
});

export const removeArea = new ValidatedMethod({
    name: 'areas.remove',
    validate: new SimpleSchema({
        _id: { type: String },
    }).validator(),
    run({ _id }) {
        Areas.remove(_id);
    },
});

const addChildNodes = parentnode => {

    console.log('PARENT', parentnode);
    const childs = Areas.aggregate({ $match: { parentAreaId: parentnode._id } });
    _.map(childs, child => {
        child = addChildNodes(child);
    })
    return childs;
}


Meteor.methods({
    'areas.getTree': () => {
        if (!Meteor.isServer) return;
        const self = this.Meteor;
        const user = self.user();
        if (user) {
            const filters = { corporationId: (user.profile && user.profile.selectedCorporationId) || '' };
            const firstnodes = Areas.aggregate(
                [
                    { $lookup: { from: 'typesareas', foreignField: '_id', localField: 'typeAreaId', as: 'TypeArea' } },
                    { $unwind: '$TypeArea' },
                    { $lookup: { from: 'typesareastructure', foreignField: '_id', localField: 'typeAreaStructureId', as: 'TypeAreaStructure' } },
                    { $unwind: '$TypeAreaStructure' },
                ]

            )

            _.map(firstnodes, firstnode => {
                firstnode.childs = addChildNodes(firstnode);
            })
           

            console.info('aggregate', firstnodes);

            return firstnodes;
        } else return;
    }
});

rateLimit({
    methods: [
        upsertArea,
        removeArea,
    ],
    limit: 5,
    timeRange: 1000,
});



