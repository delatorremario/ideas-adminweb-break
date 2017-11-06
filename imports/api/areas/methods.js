import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import _ from 'lodash';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Areas from './areas';
import Persons from '../persons/persons';
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
    const childs = Areas.aggregate([
        { $match: { parentAreaId: parentnode._id } },
        { $lookup: { from: 'typesareastructure', foreignField: '_id', localField: 'typeAreaStructureId', as: 'TypeAreaStructure' } },
        { $unwind: '$TypeAreaStructure' },
        { $project: { name: { $concat: ['$name', ' - ', '$TypeAreaStructure.name'] }, parentAreaId: '$parantAreaId', TypeAreaStructure: '$TypeAreaStructure', TypeArea: '$TypeArea' } },

    ]);
    _.map(childs, (child) => {
        let children = addChildNodes(child);
        const persons = Persons.aggregate([
            { $match: { areaId: child._id } },
            {
                $project: {
                    name: {
                        $concat: [
                            { $ifNull: ["$firstName", ""] }
                            , " ",
                            { $ifNull: ["$secondName", ""] }
                            , " ",
                            { $ifNull: ["$lastName", ""] }
                            , " rut: ",
                            { $ifNull: ["$rut", "NN"] }
                        ]
                    }
                }
            }
        ])
        children = _.union(children, persons);
        if (!!children.length) child.children = children;
    })
    return childs;
}

const addParentsNodes = node => {
    let parent = Areas.aggregate([
        { $match: { _id: node.parentAreaId } },
        { $lookup: { from: 'typesareastructure', foreignField: '_id', localField: 'typeAreaStructureId', as: 'TypeAreaStructure' } },
        { $unwind: '$TypeAreaStructure' },
        {
            $project: {
                name: 1,
                parentAreaId: 1,
                typeAreaStructure: '$TypeAreaStructure.name',
                typeArea: '$TypeArea.name',
            }
        },
    ]);
    console.log('PERENT', parent);
    parent = parent & parent[0] && addParentsNodes(parent[0]);
    if (parent) node.parent = parent;
    return node;
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
                    { $project: { name: { $concat: ['$name', ' - ', '$TypeAreaStructure.name', ' - ', '$TypeArea.name'] }, parentAreaId: '$parantAreaId', TypeAreaStructure: '$TypeAreaStructure', TypeArea: '$TypeArea' } },
                ]
            )

            _.map(firstnodes, firstnode => {
                firstnode.children = addChildNodes(firstnode);
            })

            return firstnodes;
        } else return;
    },
    'areas.getTreeByArea': areaId => {
        if (!Meteor.isServer) return;
        check(areaId, String);

        let area = Areas.aggregate([
            { $match: { _id: areaId } },
            { $lookup: { from: 'typesareastructure', foreignField: '_id', localField: 'typeAreaStructureId', as: 'TypeAreaStructure' } },
            { $unwind: '$TypeAreaStructure' },
            {
                $project: {
                    name: 1,
                    parentAreaId: 1,
                    typeAreaStructure: '$TypeAreaStructure.name',
                    typeArea: '$TypeArea.name',
                }
            },

        ]);
       // area.parent = (area && area[0] && addParentsNodes(area[0])) || [];
        console.log('AREA get', area);
        return area && area[0];
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



