import React from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import _ from 'lodash';

const IdeasStep3 = ({ onChangeForm, data, driversArray, selectDriver }) =>

    (
        <div className="row panel-body panel-body-mobile form-steps step-three">
            <div className="col-md-6">
                <FormGroup>
                    <ControlLabel>Oportunidad</ControlLabel>
                    <FormControl componentClass="textarea"
                        name="opportunity"
                        onChange={onChangeForm}
                        value={data.opportunity}
                        placeholder={'¿Cuál es el desafío que estamos solucionando? (Descripción del problema que la idea busca solucionar)'}
                    />
                </FormGroup>
            </div>

            <div className="col-md-6">
                <FormGroup>
                    <ControlLabel>Descripción de la Idea</ControlLabel>
                    <FormControl componentClass="textarea"
                        name="description"
                        onChange={onChangeForm}
                        value={data.description}
                        placeholder={'Descripción detallada de la idea / sugerencia a implementar'}
                    />
                </FormGroup>
            </div>

            <div className="col-md-12 labelPicker">
                <div className="form-group">
                    <ControlLabel>Drivers de Valor</ControlLabel>
                    {_.map(driversArray, (driver, index) =>
                        <div style={{ marginBottom: "5px" }} key={index}>
                            <button
                                onClick={selectDriver(driver.driver).bind(this)}
                                className={"btn btn-sm " + (_.includes(data.drivers, driver.driver) ? 'btn-success' : 'btn-trans btn-default')} title={driver.placeHolder}>{driver.driver}</button>
                            <p style={{ marginLeft:'5px', color: '#999' }}>{driver.placeHolder}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

export default IdeasStep3;
