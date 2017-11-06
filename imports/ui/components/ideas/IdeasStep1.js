import React from 'react';
import _ from 'lodash';

import PersonCard from './PersonCard';

const IdeasStep1 = ({ onChangeForm, data, onChangeSearchPerson, persons, selectPerson, origins, selectOrigin }) =>

    (
        <div className="form-steps step-one">
            <h2>Medio de Captura la Idea</h2>
            <div className="form-group">
                <div className="col-md-6">
                    {_.map(origins, (origin, index) =>
                        <button key={index}
                            onClick={selectOrigin(origin).bind(this)}
                            className={origin === data.origin ? 'btn btn-sm btn-success' : 'btn btn-sm btn-trans'}>{origin}</button>
                    )}
                </div>
            </div>

            <h2>Selección de Persona dueña de la Idea</h2>
            {
                data && data.person && <PersonCard person={data.person} removePerson={selectPerson} />
            }


            {data && !data.person &&
                <div>
                    <div className="form-group">
                        <div className="col-md-6">
                            <input type="text" className="form-control" placeholder="Buscar por Apellido y Nombres o RUT" onChange={onChangeSearchPerson.bind(this)} />
                        </div>
                    </div>
                    {
                        persons && <div className="form-group">
                            <label className="col-md-10 control-label">Seleccione una Persona para continuar</label>
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
            }

        </div>
    );

export default IdeasStep1;
