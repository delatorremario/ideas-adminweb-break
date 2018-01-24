import React, { Component } from 'react';
import { PropTypes } from 'react';
import { ControlLabel } from 'react-bootstrap';

const PersonSearch = ({ persons, onChangeSearchPerson, selectPerson, hideInput }) => {
    return (
        <div>
            {
                !hideInput &&
                <div className="form-group">
                    <div>
                        <ControlLabel>Seleccione una Persona  <i className="fa fa-user"></i></ControlLabel>

                        <input id="personSearchInput" type="text" className="form-control" placeholder="Buscar por Apellido y Nombres o RUT" onChange={onChangeSearchPerson.bind(this)} autoComplete="off" />
                    </div>
                </div>
            }
            {
                persons && <div className="form-group">
                    {/* <label className="col-md-10 control-label">Seleccione una Persona para continuar</label> */}
                    <div>
                        <div className="card" style={{ marginTop: "25px" }}>
                            <ul className="list-group list-group-flush">
                                {
                                    _.map(persons, (person, index) => (
                                        <li key={index} className="list-group-item" onClick={selectPerson(person).bind(this)}
                                            style={{ 
                                                display: 'flex', 
                                                justifyContent: 'space-between'
                                            }}>
                                            <div>{person.lastName} {person.secondLastName}, {person.firstName} {person.secondName}</div>
                                            
                                            <div>
                                            {
                                                person.group === 'EXECUT.' &&
                                                    <small style={{ padding: '0px 5px 0px' }}>Ejecutivo</small>
                                            }
                                                <span className="badge">
                                                    <small>{person.rut}</small>
                                                </span>
                                            </div>
                                        </li>))
                                }

                            </ul>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

PersonSearch.propTypes = {
    persons: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
    selectPerson: PropTypes.func.isRequired,
    onChangeSearchPerson: PropTypes.func.isRequired,
}

export default PersonSearch;
