import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

const IdeasStepOne = ({ onChangeForm, data, onChangeSearchPerson }) =>

    (
        <div className="form-steps step-one">
            <h2>Selección de Persona</h2>

            <div className="form-group">
                <label className="col-sm-3 control-label">Origen de la Idea</label>
                <div className="col-md-6">
                    <button onClick={e => e.preventDefault()} className='btn btn-success'>Email</button>
                    <button className='btn btn-success'>Yamer</button>
                    <button className='btn btn-success'>Otra</button>
                </div>
            </div>

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
                            <li className="list-group-item">Cras justo odio</li>
                            <li className="list-group-item">Dapibus ac facilisis in</li>
                            <li className="list-group-item">Vestibulum at eros</li>
                        </ul>
                    </div>
                </div>
            </div>



            {/* <FormGroup>
                <div className="col-sm-4">
                    <ControlLabel>Origin</ControlLabel>
                </div>
                <div className="col-sm-6">
                    <FormControl
                        type="text"
                        name="origin"
                        value={data.origin}
                        onChange={onChangeForm}
                        placeholder="Origen"
                    />
                </div>
            </FormGroup> */}

        </div>
    )

export default IdeasStepOne;
