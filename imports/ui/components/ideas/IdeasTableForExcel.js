import React from 'react';
import _ from 'lodash';
import Moment from 'react-moment';

// style={{ display: 'none' }}

const IdeasTableForExcel = ({ ideas }) =>
    <table id="ideas-to-xls" style={{ display: 'none' }}>
        <thead>
            <tr>
                <th>Area</th>
                <th>Encargado</th>
                <th>Fecha</th>
                <th>Oportunidad</th>
                <th>Descripción</th>
                <th>Origen</th>
                <th>Drivers</th>
                <th>Estados</th>
                <th>Persona</th>
                <th>OneUp</th>
            </tr>
        </thead>
        <tbody>

            {
                _.map(ideas, (idea, index) => {
                    console.log('AREA', idea.area);
                    return (
                        <tr key={index}>
                            <td>{idea && idea.area && idea.area.name || 'Area'}  </td>
                            <td>{idea.chief.lastName} {idea.chief.firstName} {idea.chief.secondName}</td>
                            <td><Moment format="DD MMM YYYY" date={idea.date} /></td>
                            <td>{idea.opportunity}</td>
                            <td>{idea.description}</td>
                            <td>{idea.origin}</td>
                            <td>{_.map(idea.drivers, (driver, index) => <p key={index}>{driver}</p>)}</td>
                            <td>{_.map(idea.states, (state, index) => <p key={index}>{state.step} {state.state} <small><Moment format="DD MM YYYY" date={state.createdAt} /></small> </p>)}</td>
                            <td>{idea.person.lastName} {idea.person.firstName} {idea.person.secondName}</td>
                            <td>{idea.person.oneUp}</td>
                        </tr>
                    )
                  
                }

                )
            }

        </tbody>
    </table>

export default IdeasTableForExcel;
