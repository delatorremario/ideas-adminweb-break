import React, { Component } from 'react';
import { PropTypes } from 'react';
import { ControlLabel } from 'react-bootstrap';

const PersonSearch = ({ persons, onChangeSearchPerson, selectPerson }) => {
    return (
        <div className="col-xs-12">
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <ControlLabel>Seleccione una Persona</ControlLabel>
                        <i className="fa fa-user"></i>
                        <input id="personSearchInput" type="text" className="form-control" placeholder="Buscar por Apellido y Nombres o RUT" onChange={onChangeSearchPerson.bind(this)} autoComplete="off" />
                    </div>
                </div>
                {
                    persons && <div className="form-group">
                        {/* <label className="col-md-10 control-label">Seleccione una Persona para continuar</label> */}
                        <div className="col-md-6">
                            <div className="card" style={{ marginTop: "25px" }}>
                                <ul className="list-group list-group-flush">
                                    {
                                        _.map(persons, (person, index) => (
                                            <li key={index} className="list-group-item" onClick={selectPerson(person).bind(this)}
                                                style={person.executive && { fontWeight: 'bold' }}
                                            >
                                                {person.lastName}, {person.firstName} {person.secondName}
                                                <span className="badge">
                                                    <small>{person.rut}</small>
                                                </span>
                                                <div><small>{person.group}</small></div>
                                            </li>))
                                    }

                                </ul>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

PersonSearch.propTypes = {
    persons: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
    selectPerson: PropTypes.func.isRequired,
    onChangeSearchPerson: PropTypes.func.isRequired,
}

export default PersonSearch;
