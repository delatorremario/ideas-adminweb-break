import React, { Component } from 'react';

import configEditor from '../../../modules/configs/configs-editor';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Switch from 'react-toggle-switch';
import colors from '../../../api/dashboard/colors';


export default class ConfigEditor extends Component {
    state = {
        doc: {
            showInDashboard: false,
            green: 0,
            yellow: 0,
        }
    }

    componentDidMount() {
        configEditor({ component: this });
        // setTimeout(() => { document.querySelector('[name="name"]').focus(); }, 0);
        if (this.props.doc) {
            this.setState((prev) => ({
                doc: { ...prev.doc, ...this.props.doc }
            }));
        }

    }

    toggleSwitch = () => {
        const { _id, showInDashboard } = this.state.doc;

        Meteor.call('state.showInDashboard', _id, !showInDashboard, (err) => {
            if (err) { Bert.alert(err.message, 'danger'); return; }
            this.setState((prev) => ({ doc: { ...prev.doc, showInDashboard: !prev.doc.showInDashboard } }));
        });
    };

    onChangeDoc = e => {
        e.preventDefault();
        this.setState({
            doc: { ...this.state.doc, [e.target.name]: e.target.value }
        });
    };

    render() {
        const { _id, step, state, color, showInDashboard, green, yellow } = this.state.doc
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
                        <div className="lights">
                            <div className="light">
                                <div className="color" style={{ backgroundColor: colors[0] }} ></div>
                                <div className="text">mayor a</div>
                                <div className="value">
                                    <input type="number" value={green} name="green" onChange={this.onChangeDoc} className="form-control input-sm" min="0" step="1" />
                                </div>

                            </div>
                            <div className="light">
                                <div className="color" style={{ backgroundColor: colors[1] }} ></div>
                                <div className="text">Entre {green} y </div>
                                <div className="value">
                                    <input type="number" value={yellow} name="yellow" onChange={this.onChangeDoc} className="form-control input-sm" min={green + 1} step="1" />
                                </div>
                            </div>
                            <div className="light">
                                <div className="color" style={{ backgroundColor: colors[2] }} ></div>
                                <div className="text">mayor a</div>
                                <div className="value">{yellow}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

