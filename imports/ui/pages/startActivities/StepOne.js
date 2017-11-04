import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class StepOne extends Component {
    render() {
        const { onChangeForm, data } = this.props;

        return (
            <div className="form-steps step-one">
                <h2>1) Antecedente empresa mandante</h2>
                <form>
                    <div className="row">
                        <div className="col-xs-12">
                            <FormGroup>
                                <ControlLabel>RUT/Razón Social</ControlLabel>
                                <select
                                    className="form-control"
                                    name="mandanteRut"
                                    onChange={onChangeForm}
                                    value={data.mandanteRut}
                                >
                                    <option value="">Seleccione una Razón Social...</option>
                                    <option value="Op. 1">Opción 1</option>

                                </select>
                            </FormGroup>
                        </div>
                        {data.mandanteRut && <div className="col-xs-12">
                            <FormGroup>
                                <ControlLabel>Faena/Mina</ControlLabel>
                                <select
                                    className="form-control"
                                    name="mine"
                                    onChange={onChangeForm}
                                    value={data.mine}
                                >
                                    <option value="">Seleccione una Faena/Mina...</option>
                                    <option value="mina 1">Mina 1</option>
                                
                                </select>
                            </FormGroup>
                        </div>}

                        {data.mine && <div className="col-xs-12">
                            <FormGroup>
                                <ControlLabel>Instalación</ControlLabel>
                                <select
                                    className="form-control"
                                    name="facility"
                                    onChange={onChangeForm}
                                    value={data.facility}
                                >
                                    <option value="">Seleccione una Instalación...</option>
                                    <option value="Ints. 1">Instalación 1</option>

                                </select>
                            </FormGroup>
                        </div>}
                    </div>

                </form>

            </div>
        )
    }
}

export default StepOne;
