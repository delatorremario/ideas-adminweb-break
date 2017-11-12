import _ from 'lodash';
import Areas from '../areas/areas';
import { addChildNodes } from '../areas/methods';
import Persons from '../persons/persons';
import Ideas from '../ideas/ideas';

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
                area.children = addChildNodes(area);
                area.areaIds = getIdsAreas(area);
                const employes = Persons.find({ areaId: { $in: area.areaIds } }, { fields: { _id: 1 } }).fetch();
                area.employes = employes.length;
                const ideasAdded = Ideas.aggregate([
                    { $match: { 'person.areaId': { $in: area.areaIds } } },
                    {
                        $group: {
                            _id: '',
                            count: { $sum: 1 }
                        }
                    }]);
                const ideasByStates = Ideas.aggregate([
                    { $match: { 'person.areaId': { $in: area.areaIds } } },
                    {
                        $group: {
                            _id: {
                                state: '$states.state'
                            },
                            count: { $sum: 1 }
                        }
                    }, { $project: { state: '$_id.state', count: 1 } }, { $unwind: '$state' }]);
                const ideasPersonAdded = Ideas.aggregate([
                    { $match: { 'person.areaId': { $in: area.areaIds } } },
                    {
                        $group: {
                            _id: { person: '$person' },
                            count: { $sum: 1 }
                        }
                    }]);
                area.ideasAdded = (ideasAdded && ideasAdded[0] && ideasAdded[0].count) || 0;
                area.ideasPersonAdded = (ideasPersonAdded && ideasPersonAdded[0] && ideasPersonAdded[0].count) || 0;
                area.ideasByStates = ideasByStates;
                area.participation = area.employes * area.ideasPersonAdded / 100;
            });

            // personal

            return areasDashboard;
        } else return;
    },
});
