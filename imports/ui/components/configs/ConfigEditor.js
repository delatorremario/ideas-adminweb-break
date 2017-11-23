import React, { Component } from 'react';

import configEditor from '../../../modules/configs/configs-editor';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Switch from 'react-toggle-switch'



export default class ConfigEditor extends Component {
    state = {
        doc: {
            showInDashboard:false,
        }
    }

    componentDidMount() {
        configEditor({ component: this });
        // setTimeout(() => { document.querySelector('[name="name"]').focus(); }, 0);
        if (this.props.doc) {
            this.setState({
                doc: this.props.doc
            });
        }

    }

    toggleSwitch = () => {
        const { _id, showInDashboard } = this.state.doc;

        Meteor.call('state.showInDashboard', _id, !showInDashboard, (err) => {
            if (err) { Bert.alert(err.message, 'danger'); return; }
            this.setState((prev) => ({ doc: { ...prev.doc, showInDashboard: !prev.doc.showInDashboard } }));
        });
    };

    render() {
        const { _id, step, state, color, showInDashboard } = this.state.doc
        return (
            <div className="config-editor">
                <div className="panel panel-default config-semaphore" >
                    <div className="panel-heading" style={{ backgroundColor: color }}>
                        <div className="title">
                            <h5>{step + ' ' + state}</h5>
                        </div>
                        <div className="show-in-dashboard">
                            <h4>Mostrar en Panel de Control</h4>
                            <Switch onClick={this.toggleSwitch} on={this.state.doc.showInDashboard} />
                        </div>
                    </div>
                    <div className="panel-body">
                    </div>
                </div>
            </div>
        )
    }
}

