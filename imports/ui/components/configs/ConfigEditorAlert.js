import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'

import Switch from 'react-toggle-switch'


class ConfigEditorAlert extends Component {

    state = {
        temporal: false,
        stateChange: false,
        delay: 1,
        daily: false,
        weekly: false,
        sendEmail: false,
        sendInbox: false,
    }

    onChange = e => {
        this.setState(
            { ...this.state, [e.target.name]: e.target.value }
        );
    }

    toggleTemporalSwitch = () => {
        this.setState((prev) => ({ temporal: !prev.temporal }))
    }

    toggleStateChangeSwitch = () => {
        this.setState((prev) => ({ stateChange: !prev.stateChange }))
    }

    toggleDailySwitch = () => {
        this.setState((prev) => ({ daily: !prev.daily }))
    }
    
    toggleWeeklySwitch = () => {
        this.setState((prev) => ({ weekly: !prev.weekly }))
    }

    toggleSendEmailSwitch = () => {
        this.setState((prev) => ({ sendEmail: !prev.sendEmail }))
    }

    toggleSendInboxSwitch = () => {
        this.setState((prev) => ({ sendInbox: !prev.sendInbox }))
    }

    toggleEmployeeSwitch = () => {
        this.setState((prev) => ({ employee: !prev.employee }))
    }

    toggleLeadSwitch = () => {
        this.setState((prev) => ({ lead: !prev.lead }))
    }

    toggleOneUpSwitch = () => {
        this.setState((prev) => ({ oneUp: !prev.oneUp }))
    }

    render() {
        const { temporal, stateChange, delay, daily, weekly, sendEmail, sendInbox, employee, lead, oneUp } = this.state;
        return (
            <div className="config-editor-alert">
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
                    </div>
                </div>
                <div className="config-message"></div>

            </div>
        )
    }
}

export default ConfigEditorAlert;
