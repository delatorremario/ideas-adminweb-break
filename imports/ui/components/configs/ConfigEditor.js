import React, { Component } from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

import configEditor from '../../../modules/configs/configs-editor';

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

    render() {
        const { _id, step, state, color } = this.state.doc
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
                                defaultChecked={false}
                            // onChange={this.handleCheeseChange}
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

