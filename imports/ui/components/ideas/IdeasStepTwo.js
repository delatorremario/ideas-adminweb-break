import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

const IdeasStepTwo = ({ onChangeForm, data }) =>

    (
        <div className="form-steps step-one">

            <FormGroup>
                <div className="col-sm-4">
                    <ControlLabel>Descripción</ControlLabel>
                </div>
                <div className="col-sm-6">
                    <FormControl
                        type="area"
                        name="description"
                        value={data.description}
                        onChange={onChangeForm}
                        placeholder="Descripción de la Idea"
                    />
                </div>
            </FormGroup>

        </div>
    )

export default IdeasStepTwo;
