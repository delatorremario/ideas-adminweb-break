import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import { Bert } from 'meteor/themeteorchef:bert';
import _ from 'lodash';


import Switch from 'react-toggle-switch'
import { Meteor } from 'meteor/meteor';

const removeAlert = (_id, alert) => {
    Meteor.call('state.removeAlert', _id, alert, (err) => {
        if (err) { Bert.alert(err.message, 'danger'); return; }
        // console.log('ALERTS 2', alerts);
        Bert.alert(`Alerta Eliminada ${index}`, 'success');
    });
}

const toggleTemporalSwitch = () => {
    console.log('click')
}

const toggleStateChangeSwitch = () => {
    console.log('click')
}

const toggleDailySwitch = () => {
    console.log('click')
}

const toggleWeeklySwitch = () => {
    console.log('click')
}

const toggleSendEmailSwitch = () => {
    console.log('click')
}

const toggleSendInboxSwitch = () => {
    console.log('click')
}

const toggleEmployeeSwitch = () => {
    console.log('click')
}

const toggleLeadSwitch = () => {
    console.log('click')
}

const toggleOneUpSwitch = () => {
    console.log('click')
}
const toggleChiefSwitch = () => {
    console.log('click')
}

const updownDelay = (_id, up, index) => e => {
    e.preventDefault();
    Meteor.call('state.updownDelay', _id, up, index, (err) => {
        if (err) { Bert.alert(err.message, 'danger'); return; }
    });
}

const ConfigEditorAlert = ({ _id, index, alert }) => {

    const { temporal, stateChange, delay, daily, weekly, sendEmail, sendInbox, employee, lead, oneUp, chief, message } = alert;
    return (
        <div className="config-editor-alert">
            <div className="alert-types">
                <div className="alert-type">
                    <div className="alert-type-text">cambio de estado</div>
                    <Switch onClick={toggleStateChangeSwitch} on={stateChange} />
                </div>
                <div className="alert-type">
                    <div className="alert-type-text">temporal</div>
                    <Switch onClick={toggleTemporalSwitch} on={temporal} />
                </div>
            </div>
            {
                temporal && <div className="temporal">
                    <div className="alert-types">
                        <div className="alert-type">
                            <div className="alert-type-text">alerta diaria</div>
                            <Switch onClick={toggleDailySwitch} on={daily} />
                        </div>
                        <div className="alert-type">
                            <div className="alert-type-text">alerta semanal</div>
                            <Switch onClick={toggleWeeklySwitch} on={weekly} />
                        </div>
                    </div>
                    <div className="config-times">
                        <h2>Días de Atraso <span className="label label-default">{delay}</span></h2>
                        <div className='up-down-btn'>
                            <button name="delay" disabled={delay <= 1} onClick={updownDelay(_id, false, index).bind(this)} className="btn btn-default btn-trans btn-sm fa fa-angle-down"></button>
                            <button name="delay" onClick={updownDelay(_id, true, index).bind(this)} className="btn btn-default btn-trans btn-sm fa fa-angle-up"></button>
                        </div>
                    </div>
                </div>
            }

            <div className="config-sends">
                <div className="alert-types">
                    <div className="alert-type">
                        <div className="alert-type-text">enviar e-mail</div>
                        <Switch onClick={toggleSendEmailSwitch} on={sendEmail} />
                    </div>
                    <div className="alert-type">
                        <div className="alert-type-text">bandeja de mensajes</div>
                        <Switch onClick={toggleSendInboxSwitch} on={sendInbox} />
                    </div>
                </div>
            </div>
            <div className="config-to">
                <div className="alert-types">
                    <div className="alert-type">
                        <div className="alert-type-text">Creador de la Idea</div>
                        <Switch onClick={toggleEmployeeSwitch} on={employee} />
                    </div>
                    <div className="alert-type">
                        <div className="alert-type-text">lead</div>
                        <Switch onClick={toggleLeadSwitch} on={lead} />
                    </div>
                    <div className="alert-type">
                        <div className="alert-type-text">1 up</div>
                        <Switch onClick={toggleOneUpSwitch} on={oneUp} />
                    </div>
                    <div className="alert-type">
                        <div className="alert-type-text">Encargado de Area</div>
                        <Switch onClick={toggleChiefSwitch} on={chief} />
                    </div>
                </div>
            </div>


            <div className="config-message">
                <label>Mensaje</label>
                <textarea
                    className="form-control input-sm"
                    name="message"
                    value={message}
                // onChange={onChange}
                />
            </div>

            <Button
                type='button'
                bsStyle="default"
                className="btn btn-sm pull-right btn-trans"
                onClick={removeAlert.bind(this, _id, alert)}>
                <i className="fa fa-trash"></i>
                Eliminar
            </Button>


        </div>
    )

}

export default ConfigEditorAlert;
