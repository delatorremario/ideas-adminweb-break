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

    render() {
        const { temporal, stateChange, delay, daily, weekly } = this.state;
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

                <div className="config-sends"></div>
                <div className="config-to"></div>
                <div className="config-message"></div>

            </div>
        )
    }
}

export default ConfigEditorAlert;
