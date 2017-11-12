import React from 'react';
import { Pie } from 'react-chartjs-2'; // https://github.com/jerairrest/react-chartjs-2



const DashboardCard = ({ area }) => {
    const data = {
        labels: [
            'Red',
            'Green',
            'Yellow'
        ],
        datasets: [{
            data: [300, 50, 100],
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ]
        }]
    };
    return (
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3">
            <div className="panel panel-default browser-chart">
                <div className="panel-heading">
                    <h4 className="panel-title"><small>{area.name}</small></h4>
                </div>
                <div className="panel-body">
                    <small>
                        <div className="row">
                            <div className="col-sm-9">Personal</div>
                            <div className="col-sm-3">234</div>
                        </div>
                        <div className="row">
                            <div className="col-sm-9">Ideas Ingresadas</div>
                            <div className="col-sm-3">234</div>
                        </div>
                        <div className="row">
                            <div className="col-sm-9">Personas que Ingresaron Ideas</div>
                            <div className="col-sm-3">234</div>
                        </div>
                        <div className="row">
                            <div className="col-sm-9">Participación</div>
                            <div className="col-sm-3">54%</div>
                        </div>
                        <div className="row">
                            <Pie data={data} />
                        </div>
                    </small>
                </div>
            </div>
        </div>
    )
};

export default DashboardCard;
