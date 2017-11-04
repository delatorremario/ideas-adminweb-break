import React from 'react';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

const StepFour = ({ onChangeForm, data }) => {

    return (
        <div className="form-steps step-four">
            <h2>4) Antecedente de experto en prevención de riesgos</h2>
            <form>
                <div className="row">
                    <div className="col-sm-4">
                        <FormGroup>
                            <ControlLabel>RUT/RUN</ControlLabel>
                            <i className="fa fa-hashtag"></i>
                            <input
                                type="text"
                                name="rutRunExperto"
                                onChange={onChangeForm}
                                value={data.rutRunExperto}
                                placeholder="RUT/RUN"
                                className="form-control"
                            />
                        </FormGroup>
                    </div>
                    <div className="col-sm-5">
                        <FormGroup>
                            <ControlLabel>Nombre experto</ControlLabel>
                            <i className="fa fa-user"></i>
                            <input
                                type="text"
                                name="expertName"
                                onChange={onChangeForm}
                                value={data.expertName}
                                placeholder="Nombre de experto"
                                className="form-control"
                            />
                        </FormGroup>
                    </div>

                    <div className="col-sm-3">
                        <FormGroup>
                            <ControlLabel>Nº SNGM</ControlLabel>
                            <i className="fa fa-hashtag"></i>
                            <input
                                type="text"
                                name="registryNumberSNGM"
                                onChange={onChangeForm}
                                value={data.registryNumberSNGM}
                                placeholder="Fecha de finalización"
                                className="form-control"
                            />
                        </FormGroup>
                    </div>

                </div>

            </form>

        </div>
    )
}

export default StepFour;
