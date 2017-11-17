import _ from 'lodash';
import Areas from '../areas/areas';
import { addChildNodes } from '../areas/methods';
import Persons from '../persons/persons';
import Ideas from '../ideas/ideas';
import ideasstates from '../../api/ideasStatesSchema/ideasstates';

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
               

                const ideasPersonAdded = Ideas.aggregate([
                    { $match: { 'person.areaId': { $in: area.family } } },
                    {
                        $group: {
                            _id: { person: '$person._id' },
                            count: { $sum: 1 }
                        }
                    }]);
                area.ideasAdded = (ideasAdded && ideasAdded[0] && ideasAdded[0].count) || 0;
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

                const ideasByStatus = Ideas.aggregate([
                    { $match: { 'person.areaId': { $in: area.family } } },
                    {
                        $project:
                        {
                            lastState: { $arrayElemAt: ["$states", -1] }
                        }
                    },
                    {
                        $group: {
                            _id: '$lastState.state',
                            count: { $sum: 1 },
                        }
                    },
                    { $project: { state: '$_id', count: 1 } },
                ]);
                _.map(ideasByStatus, state => {
                    const ideastate = _.find(ideasstates, { state: state.state });
                    state.color = ideastate && ideastate.color || '#fff';
                    return state;
                })
                area.ideasByStatus = ideasByStatus;

                area.participation = area.ideasPersonAdded * 100 / area.employes;
            });

            // personal

            return areasDashboard;
        } else return;
    },
});
