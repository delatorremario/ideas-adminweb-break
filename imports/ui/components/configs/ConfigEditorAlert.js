import React, { Component } from 'react';

import Switch from 'react-toggle-switch'


class ConfigEditorAlert extends Component {

    state = {
        temporal: false,
        stateChange: false,

    }

    toggleTemporalSwitch = () => {
        this.setState((prev) => ({ temporal: !prev.temporal }))
    }
    toggleStateChangeSwitch = () => {
        this.setState((prev) => ({ stateChange: !prev.stateChange }))
    }

    render() {
        const { temporal, stateChange } = this.state;
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
            </div>
        )
    }
}

export default ConfigEditorAlert;
