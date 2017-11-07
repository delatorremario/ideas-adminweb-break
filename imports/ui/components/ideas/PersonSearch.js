import React, { Component } from 'react';
import { PropTypes } from 'react'

const PersonSearch = ({ persons, onChangeSearchPerson, selectPerson }) => {
    return (
        <div>
            <div className="form-group">
                <div className="col-md-6">
                    <input id="personSearchInput" type="text" className="form-control" placeholder="Buscar por Apellido y Nombres o RUT" onChange={onChangeSearchPerson.bind(this)} />
                </div>
            </div>
            {
                persons && <div className="form-group">
                    {/* <label className="col-md-10 control-label">Seleccione una Persona para continuar</label> */}
                    <div className="col-md-10">
                        <div className="card">
                            <ul className="list-group list-group-flush">
                                {
                                    _.map(persons, (person, index) => (
                                        <li key={index} className="list-group-item" onClick={selectPerson(person).bind(this)}>
                                            {person.lastName}, {person.firstName} {person.secondName}  <span className="badge"><small>{person.rut}</small></span>
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
