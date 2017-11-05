import React from 'react';
import _ from 'lodash';

const IdeasStep1 = ({ onChangeForm, data, onChangeSearchPerson, persons, selectPerson, origins, selectOrigin }) =>

    (
        <div className="form-steps step-one">
            <h2>Origen de la Idea</h2>
            <div className="form-group">
                <div className="col-md-6">
                    {_.map(origins, (origin, index) =>
                        <button key={index}
                            onClick={selectOrigin(origin).bind(this)}
                            className={origin === data.origin ? 'btn btn-sm btn-success' : 'btn btn-sm btn-trans'}>{origin}</button>
                    )}
                </div>
            </div>
            <h2>Selección de Persona</h2>

            {data && data.person && <div className="panel panel-default">
                <div className="panel-body">
                    <p>{data.person.firstName} {data.person.secondName} {data.person.lastName}</p>
                    {data.person.rut && <p>rut: {data.person.rut}</p>}
                </div>
            </div>
            }
            { data && !data.person &&
                <div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Buscar la Persona Dueña de la Idea</label>
                        <div className="col-md-6">
                            <input type="text" className="form-control" onChange={onChangeSearchPerson} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-10 control-label">Seleccione una Persona para continuar</label>
                        <div className="col-md-10">
                            <div className="card">
                                <ul className="list-group list-group-flush">
                                    {
                                        _.map(persons, (person, index) => (
                                            <li key={index} className="list-group-item" onClick={selectPerson(person).bind(this)}>
                                                rut: {person.rut}   {person.firstName} {person.secondName} {person.lastName}
                                            </li>))
                                    }

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </div>
    );

export default IdeasStep1;
