import _ from 'lodash';
import Areas from '../areas/areas';
import { addChildNodes } from '../areas/methods';
import Persons from '../persons/persons';
import Ideas from '../ideas/ideas';

Meteor.methods({
    'getDashboard': () => {
        if (!Meteor.isServer) return;
        const self = this.Meteor;
        const user = self.user();
        if (user) {
            const filters = { corporationId: (user.profile && user.profile.selectedCorporationId) || '' };

            // buscar las Areas que se mostraran en el Dashboard
            const areasDashboard = Areas.find({ dashboard: true }).fetch();

            _.map(areasDashboard, area => {
                area.childs = addChildNodes(area);
            })

            //obtener todas las areas debajo del areas principal

            console.log('areasDashboard', areasDashboard);

            // por cada area buscar las personas que estan en esas Area para obtener la cantidad de personas



            // _.map(firstnodes, firstnode => {
            //     firstnode.children = addChildNodes(firstnode);
            // })

            return areasDashboard;
        } else return;
    },
});
