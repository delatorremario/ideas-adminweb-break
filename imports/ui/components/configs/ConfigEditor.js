import React, { Component } from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

import configEditor from '../../../modules/configs/configs-editor';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';


export default class ConfigEditor extends Component {
    state = {
        doc: {}
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

    handleShowDashboardChange = () => {
        const { _id, showInDashboard } = this.state.doc;

        Meteor.call('state.showInDashboard', _id, !showInDashboard, (err) => {
            if(err){  Bert.alert(err.message, 'danger'); return; }
            this.setState((prev) => ({ doc: { ...prev.doc, showInDashboard: !prev.doc.showInDashboard }}));
        })

    }

render() {
    const { _id, step, state, color, showInDashboard } = this.state.doc
    console.log('this.state.doc', this.state.doc);
    return (
        <div className="config-editor">
            <div className="panel panel-default config-semaphore" >
                <div className="panel-heading" style={{ backgroundColor: color }}>
                    <div className="title">
                        <h4>{step + ' ' + state}</h4>
                    </div>
                    <div className="show-in-dashboard">
                        <h4>Mostrar en Panel de Control</h4>
                        <Toggle
                            id='state-select'
                            checked={showInDashboard}
                           // checked={showInDashboard}
                            onChange={this.handleShowDashboardChange}
                        />
                    </div>
                </div>
                <div className="panel-body">

                </div>
            </div>
        </div>
    )
}
}

