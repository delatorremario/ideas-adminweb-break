import React, { PropTypes } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const colors = ['#e65400','#fab636','#b3de68']

const DashboardCard = ({ area }) => {

    const { name, employes, ideasAdded, ideasByStep, ideasPersonAdded, participation, ideasByStatus } = area;

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

    return (
        <div className="col-xs-12 col-sm-6 col-md-4">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4 className="panel-title"><small>{name}</small></h4>
                </div>
                <div className="panel-body">
                    <small>
                        <div className="row">
                            <div className="col-sm-9">Personal</div>
                            <div className="col-sm-3">{employes}</div>
                        </div>
                        <div className="row">
                            <div className="col-sm-9">Ideas Ingresadas</div>
                            <div className="col-sm-3">{ideasAdded}</div>
                        </div>
                        <div className="row">
                            <div className="col-sm-9">Personas que Ingresaron Ideas</div>
                            <div className="col-sm-3">{ideasPersonAdded}</div>
                        </div>
                        <div className="row">
                            <div className="col-sm-9">Participación</div>
                            <div className="col-sm-3">{participation.toFixed(1)}%</div>
                        </div>
                    </small>
                    <div className="row">
                        <Doughnut data={data}
                            options={{
                                maintainAspectRatio: true
                            }} />
                    </div>

                    {

                        _.map(ideasByStatus, (state, index) =>
                            <div key={index} className="link-status"  >
                                <Link to={`/ideas/%20/${state.state}/find`}>
                                    <div>{state.state}</div> 
                                    <div style={{backgroundColor:colors[_.random(0,2)]}}>{state.count}</div>
                                </Link>
                            </div>
                        )

                    }
                </div>
            </div>
        </div>
    )
};

DashboardCard.propTypes = {
    area: PropTypes.shape().isRequired,
};

export default DashboardCard;
