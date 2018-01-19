import { Meteor } from 'meteor/meteor';
import _ from 'lodash';

import TypesAreas from '../imports/api/typesareas/typesareas';
import TypesAreaStructure from '../imports/api/typesareastructure/typesareastructure';
import Corporations from '../imports/api/corporations/corporations';
import Areas from '../imports/api/areas/areas';
import areasData from '../imports/api/areas/areasData';

Meteor.methods({
    'areas.populate': () => {
        if (!Meteor.isServer) return;

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

            _.map(areasData, (area) => {
                const typeAreaStructureId = TypesAreaStructure.findOne({ name: area.type })._id
                
                _.extend(area, {
                    typeAreaStructureId,
                    corporationId: corp._id,
                });
                const parent = Areas.findOne({ code: area.parent })
                if (parent) _.extend(area, { parentAreaId: parent._id })
                console.log('---PARENT---', parent);

                Areas.upsert({ code: area.code }, { $set: { ...area } });
            });
        });
    }
});
            // _.map(['Area Operativa', 'Area Funcional'], (typestruct, key) => {
            //     const find = TypesAreas.findOne({ name: typestruct, corporationId: corp._id });
            //     if (!find) {
            //         TypesAreas.insert({
            //             name: typestruct,
            //             order: key + 1,
            //             corporationId: corp._id || '',
            //         });
            //     }
            // });

        //     const presidenciaId = TypesAreaStructure.findOne({ name: 'Presidencia' })._id
        //     const presidencias = [
        //         {
        //             name: 'Escondida',
        //             typeAreaId: TypesAreas.findOne({ name: 'Area Operativa' })._id,
        //             typeAreaStructureId: presidenciaId,
        //             masterDataMatchText: 'Escondida',
        //             corporationId: corp._id,
        //         },
        //         {
        //             name: 'Copper',
        //             typeAreaId: TypesAreas.findOne({ name: 'Area Funcional' })._id,
        //             typeAreaStructureId: presidenciaId,
        //             masterDataMatchText: 'Copper',
        //             corporationId: corp._id,
        //         },
        //     ];

        //     _.map(presidencias, (area) => {
        //         const find = Areas.findOne(area);
        //         if (!find) Areas.insert(area);
        //     });

        //     // "_id":"rm9tP4J6sscggvvWg"
        //     // "name":"Vicepresidencia",

        //     let typeAreaStructure = TypesAreaStructure.findOne({ name: 'Vicepresidencia' });
        //     let typeAreaStructureId = typeAreaStructure._id || '';

        //     const vicepresidencias = [
        //         { name: 'Warehouse Escondida', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Warehouse Escondida B', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Warehouse Escondida A', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'W&I Operations Escondida', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Valuation & Investment Escondida', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Training', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'RP&D Escondida', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Escondida', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Risk Operations Chile', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Risk & Governance', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Purchasing MEL', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Projects Engineering', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Project Services Sustaining', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Project Portfolio', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Mgmt Development Delivery Sustaining', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Management Stand Alone Projects', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Management Project Services', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Local Front Desk', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Labor Relations Escondida', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Inventory Planning Escondida', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Integrated Operations', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Escondida', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'HSE Tactic Permits', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'HSE Reporting', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'HSE Execution Safety Projects Escondida', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'HSE Execution Health Escondida', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'HSE Execution Escondida', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'HSE Execution Environment Escondida', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'HSE Exec. Emergency Response Escondida', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'HSE Exec Safety Operation B', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'HSE Exec Safety Operation A', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'HR Business Partnership Escondida', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Head of Projects Escondida', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Finance Business Partnership Chile', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Extendend Absence', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Escondida', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Development & Delivery', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Corporate Affairs Copper', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Commisioning', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Copper', corporationId: corp._id })._id, corporationId: corp._id, },
        //     ];

        //     _.map(vicepresidencias, (area) => {
        //         const find = Areas.findOne(area);
        //         if (!find) Areas.insert(area);
        //     });

        //     const gmId = TypesAreaStructure.findOne({ name: 'Gerencia General' })._id

        //     const generalmanager = [
        //         { name: 'NPI & Conc. Handling Operations', typeAreaStructureId: TypesAreaStructure.findOne({ name: 'Gerencia General' })._id, parentAreaId: Areas.findOne({ name: 'Escondida', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Mine Operations', typeAreaStructureId: TypesAreaStructure.findOne({ name: 'Gerencia General' })._id, parentAreaId: Areas.findOne({ name: 'Escondida', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Concentrate Operations', typeAreaStructureId: TypesAreaStructure.findOne({ name: 'Gerencia General' })._id, parentAreaId: Areas.findOne({ name: 'Escondida', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Cathode Operations', typeAreaStructureId: TypesAreaStructure.findOne({ name: 'Gerencia General' })._id, parentAreaId: Areas.findOne({ name: 'Escondida', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Logistic & Execution Integ Operations', typeAreaStructureId: TypesAreaStructure.findOne({ name: 'Gerencia General' })._id, parentAreaId: Areas.findOne({ name: 'Integrated Operations', corporationId: corp._id })._id, corporationId: corp._id, },
        //     ];

        //     _.map(generalmanager, (area) => {
        //         const find = Areas.findOne(area);
        //         if (!find) Areas.insert(area);
        //     });

        //     typeAreaStructureId = TypesAreaStructure.findOne({ name: 'Gerencia' })._id

        //     const manager = [
        //         { name: 'Mass Mining Methods', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'RP&D Escondida', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Integrated Planning', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Integrated Operations', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Geology Escondida', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'RP&D Escondida', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Directional Studies', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'RP&D Escondida', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Asset Planning Land and Water', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'RP&D Escondida', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Asset Planning', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'RP&D Escondida', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Asset Management', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Integrated Operations', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Analysis & Improvement', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'RP&D Escondida', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Transformation Office', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Integrated Operations', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Technical Stewardship', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'RP&D Escondida', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Production Planning NPI&CHO', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'NPI & Conc. Handling Operations', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Production Planning Mine', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Mine Operations', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Production Mine', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Mine Operations', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Production Concentrate Handling', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'NPI & Conc. Handling Operations', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Production Concentrate', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Concentrate Operations', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Production Cathode', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Cathode Operations', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Planning & Process Control', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Cathode Operations', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Planning & Control Process', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Concentrate Operations', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'People Services', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'NPI & Conc. Handling Operations', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'NPI Production', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'NPI & Conc. Handling Operations', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'NPI Maitenance', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'NPI & Conc. Handling Operations', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Modifications & Small Projects', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'NPI & Conc. Handling Operations', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Management Comissioning', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'NPI & Conc. Handling Operations', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Major Project & Commissioning', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Concentrate Operations', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Maintenance Mine Equipment', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Mine Operations', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Maintenance Crushing & Conveying', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Mine Operations', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Maintenance Concentrate', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'NPI & Conc. Handling Operations', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Maintenance Concentrate Handling', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'NPI & Conc. Handling Operations', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Maintenance Cathode', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Cathode Operations', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Logistic Execution', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Logistic & Execution Integ Operations', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Logistic Antofagasta', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Logistic & Execution Integ Operations', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Engineering Mine', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Mine Operations', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Engineering Cathode', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Cathode Operations', corporationId: corp._id })._id, corporationId: corp._id, },

        //     ];

        //     _.map(manager, (area) => {
        //         const find = Areas.findOne(area);
        //         if (!find) Areas.insert(area);
        //     });

        //     typeAreaStructureId = TypesAreaStructure.findOne({ name: 'SuperIntendencia' })._id

        //     const superintendencias = [
        //         { name: '1 Room Integrated Operations', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Integrated Planning', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'A&I 1', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Analysis & Improvement', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Analysis & Improvement C&C', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Maintenance Crushing & Conveying', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Asset Management', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Asset Management', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Control Process Area', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Planning & Control Process', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'DCS Area', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Planning & Control Process', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Development Metallurgy', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Technical Stewardship', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Directional Studies', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Production Mine', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Drill & Blast', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Production Mine', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Drilling A', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Geology Escondida', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Drilling B', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Geology Escondida', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Geology', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Geology Escondida', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Geology Modeling', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Geology Escondida', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Geometallurgy', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Technical Stewardship', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Geotechnical', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Production Planning Mine', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Governance & Technical Stewardship', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Major Project & Commissioning', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Lifting Operations', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'NPI Production', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Maintenance A&I Cathode', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Maintenance Cathode', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Maintenance Ancillary', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Maintenance Mine Equipment', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Maintenance Coloso Facilities', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Maintenance Concentrate Handling', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Maintenance Drills', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Maintenance Mine Equipment', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Maintenance Execution C&C M', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Maintenance Crushing & Conveying', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Maintenance Execution Cathode', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Maintenance Cathode', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Maintenance Major', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Maintenance Concentrate', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Maintenance MARC', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Maintenance Mine Equipment', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Maintenance Overhauls', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Maintenance Mine Equipment', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Maintenance Overhead Cranes', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'NPI Maitenance', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Maintenance Planning Cathode', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Maintenance Cathode', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Maintenance Planning Cathode', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Maintenance Cathode', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Maintenance Planning CH', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Maintenance Concentrate Handling', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Maintenance Planning Concentrate', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Maintenance Concentrate', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Maintenance Planning Mobile Equipment', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Maintenance Mine Equipment', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Maintenance Planning NPI', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'NPI Maitenance', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Maintenance Planning NPI', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'NPI Maitenance', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Maintenance Planning Semi Mobile Equip', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Maintenance Mine Equipment', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Maintenance Power', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'NPI Maitenance', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Maintenance Shovels', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Maintenance Mine Equipment', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Maintenance Trucks', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Maintenance Mine Equipment', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Maintenance Water', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'NPI Maitenance', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Maintenance Water', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'NPI Maitenance', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Management Area', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Planning & Control Process', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Measurement & Reconciliation', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Production Planning Mine', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Mine Geology', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Geology Escondida', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Modifications & Small Proj. Support Area', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Modifications & Small Projects', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Personnel Serv Contract Management', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'People Services', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Personnel Services', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'People Services', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Personnel Services', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'People Services', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Planning Long Term', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Asset Planning', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Planning Medium Term', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Asset Planning', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Power Supply', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'NPI Production', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Process Control', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Planning & Process Control', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Process Control & Improv. Mine', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Production Mine', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Production & Buffer Management', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Production Mine', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Production CC&S Group M', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Production Mine', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Production Contract Management NPI', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'NPI Production', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Production Crushing Conveying Stockpiles', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Production Mine', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Production Dry Area', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Production Cathode', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Production EW', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Production Cathode', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Production LSLC', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Production Concentrate', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Production Mine M1', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Production Mine', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Production Mine M2', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Production Mine', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Production Mine N1', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Production Mine', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Production Mine N2', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Production Mine', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Production Oxide', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Production Cathode', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Production Pipeline & Filter', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Production Concentrate Handling', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Production Planning', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Production Planning Mine', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Production Planning Cathode', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Planning & Process Control', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Production Planning Concentrate', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Planning & Control Process', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Production Port', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Production Concentrate Handling', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Production SL', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Production Cathode', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Project Engineering', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Major Project & Commissioning', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Reliability & Improv. CH', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Maintenance Concentrate Handling', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Reliability & Improv. Concentrate', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Maintenance Concentrate', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Reliability & Improv. Mobile Equipment', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Maintenance Mine Equipment', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Reliability & Improv. Semi Mobile Equip.', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Maintenance Mine Equipment', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Reliability & Improvement NPI', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'NPI Maitenance', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Resource Est. & Modeling', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Geology Escondida', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Service Mine', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Production Mine', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Services Antofagasta', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'People Services', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Standards & Change Control Cathode', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Engineering Cathode', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Tailings Dam', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'NPI Production', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Territory & Infrastructure', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Asset Planning Land and Water', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Water', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Asset Planning Land and Water', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Water Supply', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'NPI Production', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Work Management', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Asset Management', corporationId: corp._id })._id, corporationId: corp._id, },
        //         { name: 'Work Management Planning', typeAreaStructureId, parentAreaId: Areas.findOne({ name: 'Maintenance Crushing & Conveying', corporationId: corp._id })._id, corporationId: corp._id, },

        //     ]
        //     _.map(superintendencias, (area) => {
        //         const find = Areas.findOne(area);
        //         if (!find) Areas.insert(area);
        //     });



