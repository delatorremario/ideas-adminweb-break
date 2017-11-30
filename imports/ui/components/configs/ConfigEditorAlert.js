import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import { Bert } from 'meteor/themeteorchef:bert';
import _ from 'lodash';
import swal from 'sweetalert2'
import Switch from 'react-toggle-switch'

const removeAlert = (_id, alert, handleSelect) => {

    swal({
        title: 'Eliminar Alerta',
        text: "La eliminación de los datos es permanente. ¿Está seguro que desea continuar?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
    }).then(() => {
        Meteor.call('state.removeAlert', _id, alert, (err) => {
            if (err) { Bert.alert(err.message, 'danger'); return; }
            Bert.alert(`Alerta Eliminada`, 'success');
            handleSelect(0);
        });
    }, (dismiss) => { console.log(dismiss) })
}

const stateAlertValue = (_id, index, name, value) => {
    Meteor.call('state.alert.boolean', _id, index, name, value, (err) => {
        if (err) { Bert.alert(err.message, 'danger'); return; }
    })
}

const updownDelay = (_id, up, index) => e => {
    e.preventDefault();
    Meteor.call('state.updownDelay', _id, up, index, (err) => {
        if (err) { Bert.alert(err.message, 'danger'); return; }
    });
}

const onChangeMessage = (_id, index) => e => {
    Meteor.call('state.alert.string', _id, index, 'message', e.target.value, (err) => {
        if (err) { Bert.alert(err.message, 'danger'); return; }
    })
}

const ConfigEditorAlert = ({ _id, index, alert, handleSelect }) => {

    const { temporal, stateChange, delay, daily, weekly, sendEmail, sendInbox, employee, lead, oneUp, chief, message } = alert;
    return (
        <div className="config-editor-alert">
            <div className="alert-types">
                <div className="alert-type">
                    <div className="alert-type-text">cambio de estado</div>
                    <Switch onClick={stateAlertValue.bind(this, _id, index, 'stateChange', !stateChange)} on={stateChange} />
                </div>
                <div className="alert-type">
                    <div className="alert-type-text">temporal</div>
                    <Switch onClick={stateAlertValue.bind(this, _id, index, 'temporal', !temporal)} on={temporal} />
                </div>
            </div>
            {
                temporal && <div className="temporal">
                    <div className="alert-types">
                        <div className="alert-type">
                            <div className="alert-type-text">alerta diaria</div>
                            <Switch onClick={stateAlertValue.bind(this, _id, index, 'daily', !daily)} on={daily} />
                        </div>
                        <div className="alert-type">
                            <div className="alert-type-text">alerta semanal</div>
                            <Switch onClick={stateAlertValue.bind(this, _id, index, 'weekly', !weekly)} on={weekly} />
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
                        <Switch onClick={stateAlertValue.bind(this, _id, index, 'sendEmail', !sendEmail)} on={sendEmail} />
                    </div>
                    <div className="alert-type">
                        <div className="alert-type-text">bandeja de mensajes</div>
                        <Switch onClick={stateAlertValue.bind(this, _id, index, 'sendInbox', !sendInbox)} on={sendInbox} />
                    </div>
                </div>
            </div>

            <div className="config-to">
                <div className="alert-types">
                    <div className="alert-type">
                        <div className="alert-type-text">Creador de la Idea</div>
                        <Switch onClick={stateAlertValue.bind(this, _id, index, 'employee', !employee)} on={employee} />
                    </div>
                    <div className="alert-type">
                        <div className="alert-type-text">lead</div>
                        <Switch onClick={stateAlertValue.bind(this, _id, index, 'lead', !lead)} on={lead} />
                    </div>
                    <div className="alert-type">
                        <div className="alert-type-text">1 up</div>
                        <Switch onClick={stateAlertValue.bind(this, _id, index, 'oneUp', !oneUp)} on={oneUp} />
                    </div>
                    <div className="alert-type">
                        <div className="alert-type-text">Encargado de Area</div>
                        <Switch onClick={stateAlertValue.bind(this, _id, index, 'chief', !chief)} on={chief} />
                    </div>
                </div>
            </div>

            <div className="config-message">
                <label>Mensaje</label>
                <textarea
                    className="form-control input-sm"
                    name="message"
                    defaultValue={message}
                    onChange={onChangeMessage(_id, index).bind(this)}
                />
            </div>

            <Button
                type='button'
                bsStyle="default"
                className="btn btn-sm pull-right btn-trans"
                onClick={removeAlert.bind(this, _id, alert, handleSelect)}>
                <i className="fa fa-trash"></i>
                Eliminar
            </Button>
        </div>
    )
}

export default ConfigEditorAlert;
