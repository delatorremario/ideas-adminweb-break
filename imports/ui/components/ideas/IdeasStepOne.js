import React from 'react';
import _ from 'lodash';

const IdeasStepOne = ({ onChangeForm, data, onChangeSearchPerson, persons, selectPerson, origins, selectOrigin }) =>

    (
        <div className="form-steps step-one">
            <h2>Origen de la Idea</h2>
            <div className="form-group">
                <div className="col-md-6">
                    <button onClick={e => e.preventDefault()} className='btn btn-success'>Email</button>
                    <button className='btn btn-success'>Yamer</button>
                    <button className='btn btn-success'>Otra</button>
                </div>
            </div>
            <h2>Selección de Persona</h2>
            {
                data.person && data.person.lastName && <div className="panel panel-default">
                    <div className="panel-body">
                        <p>{data.person.firstName} {data.person.secondName} {data.person.lastName}</p>
                        {data.person.rut && <p>rut: {data.person.rut}</p>}
                    </div>
                </div>
            }
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
        </div>
    );

export default IdeasStepOne;
