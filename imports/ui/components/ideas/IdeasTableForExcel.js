import React from 'react';
import _ from 'lodash';
import Moment from 'react-moment';

// style={{ display: 'none' }}

const IdeasTableForExcel = ({ ideasFull }) =>
    <table id="ideas-to-xls" style={{ display: 'none' }}>
        <thead>
            <tr>
                <th>Fecha</th>
                <th>Persona</th>
                <th>Area de la Persona</th>
                <th>Líder de Area</th>
                <th>Area Destino</th>
                <th>Encargado</th>
                <th>Oportunidad</th>
                <th>Descripción</th>
                <th>Origen</th>
                <th>Estado Actual</th>
                <th>Fecha Estado Actual</th>
                <th>Drivers</th>
            </tr>
        </thead>
        <tbody>

            {
                _.map(ideasFull, (idea, index) => {
                    return (
                        <tr key={index}>
                            <td><Moment format="DD/MMM/YYYY" date={idea.date} /></td>
                            <td>{idea.person.lastName} {idea.person.secondLastName}, {idea.person.firstName} {idea.person.secondName}</td>
                            <td>{idea && idea.personarea && idea.personarea.name || 'Area'}  </td>
                            <td>{idea.leader && `${idea.leader.lastName} ${idea.leader.secondLastName}, ${idea.leader.firstName} ${idea.leader.secondName}`}</td>
                            <td>{idea && idea.destinationarea && idea.destinationarea.name || 'Area'}  </td>
                            <td>{idea.chief.lastName} {idea.chief.secondLastName}, {idea.chief.firstName} {idea.chief.secondName}</td>
                            <td>{idea.opportunity}</td>
                            <td>{idea.description}</td>
                            <td>{idea.origin}</td>
                            <td>{idea.states && _.last(idea.states).step} - {_.last(idea.states).state}</td>
                            <td><Moment format="DD/MMM/YYYY" date={_.last(idea.states).createdAt} /></td>
                            {_.map(idea.drivers, (driver, index) => <td key={index}>{driver}</td>)}
                        </tr>
                    )
                })
            }

        </tbody>
    </table>

export default IdeasTableForExcel;
