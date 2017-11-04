import React from 'react';
import _ from 'lodash';

const IdeasStepTwo = ({ onChangeForm, data, onChangeSearchPerson, persons, selectChief }) =>

    (
        <div className="form-steps step-one">
            <h2>Selección de Encargado de Área de Destino</h2>

            {data && data.chief && <div className="panel panel-default">
                <div className="panel-body">
                    <p>{data.chief.firstName} {data.chief.secondName} {data.chief.lastName}</p>
                    {data.chief.rut && <p>rut: {data.chief.rut}</p>}
                </div>
            </div>
            }
            { data && !data.chief &&
                <div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">Buscar la Persona Encargada del Area</label>
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
                                            <li key={index} className="list-group-item" onClick={selectChief(person).bind(this)}>
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

export default IdeasStepTwo;
