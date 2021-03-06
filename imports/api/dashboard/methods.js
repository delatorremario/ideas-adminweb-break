import _ from 'lodash';
import Areas from '../areas/areas';
import { addChildNodes } from '../areas/methods';
import Persons from '../persons/persons';
import Ideas from '../ideas/ideas';
import States from '../../api/states/states';
import { Roles } from 'meteor/alanning:roles';
import moment from 'moment';
import { check } from 'meteor/check';

const getIdsAreas = area => {
    const areaIds = []
    areaIds.push(area._id);
    _.each(area.children, areachild => {
        areaIds.push(getIdsAreas(areachild));
    })
    return _.flatten(areaIds);
}

Meteor.methods({
    'getDashboard': (period) => {
        console.log('--getDashboard--', period);
        check(period, Number);
        if (!Meteor.isServer) return;
        const self = this.Meteor;
        const user = self.user();
        if (!user) return;
        const filters = { corporationId: (user.profile && user.profile.corporationId) || '' };

        const ideasstates = States.find(filters).fetch();
        const ideasstatesshowCodes = _.map(_.filter(ideasstates, { showInDashboard: true }), 'code');

        // buscar las Areas que se mostraran en el Dashboard

        let areasDashboard = [];
        if (Roles.userIsInRole(user._id, ['Leader'])) areasDashboard = Areas.find({ dashboard: true }).fetch();
        if (Roles.userIsInRole(user._id, ['Executive'])) areasDashboard = Areas.find({ _id: user.profile.areaId }).fetch();

        switch (period) {
            case 0:
                _.extend(filters, {
                    date: {
                        $gte: moment().startOf('month').toDate(),
                        $lt: moment().endOf('month').toDate(),
                    }
                })
                break;
            case 1:
                _.extend(filters, {
                    date: {
                        $gte: moment().subtract(1, 'month').startOf('month').toDate(),
                        $lt: moment().subtract(1, 'month').endOf('month').toDate(),
                    }
                })
                break;
            case 3:
                _.extend(filters, {
                    date: {
                        $gte: moment().subtract(3, 'month').startOf('month').toDate(),
                        $lt: moment().subtract(1, 'month').endOf('month').toDate(),
                    }
                })
                break;
            case 6:
                _.extend(filters, {
                    date: {
                        $gte: moment().subtract(6, 'month').startOf('month').toDate(),
                        $lt: moment().subtract(1, 'month').endOf('month').toDate(),
                    }
                })
                break;
            default:
        }

        // obtener todas las areas debajo del areas principal
        _.map(areasDashboard, area => {
            _.extend(area, {
                match: { ...filters, 'chief.areaId': { $in: area.family || [] } },
                ideasstates,
                ideasstatesshowCodes,
            })
        });




        // FUNCIONES
        if (Roles.userIsInRole(user._id, ['Leader'])) {
            const areasFunctionals = Areas.find({ ...filters, function: true }).fetch()
            const areasFunctionalsFamilyIds = _.flattenDeep(_.map(areasFunctionals, 'family'))

            const funciones = {
                name: 'FUNCIONES',
                match: { ...filters, 'chief.areaId': { $in: areasFunctionalsFamilyIds } },
                ideasstates,
                ideasstatesshowCodes,
                family: areasFunctionalsFamilyIds,
            };
            areasDashboard.push(funciones)
        }

        // end Funciones

        // my ideas
        const match = {
            ...filters,
            $or: [{ 'person._id': user && user.profile._id }, { 'collaborators._id': user && user.profile._id }]
        };
        const miArea = {
            name: 'MIS IDEAS',
            match,
            ideasstates,
            ideasstatesshowCodes,
            // ideasstatesshowCodes: _.map(ideasstates, 'code'), // habilitar si hay q mostrar todo
            family: []
        };
        areasDashboard.push(miArea)
        // end my ideas

        _.map(areasDashboard, area => {
            getDashboardArea(area)
        });

        // personal
        return areasDashboard;
    },
});

const getDashboardArea = (area) => {
    const { ideasstates, ideasstatesshowCodes } = area;
    const employes = Persons.find({ areaId: { $in: area.family || [] } }, { fields: { _id: 1 } }).fetch();
    area.employes = employes.length;
    const ideasAdded = Ideas.aggregate([
        { $match: area.match },
        {
            $group: {
                _id: '',
                count: { $sum: 1 }
            }
        }]);
    area.ideasAdded = (ideasAdded && ideasAdded[0] && ideasAdded[0].count) || 0;

    const extarnalPersons = Ideas.aggregate([
        { $match: area.match },
        {
            $group: {
                _id: '$person',
                count: { $sum: 1 }
            }
        }]);
    area.extarnalPersons = (extarnalPersons && extarnalPersons[0] && extarnalPersons[0].count) || 0;

    const filterFamily = { 'person.areaId': { $in: area.family || [] } }
    if (area.match.date) _.extend(filterFamily, { date: area.match.date })
    const ideasInFamily = Ideas.find(filterFamily).fetch();

    area.ideasPersonAdded = ideasInFamily.length; // (ideasPersonAdded && ideasPersonAdded[0] && ideasPersonAdded[0].count) || 0;

    const ideasByStep = Ideas.aggregate([
        { $match: area.match },
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
        { $match: area.match },
        {
            $project:
                {
                    lastState: { $arrayElemAt: ["$states", -1] },
                }
        },
        { $match: { 'lastState.code': { $in: ideasstatesshowCodes || [] } } },
        {
            $project:
                {
                    // lastState: 1,
                    stateId: '$lastState._id',
                    step: '$lastStep.step',
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
                _id: { step: '$State.step', state: '$State.state', code: '$State.code' },
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
        { $project: { state: '$_id.state', step: '$_id.step', code: '$_id.code', count: 1, green: 1, yellow: 1, red: 1 } },

    ]);

    _.map(ideasByStatus, state => {
        const ideastate = _.find(ideasstates, { code: state.code });
        state.color = ideastate && ideastate.color || '#fff';
        return state;
    })

    area.ideasByStatus = ideasByStatus;
    // ***** end by status *****

    area.participation = area.ideasPersonAdded === 0 ? 0 : area.ideasPersonAdded * 100 / area.employes
}
