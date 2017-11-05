import React from 'react';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import _ from 'lodash';

const IdeasStep3 = ({ onChangeForm, data, driversArray }) =>

    (
        <div className="form-steps step-one">
            <h2>Descripción de la Idea</h2>
            <div className="form-group">
                <div className="col-md-6">
                    <FormGroup>
                        <ControlLabel>Descripción de la </ControlLabel>
                        <i className="fa fa-hashtag"></i>
                        <input
                            type="text"
                            name="description"
                            onChange={onChangeForm}
                            value={data.description}
                            placeholder=""
                            className="form-control"
                        />
                    </FormGroup>
                </div>
            </div>


            {data && !data.chief &&
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

export default IdeasStep3;
