import { Meteor } from 'meteor/meteor';

import masterPersons from '../imports/api/persons/personsData';

import TypesAreas from '../imports/api/typesareas/typesareas';
import TypesAreaStructure from '../imports/api/typesareastructure/typesareastructure';
import Corporations from '../imports/api/corporations/corporations';
import Areas from '../imports/api/areas/areas';
import Persons from '../imports/api/persons/persons';

import _ from 'lodash';


Meteor.startup(() => {

    const corporations = Corporations.find().fetch();

    /* add typesareasstructure */
    _.map(corporations, (corp) => {
        _.map(['Presidencia', 'Vicepresidencia', 'Gerencia General', 'Gerencia', 'SuperIntendencia'], (typearea, key) => {
            const find = TypesAreaStructure.findOne({ name: typearea, corporationId: corp._id });
            if (!find) {
                TypesAreaStructure.insert({
                    name: typearea,
                    order: key + 1,
                    corporationId: corp._id || '',
                });
            }
        });

        _.map(['Area Operativa', 'Area Funcional'], (typestruct, key) => {
            const find = TypesAreas.findOne({ name: typestruct, corporationId: corp._id });
            if (!find) {
                TypesAreas.insert({
                    name: typestruct,
                    order: key + 1,
                    corporationId: corp._id || '',
                });
            }
        });

        const presidenciaId = TypesAreaStructure.findOne({ name: 'Presidencia' })._id
        const presidencias = [
            {
                name: 'Escondida',
                typeAreaId: TypesAreas.findOne({ name: 'Area Operativa' })._id,
                typeAreaStructureId: presidenciaId,
                masterDataMatchText: 'Escondida',
                corporationId: corp._id,
            },
            {
                name: 'Copper',
                typeAreaId: TypesAreas.findOne({ name: 'Area Funcional' })._id,
                typeAreaStructureId: presidenciaId,
                masterDataMatchText: 'Copper',
                corporationId: corp._id,
            },
        ];

        _.map(presidencias, (area) => {
            const find = Areas.findOne(area);
            if (!find) Areas.insert(area);
        });

        // "_id":"rm9tP4J6sscggvvWg"
        // "name":"Vicepresidencia",


        //   {  name: 'Corporate Affairs Copper',
        //     typeAreaStructureId: vicepresidenciaId,
        //     parentAreaId: Areas.findOne({ name: 'Cooper', corporationId: corp._id })._id,
        //     corporationId: corp._id,
        //   },


        let typeAreaStructure = TypesAreaStructure.findOne({ name: 'Vicepresidencia' });
        let typeAreaStructureId = typeAreaStructure._id || '';

        const vicepresidencias = [
            { name: 'Warehouse Escondida', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Warehouse Escondida B', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Warehouse Escondida A', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'W&I Operations Escondida', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Valuation & Investment Escondida', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Training', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'RP&D Escondida', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Escondida', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Risk Operations Chile', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Risk & Governance', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Purchasing MEL', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Projects Engineering', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Project Services Sustaining', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Project Portfolio', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Mgmt Development Delivery Sustaining', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Management Stand Alone Projects', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Management Project Services', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Local Front Desk', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Labor Relations Escondida', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Inventory Planning Escondida', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Integrated Operations', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Escondida', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'HSE Tactic Permits', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'HSE Reporting', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'HSE Execution Safety Projects Escondida', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'HSE Execution Health Escondida', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'HSE Execution Escondida', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'HSE Execution Environment Escondida', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'HSE Exec. Emergency Response Escondida', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'HSE Exec Safety Operation B', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'HSE Exec Safety Operation A', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'HR Business Partnership Escondida', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Head of Projects Escondida', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Finance Business Partnership Chile', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Extendend Absence', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Escondida', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Development & Delivery', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Corporate Affairs Copper', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Commisioning', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
        ];

        _.map(vicepresidencias, (area) => {
            const find = Areas.findOne(area);
            if (!find) Areas.insert(area);
        });
        // "_id":"Zon5d8M2MAB2Ec4My",
        // "name":"Gerencia General"
        const gmId = TypesAreaStructure.findOne({ name: 'Gerencia General' })._id

        // {
        //     name: 'NPI & Conc. Handling Operations',
        //     typeAreaStructureId: gmId,
        //     parentAreaId: Areas.findOne({ name: 'Escondida', corporationId: corp._id })._id,
        //     corporationId: corp._id,
        // },
        const generalmanager = [
            { name: 'NPI & Conc. Handling Operations', typeAreaStructureId: TypesAreaStructure.findOne({ name: 'Gerencia General' })._id, parentAreaId: Areas.findOne({ name: 'Escondida', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Mine Operations', typeAreaStructureId: TypesAreaStructure.findOne({ name: 'Gerencia General' })._id, parentAreaId: Areas.findOne({ name: 'Escondida', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Concentrate Operations', typeAreaStructureId: TypesAreaStructure.findOne({ name: 'Gerencia General' })._id, parentAreaId: Areas.findOne({ name: 'Escondida', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Cathode Operations', typeAreaStructureId: TypesAreaStructure.findOne({ name: 'Gerencia General' })._id, parentAreaId: Areas.findOne({ name: 'Escondida', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Logistic & Execution Integ Operations', typeAreaStructureId: TypesAreaStructure.findOne({ name: 'Gerencia General' })._id, parentAreaId: Areas.findOne({ name: 'Integrated Operations', corporationId: corp._id })._id, corporationId: corp._id, },
        ];

        _.map(generalmanager, (area) => {
            const find = Areas.findOne(area);
            if (!find) Areas.insert(area);
        });

        // "_id":"6SJCXwG9tEKKQRs7u",
        // "name":"Gerencia"
        typeAreaStructureId = TypesAreaStructure.findOne({ name: 'Gerencia' })._id

        const manager = [
            { name: 'Mass Mining Methods', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'RP&D Escondida', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Integrated Planning', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Integrated Operations', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Geology Escondida', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'RP&D Escondida', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Directional Studies', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'RP&D Escondida', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Asset Planning Land and Water', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'RP&D Escondida', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Asset Planning', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'RP&D Escondida', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Asset Management', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Integrated Operations', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Analysis & Improvement', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'RP&D Escondida', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Transformation Office', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Integrated Operations', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Technical Stewardship', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'RP&D Escondida', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Production Planning NPI&CHO', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'NPI & Conc. Handling Operations', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Production Planning Mine', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Mine Operations', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Production Mine', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Mine Operations', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Production Concentrate Handling', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'NPI & Conc. Handling Operations', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Production Concentrate', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Concentrate Operations', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Production Cathode', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Cathode Operations', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Planning & Process Control', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Cathode Operations', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Planning & Control Process', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Concentrate Operations', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'People Services', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'NPI & Conc. Handling Operations', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'NPI Production', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'NPI & Conc. Handling Operations', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'NPI Maitenance', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'NPI & Conc. Handling Operations', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Modifications & Small Projects', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'NPI & Conc. Handling Operations', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Management Comissioning', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'NPI & Conc. Handling Operations', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Major Project & Commissioning', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Concentrate Operations', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Maintenance Mine Equipment', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Mine Operations', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Maintenance Crushing & Conveying', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Mine Operations', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Maintenance Concentrate Handling', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'NPI & Conc. Handling Operations', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Maintenance Cathode', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Cathode Operations', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Logistic Execution', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Logistic & Execution Integ Operations', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Logistic Antofagasta', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Logistic & Execution Integ Operations', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Engineering Mine', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Mine Operations', corporationId: corp._id })._id, corporationId: corp._id, },
            { name: 'Engineering Cathode', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Cathode Operations', corporationId: corp._id })._id, corporationId: corp._id, },

        ];

        _.map(manager, (area) => {
            const find = Areas.findOne(area);
            if (!find) Areas.insert(area);
        });
    });


})