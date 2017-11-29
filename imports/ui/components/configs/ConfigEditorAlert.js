import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import { Bert } from 'meteor/themeteorchef:bert';
import _ from 'lodash';


import Switch from 'react-toggle-switch'
import { Meteor } from 'meteor/meteor';

const removeAlert = (_id, index) => {
    Meteor.call('state.removeAlert', _id, index, (err) => {
        if (err) { Bert.alert(err.message, 'danger'); return; }
        // console.log('ALERTS 2', alerts);
        Bert.alert(`Alerta Eliminada ${index}`, 'success');
    });
}

const ConfigEditorAlert = ({ _id, index, alert }) => {

    const { temporal, stateChange, delay, daily, weekly, sendEmail, sendInbox, employee, lead, oneUp, chief, message } = alert;
    return (
        <div className="config-editor-alert">
            <div className="alert-types">
                <div className="alert-type">
                    <div className="alert-type-text">cambio de estado</div>
                    <Switch onClick={() => console.log('click')} on={stateChange} />
                </div>
                <div className="alert-type">
                    <div className="alert-type-text">temporal</div>
                    <Switch onClick={() => console.log('click')} on={temporal} />
                </div>
            </div>
            {
                temporal && <div className="temporal">
                    <div className="alert-types">
                        <div className="alert-type">
                            <div className="alert-type-text">alerta diaria</div>
                            <Switch onClick={() => console.log('click')} on={daily} />
                        </div>
                        <div className="alert-type">
                            <div className="alert-type-text">alerta semanal</div>
                            <Switch onClick={() => console.log('click')} on={weekly} />
                        </div>
                    </div>
                    <div className="config-times">
                        <label>Días de Atraso</label>
                        <input
                            className="form-control input-sm"
                            min="1" step="1"
                            type="number"
                            name="delay"
                            value={delay}
                            onChange={this.onChange}
                        />
                    </div>
                </div>
            }

            <div className="config-sends">
                <div className="alert-types">
                    <div className="alert-type">
                        <div className="alert-type-text">enviar e-mail</div>
                        <Switch onClick={() => console.log('click')} on={sendEmail} />
                    </div>
                    <div className="alert-type">
                        <div className="alert-type-text">bandeja de mensajes</div>
                        <Switch onClick={() => console.log('click')} on={sendInbox} />
                    </div>
                </div>
            </div>
            <div className="config-to">
                <div className="alert-types">
                    <div className="alert-type">
                        <div className="alert-type-text">Creador de la Idea</div>
                        <Switch onClick={() => console.log('click')} on={employee} />
                    </div>
                    <div className="alert-type">
                        <div className="alert-type-text">lead</div>
                        <Switch onClick={() => console.log('click')} on={lead} />
                    </div>
                    <div className="alert-type">
                        <div className="alert-type-text">1 up</div>
                        <Switch onClick={() => console.log('click')} on={oneUp} />
                    </div>
                    <div className="alert-type">
                        <div className="alert-type-text">Encargado de Area</div>
                        <Switch onClick={() => console.log('click')} on={chief} />
                    </div>
                </div>
            </div>
            <div className="config-message">
                <label>Mensaje</label>
                <textarea
                    className="form-control input-sm"
                    name="message"
                    value={message}
                    onChange={this.onChange}
                />
            </div>

            <Button
                type='button'
                bsStyle="default"
                className="btn btn-sm pull-right btn-trans"
                onClick={removeAlert.bind(this, _id, index)}>
                <i className="fa fa-trash"></i>
                Eliminar
            </Button>


        </div>
    )

}

export default ConfigEditorAlert;
