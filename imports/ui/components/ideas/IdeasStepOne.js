import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class IdeasStepOne extends Component {
    render() {
        const { onChangeForm, data } = this.props;

        return (
            <div className="form-steps step-one">
             
                <FormGroup>
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
                </FormGroup>

                {/* <div className="row">
                    <div className="col-xs-12 col-sm-offset-4 col-sm-6 control-bottom">
                        <Button type="submit" className="reset-icon" bsStyle="success">
                            <i className="fa fa-plus"></i>{data._id ? ' Guardar' : ' Crear'}
                        </Button>
                    </div>
                </div> */}
            </div>
        )
    }
}

export default IdeasStepOne;
