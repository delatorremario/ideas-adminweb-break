import React, { Component } from 'react';
import Switch from 'react-toggle-switch';
import colors from '../../../api/dashboard/colors';
import { Tabs, Tab, Button } from 'react-bootstrap';

import ConfigEditorAlert from './ConfigEditorAlert';


const toggleShowInDashboardSwitch = (_id, showInDashboard) => {
    Meteor.call('state.showInDashboard', _id, !showInDashboard, (err) => {
        if (err) { Bert.alert(err.message, 'danger'); return; }
    });
};

const updownValue = (_id, up) => e => {
    e.preventDefault();
    Meteor.call('state.updownValue', _id, e.target.name, up, (err) => {
        if (err) { Bert.alert(err.message, 'danger'); return; }
    });
}

const addAlert = (_id) => {
    Meteor.call('state.addAlert', _id, (err) => {
        if (err) { Bert.alert(err.message, 'danger'); return; }
    });
}

class ConfigEditor extends Component {

    state = { key: 1 }

    handleSelect = key => {
        this.setState({ key });
    }

    render() {
        const { _id, step, state, color, showInDashboard, green, yellow, alerts } = this.props.doc;
        const { key } = this.state;
        return (
            <div className="config-editor">
                <div className="panel panel-default config-semaphore" >
                    <div className="panel-heading" style={{ borderColor: color }}>
                        <div className="title">
                            <h5>{step + ' ' + state}</h5>
                        </div>
                        <div className="show-in-dashboard">
                            <h4>Mostrar en Panel de Control {showInDashboard}</h4>
                            <Switch name='showInDashboard' onClick={toggleShowInDashboardSwitch.bind(this, _id, showInDashboard)} on={showInDashboard} />
                        </div>

                    </div>
                    {
                        showInDashboard && <div>
                            <div className="panel-body">
                                <p>Configurar los días para mostrar el semáforo</p>
                                <div className="lights">
                                    <div className="light">
                                        <div className="color" style={{ backgroundColor: colors[0] }} ></div>
                                        <div className="text">menor a</div>
                                        <div className="value">{green}</div>
                                        <div className='up-down-btn'>
                                            <button name="green" disabled={green <= 1} onClick={updownValue(_id, false).bind(this)} className="btn btn-default btn-trans btn-sm fa fa-angle-down"></button>
                                            <button name="green" disabled={yellow <= green} onClick={updownValue(_id, true).bind(this)} className="btn btn-default btn-trans btn-sm fa fa-angle-up"></button>
                                        </div>
                                    </div>
                                    <div className="light">
                                        <div className="color" style={{ backgroundColor: colors[1] }} ></div>
                                        <div className="text">Entre</div>
                                        <div className="value">{green} y {yellow}</div>
                                        <div className='up-down-btn'>
                                            <button name="yellow" disabled={yellow <= green} onClick={updownValue(_id, false).bind(this)} className="btn btn-default btn-trans btn-sm fa fa-angle-down"></button>
                                            <button name="yellow" onClick={updownValue(_id, true).bind(this)} className="btn btn-default btn-trans btn-sm fa fa-angle-up"></button>
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
                    }

                </div>

                <div className="panel panel-default config-semaphore" >
                    <div className="panel-heading" style={{ borderColor: color }}>
                        <div className="title">
                            <h5>Configuración de Alertas</h5>
                        </div>
                        <div className="show-in-dashboard">
                            <button className="btn btn-default btn-sm" onClick={addAlert.bind(this, _id)}>Agregar</button>
                        </div>
                    </div>
                    <div className="panel-body">
                        <Tabs activeKey={key} onSelect={this.handleSelect} id="controlled-tab-example">
                            {
                                _.map(alerts, (alert, index) => {
                                    return <Tab key={index} eventKey={index + 1} title={`Alerta ${index + 1}`}><ConfigEditorAlert index={index} alert={alert} _id={_id} /></Tab>
                                })
                            }
                        </Tabs>
                    </div>
                </div>
            </div>
        )
    }
}

export default ConfigEditor;
