import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import _ from 'lodash';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Areas from './areas';
import Persons from '../persons/persons';
import rateLimit from '../../modules/rate-limit.js';
import { check } from 'meteor/check';

export const upsertArea = new ValidatedMethod({
    name: 'areas.upsert',
    validate: new SimpleSchema({
        _id: { type: String, optional: true },
        code: { type: String },
        name: { type: String },
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

export const addChildNodes = parentnode => {
    const childs = Areas.aggregate([
        { $match: { parentAreaId: parentnode._id } },
        { $lookup: { from: 'typesareastructure', foreignField: '_id', localField: 'typeAreaStructureId', as: 'TypeAreaStructure' } },
        { $unwind: '$TypeAreaStructure' },
        { $project: { name: { $concat: ['$name', ' - ', '$code', ' - ', '$TypeAreaStructure.name'] }, parentAreaId: '$parantAreaId', TypeAreaStructure: '$TypeAreaStructure', TypeArea: '$TypeArea' } },

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
                name: { $concat: ['$name', ' - ', '$code'] },
                parentAreaId: 1,
                typeAreaStructure: '$TypeAreaStructure.name',
                typeArea: '$TypeArea.name',
            }
        },
    ]);
    parent = parent & parent[0] && addParentsNodes(parent[0]);
    if (parent) node.parent = parent;
    return node;
}

const getAreasIdChildren = (areaId) => {
    const childrenAreas = Areas.find({ parentAreaId: areaId }).fetch();
    let areasIds = _.map(childrenAreas, '_id');
    areasIds = _.union(areasIds, _.flattenDeep(_.map(areasIds, areaIdchild => getAreasIdChildren(areaIdchild))));
    areasIds.push(areaId);
    return areasIds;
}

Meteor.methods({
    'areas.getTree': () => {
        if (!Meteor.isServer) return;
        const self = this.Meteor;
        const user = self.user();
        if (user) {
            const filters = { corporationId: (user.profile && user.profile.corporationId) || '' };
            // const firstnodes = Areas.aggregate(
            //     [
            //         { $lookup: { from: 'typesareas', foreignField: '_id', localField: 'typeAreaId', as: 'TypeArea' } },
            //         { $unwind: '$TypeArea' },
            //         { $lookup: { from: 'typesareastructure', foreignField: '_id', localField: 'typeAreaStructureId', as: 'TypeAreaStructure' } },
            //         { $unwind: '$TypeAreaStructure' },
            //         { $project: { name: { $concat: ['$name', ' - ', '$TypeAreaStructure.name', ' - ', '$TypeArea.name'] }, parentAreaId: '$parantAreaId', TypeAreaStructure: '$TypeAreaStructure', TypeArea: '$TypeArea' } },
            //     ]
            // )
            const firstnodes = Areas.find({ parentAreaId: { $exists: false } }).fetch();
            //console.log('firstnodes', firstnodes);
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
    },
    'areas.generateFamily': () => {
        if (!Meteor.isServer) return;
        console.log('---- Begin generate family --- ');
        const areas = Areas.find().fetch();
        _.map(areas, area => {
            const family = getAreasIdChildren(area._id);
            Areas.update({ _id: area._id }, { $set: { family } }, (err, data) => console.log(`update family ${area.name}`, err, data));
        })
        console.log('---- END generate family --- ');
        return '---- END generate family --- ';
    },
    'area.get': (_id) => {
        if (!Meteor.isServer) return;
        check(_id, String);
        const area = Areas.findOne({ _id });
        const leader = findLeader(area);
        _.extend(area, { leader });
        return area
    },
});

rateLimit({
    methods: [
        upsertArea,
        removeArea,
    ],
    limit: 5,
    timeRange: 1000,
});

export const findLeader = (area) => {
    if(!area) return;
    const leader = Meteor.users.findOne({ 'profile.leaderAreasIds': area._id }, { fields: { profile: 1 } })
    if (!leader) {
        if (!area.parentAreaId) return;
        const parent = Areas.findOne({ _id: area.parentAreaId });
        return findLeader(parent);
    }
    return leader.profile;
}
export const findChiefs = (area) => {
    // const areasPaterns = Areas.find({ $or: [{ _id: area.parentAreaId }, { parentAreaId: area.parentAreaId }] }).fetch();
    // const chiefs = Persons.find({ group: 'EXECUT.', areaId: { $in: _.map(areasPaterns, '_id') } }).fetch()
    const areasPaterns = Areas.find({ family: area._id }).fetch();
    const chiefs = Persons.find({ group: 'EXECUT.', areaId: { $in: _.map(areasPaterns, '_id') } }).fetch()
    return _.map(chiefs, '_id')
}
export const findChiefOne = (area) => {
    const chief = Persons.findOne({ group: 'EXECUT.', areaId: area._id });
    if (!chief) {
        if (!area.parentAreaId) return;
        const parent = Areas.findOne({ _id: area.parentAreaId });
        return findChiefOne(parent);
    }
    return chief;
}
