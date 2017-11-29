import React from 'react';
import Switch from 'react-toggle-switch';
import colors from '../../../api/dashboard/colors';
import { Tabs, Tab, Button } from 'react-bootstrap';


const ConfigEditor = ({ doc }) => {
    console.log('DOC', doc);
    const { _id, step, state, color, showInDashboard, green, yellow, alerts } = doc;
    const key = 0;
    return (
        <div className="config-editor">
            <div className="panel panel-default config-semaphore" >
                <div className="panel-heading" style={{ borderColor: color }}>
                    <div className="title">
                        <h5>{step + ' ' + state}</h5>
                    </div>
                    <div className="show-in-dashboard">
                        <h4>Mostrar en Panel de Control {showInDashboard}
                        </h4>
                        <Switch onClick={()=>console.log('click')} on={showInDashboard} />
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
                                    <div className="value">
                                        <input type="number" value={green} name="green" onChange={()=>console.log('click')} className="form-control input-sm" min="0" step="1" />
                                    </div>

                                </div>
                                <div className="light">
                                    <div className="color" style={{ backgroundColor: colors[1] }} ></div>
                                    <div className="text">Entre {green} y </div>
                                    <div className="value">
                                        <input type="number" value={yellow} name="yellow" onChange={()=>console.log('click')} className="form-control input-sm" min={green + 1} step="1" />
                                    </div>
                                </div>
                                <div className="light">
                                    <div className="color" style={{ backgroundColor: colors[2] }} ></div>
                                    <div className="text">mayor a</div>
                                    <div className="value">{yellow}</div>
                                </div>
                            </div>
                            <Button
                                type='button'
                                bsStyle="success"
                                className="btn btn-sm pull-right"
                                onClick={()=>console.log('click')}
                            >
                                <i className="fa fa-paper-plane"></i>
                                Guardar
                            </Button>
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
                        <button className="btn btn-default btn-sm" onClick={this.addAlert}>Agregar</button>
                    </div>
                </div>
                <div className="panel-body">
                    <Tabs activeKey={key} onSelect={()=>console.log('click')} id="controlled-tab-example">
                        {
                            _.map(alerts, (alert, index) => {
                                // const i = index;
                                return <Tab key={index} eventKey={index} title={`Alerta ${index + 1}`}><ConfigEditorAlert removeAlert={()=>console.log('click')} saveAlerts={()=>console.log('click')} index={index} alert={alert} _id={_id} /></Tab>
                            })
                        }
                    </Tabs>
                </div>
            </div>
        </div>
    )

}

export default ConfigEditor;
