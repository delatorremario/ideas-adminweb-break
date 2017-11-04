import React from 'react';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

const StepThree = ({ onChangeForm, data }) => {

    return (
        <div className="form-steps step-two">
            <h2>3) Antecedente del contrato</h2>
            <form>
                <div className="row">
                    <div className="col-sm-12">
                        <FormGroup>
                            <ControlLabel>Nombre del contrato</ControlLabel>
                            <i className="fa fa-file"></i>
                            <input
                                type="text"
                                name="contractName"
                                onChange={onChangeForm}
                                value={data.contractName}
                                placeholder="Nombre del contrato"
                                className="form-control"
                            />
                        </FormGroup>
                    </div>
                    <div className="col-sm-6">
                        <FormGroup>
                            <ControlLabel>Fecha de inicio</ControlLabel>
                            <i className="fa fa-calendar"></i>
                            <input
                                type="text"
                                name="initDate"
                                onChange={onChangeForm}
                                value={data.initDate}
                                placeholder="Fecha de inicio"
                                className="form-control"
                            />
                        </FormGroup>
                    </div>

                    <div className="col-sm-6">
                        <FormGroup>
                            <ControlLabel>Fecha de finalización</ControlLabel>
                            <i className="fa fa-calendar"></i>
                            <input
                                type="text"
                                name="endDate"
                                onChange={onChangeForm}
                                value={data.endDate}
                                placeholder="Fecha de finalización"
                                className="form-control"
                            />
                        </FormGroup>
                    </div>

                    <div className="col-sm-12">
                        <FormGroup>
                            <ControlLabel>Nombdre del administrador del contrato</ControlLabel>
                            <i className="fa fa-fax"></i>
                            <input
                                type="text"
                                name="contractAdmin"
                                onChange={onChangeForm}
                                value={data.contractAdmin}
                                placeholder="Nombre del administrador"
                                className="form-control"
                            />
                        </FormGroup>
                    </div>

                    <div className="col-sm-12">
                        <FormGroup>
                            <ControlLabel>Descripción del trabajo</ControlLabel>
                            <textarea
                                name="description"
                                onChange={onChangeForm}
                                value={data.description}
                                placeholder="Descripción"                                
                                className="form-control"
                            >
                            </textarea>
                        </FormGroup>
                    </div>

                </div>

            </form>

        </div>
    )
}

export default StepThree;
