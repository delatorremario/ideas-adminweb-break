import React from 'react';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

const StepTwo = ({ onChangeForm, data}) => {

    return (
        <div className="form-steps step-two">
            <h2>2) Antecedente empresa contratista</h2>
            <form>
                <div className="row">
                    <div className="col-sm-12">
                        <FormGroup>
                            <ControlLabel>RUT/Razón Social</ControlLabel>
                            <i className="fa fa-hashtag"></i>
                            <input
                                type="text"
                                name="contratistaRut"
                                onChange={onChangeForm}
                                value={data.contratistaRut}
                                placeholder="RUT/Razón Social"
                                className="form-control"
                            />
                        </FormGroup>
                    </div>
                    <div className="col-sm-6">
                        <FormGroup>
                            <ControlLabel>Nombre de fantasía</ControlLabel>
                            <i className="fa fa-building-o"></i>
                            <input
                                type="text"
                                name="name"
                                onChange={onChangeForm}
                                value={data.name}
                                placeholder="Nombre"
                                className="form-control"
                            />
                        </FormGroup>
                    </div>

                    <div className="col-sm-6">
                        <FormGroup>
                            <ControlLabel>Teléfono</ControlLabel>
                            <i className="fa fa-phone"></i>
                            <input
                                type="text"
                                name="phone"
                                onChange={onChangeForm}
                                value={data.phone}
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
                                name="fax"
                                onChange={onChangeForm}
                                value={data.fax}
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
                                name="email"
                                onChange={onChangeForm}
                                value={data.email}
                                placeholder="E-mail"
                                className="form-control"
                            />
                        </FormGroup>
                    </div>

                    <div className="col-sm-4">
                        <FormGroup>
                            <ControlLabel>Sitio web</ControlLabel>
                            <i className="fa fa-chrome"></i>
                            <input
                                type="text"
                                name="web"
                                onChange={onChangeForm}
                                value={data.web}
                                placeholder="Sitio web"
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
                                name="region"
                                onChange={onChangeForm}
                                value={data.region}
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
                                name="province"
                                onChange={onChangeForm}
                                value={data.province}
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
                                name="commune"
                                onChange={onChangeForm}
                                value={data.commune}
                                placeholder="Comuna"
                                className="form-control"
                            />
                        </FormGroup>
                    </div>

                    <div className="col-sm-6">
                        <FormGroup>
                            <ControlLabel>Calle</ControlLabel>
                            <i className="fa fa-road"></i>
                            <input
                                type="text"
                                name="street"
                                onChange={onChangeForm}
                                value={data.street}
                                placeholder="Calle"
                                className="form-control"
                            />
                        </FormGroup>
                    </div>

                    <div className="col-sm-6">
                        <FormGroup>
                            <ControlLabel>Nº</ControlLabel>
                            <i className="fa fa-hashtag"></i>
                            <input
                                type="text"
                                name="streetNumber"
                                onChange={onChangeForm}
                                value={data.streetNumber}
                                placeholder="Número"
                                className="form-control"
                            />
                        </FormGroup>
                    </div>

                    <div className="col-sm-6">
                        <FormGroup>
                            <ControlLabel>Oficina</ControlLabel>
                            <i className="fa fa-building-o"></i>
                            <input
                                type="text"
                                name="office"
                                onChange={onChangeForm}
                                value={data.office}
                                placeholder="Oficina"
                                className="form-control"
                            />
                        </FormGroup>
                    </div>

                    <div className="col-sm-6">
                        <FormGroup>
                            <ControlLabel>Dotación</ControlLabel>
                            <i className="fa fa-hashtag"></i>
                            <input
                                type="text"
                                name="endowment"
                                onChange={onChangeForm}
                                value={data.endowment}
                                placeholder="Dotación"
                                className="form-control"
                            />
                        </FormGroup>
                    </div>

                </div>

            </form>

        </div>
    )
}

export default StepTwo;
