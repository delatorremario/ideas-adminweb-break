import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import { Bert } from 'meteor/themeteorchef:bert';
import _ from 'lodash';


import Switch from 'react-toggle-switch'
import { Meteor } from 'meteor/meteor';


class ConfigEditorAlert extends Component {

    state = {
        loading: false,
        alert: {
            temporal: false,
            stateChange: false,
            delay: 1,
            daily: false,
            weekly: false,
            sendEmail: false,
            sendInbox: false,
            employee: false,
            lead: false,
            oneUp: false,
            chief: false,
            message: '',
        }
    }
    componentDidMount() {
        if (this.props.alert)
            this.setState({ alert: this.props.alert })
    }

    onChange = e => {
        console.log('e', e.target.type);
        const value = e.target.type === 'number' && parseInt(e.target.value) || e.target.value;
        this.setState(
            { alert: { ...this.state.alert, [e.target.name]: value } }
        );
    }

    toggleTemporalSwitch = () => {
        this.setState((prev) => ({ alert: { ...this.state.alert, temporal: !prev.alert.temporal } }))
    }

    toggleStateChangeSwitch = () => {
        this.setState((prev) => ({ alert: { ...this.state.alert, stateChange: !prev.alert.stateChange } }))
    }

    toggleDailySwitch = () => {
        this.setState((prev) => ({ alert: { ...this.state.alert, daily: !prev.alert.daily } }))
    }

    toggleWeeklySwitch = () => {
        this.setState((prev) => ({ alert: { ...this.state.alert, weekly: !prev.alert.weekly } }))
    }

    toggleSendEmailSwitch = () => {
        this.setState((prev) => ({ alert: { ...this.state.alert, sendEmail: !prev.alert.sendEmail } }))
    }

    toggleSendInboxSwitch = () => {
        this.setState((prev) => ({ alert: { ...this.state.alert, sendInbox: !prev.alert.sendInbox } }))
    }

    toggleEmployeeSwitch = () => {
        this.setState((prev) => ({ alert: { ...this.state.alert, employee: !prev.alert.employee } }))
    }

    toggleLeadSwitch = () => {
        this.setState((prev) => ({ alert: { ...this.state.alert, lead: !prev.alert.lead } }))
    }

    toggleOneUpSwitch = () => {
        this.setState((prev) => ({ alert: { ...this.state.alert, oneUp: !prev.alert.oneUp } }))
    }
    toggleChiefSwitch = () => {
        this.setState((prev) => ({ alert: { ...this.state.alert, chief: !prev.alert.chief } }))
    }

    saveAlert = () => {
        const { alert } = this.state;
        const { _id, index } = this.props;
        Meteor.call('state.saveAlert', _id, index, alert, (err) => {
            if (err) { Bert.alert(err.message, 'danger'); return; }
        });
    }
    removeAlert = () => {
        const { _id, index } = this.props;
        this.props.removeAlert(_id, index)
    }

    render() {
        const { loading } = this.state;
        const { _id, index } = this.props;
        const { temporal, stateChange, delay, daily, weekly, sendEmail, sendInbox, employee, lead, oneUp, chief, message } = this.state.alert;
        return (
            <div className="config-editor-alert">
                {
                    loading && <div> Loading ... </div> ||
                    <div>
                        <div className="alert-types">
                            <div className="alert-type">
                                <div className="alert-type-text">cambio de estado</div>
                                <Switch onClick={this.toggleStateChangeSwitch.bind(this)} on={stateChange} />
                            </div>
                            <div className="alert-type">
                                <div className="alert-type-text">temporal</div>
                                <Switch onClick={this.toggleTemporalSwitch.bind(this)} on={temporal} />
                            </div>
                        </div>
                        {
                            temporal && <div className="temporal">
                                <div className="alert-types">
                                    <div className="alert-type">
                                        <div className="alert-type-text">alerta diaria</div>
                                        <Switch onClick={this.toggleDailySwitch.bind(this)} on={daily} />
                                    </div>
                                    <div className="alert-type">
                                        <div className="alert-type-text">alerta semanal</div>
                                        <Switch onClick={this.toggleWeeklySwitch.bind(this)} on={weekly} />
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
                                    <Switch onClick={this.toggleSendEmailSwitch.bind(this)} on={sendEmail} />
                                </div>
                                <div className="alert-type">
                                    <div className="alert-type-text">bandeja de mensajes</div>
                                    <Switch onClick={this.toggleSendInboxSwitch.bind(this)} on={sendInbox} />
                                </div>
                            </div>
                        </div>
                        <div className="config-to">
                            <div className="alert-types">
                                <div className="alert-type">
                                    <div className="alert-type-text">Creador de la Idea</div>
                                    <Switch onClick={this.toggleEmployeeSwitch.bind(this)} on={employee} />
                                </div>
                                <div className="alert-type">
                                    <div className="alert-type-text">lead</div>
                                    <Switch onClick={this.toggleLeadSwitch.bind(this)} on={lead} />
                                </div>
                                <div className="alert-type">
                                    <div className="alert-type-text">1 up</div>
                                    <Switch onClick={this.toggleOneUpSwitch.bind(this)} on={oneUp} />
                                </div>
                                <div className="alert-type">
                                    <div className="alert-type-text">Encargado de Area</div>
                                    <Switch onClick={this.toggleChiefSwitch.bind(this)} on={chief} />
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
                            bsStyle="success"
                            className="btn btn-sm pull-right"
                            onClick={this.saveAlert}>
                            <i className="fa fa-paper-plane"></i>
                            Guardar
                        </Button>
                        <Button
                            type='button'
                            bsStyle="default"
                            className="btn btn-sm pull-right btn-trans"
                            onClick={this.removeAlert}>
                            <i className="fa fa-trash"></i>
                            Eliminar
                        </Button>

                    </div>
                }
            </div>
        )
    }
}

export default ConfigEditorAlert;
