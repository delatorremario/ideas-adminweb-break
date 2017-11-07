import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import _ from 'lodash';

const IdeasStep3 = ({ onChangeForm, data, driversArray, selectDriver }) =>

    (
        <div className="form-steps step-one">
            <h2>Descripción de la Idea</h2>
            <div className="form-group">
                <div className="col-md-6">
                    <FormGroup>
                        <FormControl componentClass="textarea"
                            name="description"
                            onChange={onChangeForm}
                            value={data.description} />
                    </FormGroup>
                </div>
            </div>

            <h2>Oportunidad</h2>
            <div className="form-group">
                <div className="col-md-6">
                    <FormGroup>
                        <FormControl componentClass="textarea"
                            name="opportunity"
                            onChange={onChangeForm}
                            value={data.opportunity} />
                    </FormGroup>
                </div>
            </div>

            <h2>Drivers de Valor</h2>
            <div className="form-group">
                <div className="col-md-6">
                    {_.map(driversArray, (driver, index) =>
                        <button key={index}
                            onClick={selectDriver(driver.driver).bind(this)}
                            className={_.includes(data.drivers, driver.driver) ? 'btn btn-sm btn-success' : 'btn btn-sm btn-trans'}>{driver.driver}</button>
                    )}
                </div>
            </div>

        




        </div>
    );

export default IdeasStep3;
