import React from 'react';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

const StepFive = ({ onChangeForm, data }) => {

    return (
        <div className="form-steps step-four">
            <h2>5) Antecedentes de representante legal</h2>
            <form>
                <div className="row">
                    <div className="col-sm-5">
                        <FormGroup>
                            <ControlLabel>RUT/RUN</ControlLabel>
                            <i className="fa fa-hashtag"></i>
                            <input
                                type="text"
                                name="representativeRutRun"
                                onChange={onChangeForm}
                                value={data.representativeRutRun}
                                placeholder="RUT/RUN"
                                className="form-control"
                            />
                        </FormGroup>
                    </div>
                    <div className="col-sm-7">
                        <FormGroup>
                            <ControlLabel>Nombre representante</ControlLabel>
                            <i className="fa fa-user"></i>
                            <input
                                type="text"
                                name="representativeName"
                                onChange={onChangeForm}
                                value={data.representativeName}
                                placeholder="Nombre"
                                className="form-control"
                            />
                        </FormGroup>
                    </div>

                    <div className="col-sm-4">
                        <FormGroup>
                            <ControlLabel>Teléfono</ControlLabel>
                            <i className="fa fa-phone"></i>
                            <input
                                type="text"
                                name="representativePhone"
                                onChange={onChangeForm}
                                value={data.representativePhone}
                                placeholder="Teléfono"
                                className="form-control"
                            />
                        </FormGroup>
                    </div>

                    <div className="col-sm-4">
                        <FormGroup>
                            <ControlLabel>Fax</ControlLabel>
                            <i className="fa fa-fax"></i>
                            <input
                                type="text"
                                name="representativeFax"
                                onChange={onChangeForm}
                                value={data.representativeFax}
                                placeholder="Fax"
                                className="form-control"
                            />
                        </FormGroup>
                    </div>

                    <div className="col-sm-4">
                        <FormGroup>
                            <ControlLabel>E-mail</ControlLabel>
                            <i className="fa fa-envelope"></i>
                            <input
                                type="text"
                                name="representativeEmail"
                                onChange={onChangeForm}
                                value={data.representativeEmail}
                                placeholder="E-mail"
                                className="form-control"
                            />
                        </FormGroup>
                    </div>

                    <div className="col-sm-4">
                        <FormGroup>
                            <ControlLabel>Región</ControlLabel>
                            <i className="fa fa-globe"></i>
                            <input
                                type="text"
                                name="representativeRegion"
                                onChange={onChangeForm}
                                value={data.representativeRegion}
                                placeholder="Región"
                                className="form-control"
                            />
                        </FormGroup>
                    </div>

                    <div className="col-sm-4">
                        <FormGroup>
                            <ControlLabel>Provincia</ControlLabel>
                            <i className="fa fa-map"></i>
                            <input
                                type="text"
                                name="representativeProvince"
                                onChange={onChangeForm}
                                value={data.representativeProvince}
                                placeholder="Provincia"
                                className="form-control"
                            />
                        </FormGroup>
                    </div>

                    <div className="col-sm-4">
                        <FormGroup>
                            <ControlLabel>Comuna</ControlLabel>
                            <i className="fa fa-map-marker"></i>
                            <input
                                type="text"
                                name="representativeCommune"
                                onChange={onChangeForm}
                                value={data.representativeCommune}
                                placeholder="Comuna"
                                className="form-control"
                            />
                        </FormGroup>
                    </div>

                    <div className="col-sm-4">
                        <FormGroup>
                            <ControlLabel>Calle</ControlLabel>
                            <i className="fa fa-road"></i>
                            <input
                                type="text"
                                name="representativeStreet"
                                onChange={onChangeForm}
                                value={data.representativeStreet}
                                placeholder="Calle"
                                className="form-control"
                            />
                        </FormGroup>
                    </div>

                    <div className="col-sm-4">
                        <FormGroup>
                            <ControlLabel>Nº</ControlLabel>
                            <i className="fa fa-hashtag"></i>
                            <input
                                type="text"
                                name="representativeStreetNumber"
                                onChange={onChangeForm}
                                value={data.representativeStreetNumber}
                                placeholder="Número"
                                className="form-control"
                            />
                        </FormGroup>
                    </div>

                    <div className="col-sm-4">
                        <FormGroup>
                            <ControlLabel>Oficina</ControlLabel>
                            <i className="fa fa-building-o"></i>
                            <input
                                type="text"
                                name="representativeOffice"
                                onChange={onChangeForm}
                                value={data.representativeOffice}
                                placeholder="Oficina"
                                className="form-control"
                            />
                        </FormGroup>
                    </div>

                </div>
            </form>

        </div>
    )
}

export default StepFive;
