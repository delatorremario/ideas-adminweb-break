import _ from 'lodash';
import Areas from '../areas/areas';
import { addChildNodes } from '../areas/methods';
import Persons from '../persons/persons';
import Ideas from '../ideas/ideas';
import States from '../../api/states/states';

const getIdsAreas = area => {
    const areaIds = []
    areaIds.push(area._id);
    _.each(area.children, areachild => {
        areaIds.push(getIdsAreas(areachild));
    })
    return _.flatten(areaIds);
}

Meteor.methods({
    'getDashboard': () => {

        if (!Meteor.isServer) return;
        const self = this.Meteor;
        const user = self.user();
        if (user) {
            const filters = { corporationId: (user.profile && user.profile.selectedCorporationId) || '' };
            const ideasstates = States.find(filters).fetch();
            // console.log('ideasstates', ideasstates);

            // buscar las Areas que se mostraran en el Dashboard
            const areasDashboard = Areas.find({ dashboard: true }).fetch();

            // obtener todas las areas debajo del areas principal
            _.map(areasDashboard, area => {
                // area.children = addChildNodes(area);
                // area.family = getIdsAreas(area);
                const employes = Persons.find({ areaId: { $in: area.family } }, { fields: { _id: 1 } }).fetch();
                area.employes = employes.length;
                const ideasAdded = Ideas.aggregate([
                    { $match: { 'chief.areaId': { $in: area.family } } },
                    {
                        $group: {
                            _id: '',
                            count: { $sum: 1 }
                        }
                    }]);
                area.ideasAdded = (ideasAdded && ideasAdded[0] && ideasAdded[0].count) || 0;


                const extarnalPersons = Ideas.aggregate([
                    { $match: { 'chief.areaId': { $in: area.family } } },
                    {
                        $group: {
                            _id: '$person',
                            count: { $sum: 1 }
                        }
                    }]);
                area.extarnalPersons = (extarnalPersons && extarnalPersons[0] && extarnalPersons[0].count) || 0;

                const ideasPersonAdded = Ideas.aggregate([
                    { $match: { 'person.areaId': { $in: area.family } } },
                    {
                        $group: {
                            _id: { person: '$person._id' },
                            count: { $sum: 1 }
                        }
                    }]);
                area.ideasPersonAdded = (ideasPersonAdded && ideasPersonAdded[0] && ideasPersonAdded[0].count) || 0;


                const ideasByStep = Ideas.aggregate([
                    { $match: { 'chief.areaId': { $in: area.family } } },
                    {
                        $project:
                            {
                                lastState: { $arrayElemAt: ["$states", -1] }
                            }
                    },
                    {
                        $group: {
                            _id: '$lastState.step',
                            count: { $sum: 1 },
                        }
                    },
                    { $project: { step: '$_id', count: 1 } },
                ]);
                _.map(ideasByStep, step => {
                    const ideastate = _.find(ideasstates, { step: step.step });
                    step.color = ideastate && ideastate.color || '#fff';
                    return step;
                })
                area.ideasByStep = ideasByStep;

                // ***** ini by status ******

                const ideasByStatus = Ideas.aggregate([
                    { $match: { 'chief.areaId': { $in: area.family } } },
                    {
                        $project:
                            {
                                lastState: { $arrayElemAt: ["$states", -1] },
                            }
                    },
                    {
                        $project:
                            {
                                // lastState: 1,
                                stateId: '$lastState._id',
                                state: '$lastState.state',
                                code: '$lastState.code',
                                createdAt: '$lastState.createdAt',
                                diff: {
                                    "$trunc": {
                                        '$divide': [
                                            { '$subtract': [new Date(), "$lastState.createdAt"] },
                                            86400000
                                        ]
                                    }
                                }
                            }
                    },
                    { $lookup: { from: 'states', foreignField: '_id', localField: 'stateId', as: 'State' } },
                    { $unwind: '$State' },
                    {
                        $group: {
                            _id: { state: '$state', code: '$code' },
                            green: {
                                "$sum": { "$cond": [{ "$lt": ['$diff', "$State.green"] }, 1, 0] }
                            },
                            yellow: {
                                "$sum": {
                                    "$cond": [{
                                        '$and': [{
                                            "$gte": [
                                                '$diff',
                                                "$State.green"
                                            ]
                                        },
                                        {
                                            "$lte": [
                                                '$diff',
                                                "$State.yellow"
                                            ]
                                        }
                                        ]
                                    }
                                        , 1, 0
                                    ]
                                }
                            },
                            red: {
                                "$sum": {
                                    "$cond": [
                                        {
                                            "$gt": [
                                                "$diff",
                                                "$State.yellow"
                                            ]
                                        }, 1, 0
                                    ]
                                }
                            },
                            count: { $sum: 1 },
                        }
                    },
                    { $project: { state: '$_id.state', code: '$_id.code', count: 1, green: 1, yellow: 1, red: 1 } },
                ]);

                console.log('ideasByStatus', ideasByStatus);

                _.map(ideasByStatus, state => {
                    const ideastate = _.find(ideasstates, { state: state.state });
                    state.color = ideastate && ideastate.color || '#fff';
                    return state;
                })

                area.ideasByStatus = ideasByStatus;
                // ***** end by status *****

                area.participation = area.ideasPersonAdded * 100 / area.employes;
            });

            // personal

            return areasDashboard;
        } else return;
    },
});
