import React, { PropTypes } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import colors from '../../../api/dashboard/colors';

const DashboardCard = ({ area }) => {
    const { name, employes, ideasAdded, ideasByStep, ideasPersonAdded, participation, ideasByStatus, extarnalPersons } = area;

    const labels = [];
    const dataset = [];
    const backgroundColor = [];
    _.each(ideasByStep, step => {
        labels.push(step.step + ' ' + step.count);
        dataset.push(step.count);
        backgroundColor.push(step.color);
    })

    const data = {
        labels: labels,
        datasets: [{
            data: dataset,
            backgroundColor: backgroundColor,
            hoverBackgroundColor: backgroundColor
        }]
    };

    const headDash = [
        {
            icon: 'fa fa-users',
            concept: 'Personal',
            value: employes,
        },
        {
            icon: 'fa fa-lightbulb-o',
            concept: 'Ideas Ingresadas',
            value: ideasAdded,
        },
        {
            icon: 'fa fa-user-o',
            concept: 'Generaron Ideas',
            value: ideasPersonAdded,
        },
        {
            icon: 'fa fa-star-o',
            concept: 'Participación del Area',
            value:(participation && participation.toFixed(1) || 0) + '%',
        },
        {
            icon: 'fa fa-user-o',
            concept: 'Ingresaron Ideas al Area',
            value: extarnalPersons,
        },
    ]
    return (
        <div className="col-xs-12 col-sm-6 col-md-4 cards-item">
            <div className="panel panel-default dashboardPanel">
                <div className="panel-heading">
                    <h4 className="panel-title"><small>{name}</small></h4>
                </div>
                <div className="panel-body">

                    <div className='head-dashboard-card'>
                        {
                            _.map(headDash, (head, index) => {
                                return  <div key={index}><h4><i className={head.icon} /> {head.concept}</h4><p>{head.value}</p></div>
                            })
                        }
                    </div>
                    <div className="row">
                        {
                            data && <Doughnut data={data}
                                options={{
                                    maintainAspectRatio: true
                                }} />
                        }
                    </div>
                    <div className="link-status-container">
                        {
                            _.map(ideasByStatus, (state, index) => <div key={index} className="link-status"  >
                                <Link to={`/ideas/%20/${state.code}/%20/${area._id}/find`}>
                                    <div>{state.step} {state.state}</div>
                                    {/* <div className="count">{state.count}</div> */}
                                    <div className="count" style={{ backgroundColor: state.green == 0 ? 'none' : colors[0] }}>{state.green}</div>
                                    <div className="count" style={{ backgroundColor: state.yellow == 0 ? 'none' : colors[1] }}>{state.yellow}</div>
                                    <div className="count" style={{ backgroundColor: state.red == 0 ? 'none' : colors[2] }}>{state.red}</div>
                                </Link>
                            </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

DashboardCard.propTypes = {
    area: PropTypes.shape().isRequired,
};

export default DashboardCard;
