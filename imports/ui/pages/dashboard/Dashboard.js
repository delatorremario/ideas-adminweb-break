import React from 'react';
import _ from 'lodash';

import DashboardCard from './DashboardCard';


const Dashboard = ({ data, days }) => (
    <div>
        <div className="pageheader">
            <h1>Dashboard</h1>
            <p className="description">Bienvenido a Ideas 3.0</p>
            <div className="breadcrumb-wrapper hidden-xs">
                <span className="label">You are here:</span>
                <ol className="breadcrumb">
                    <li className="active">Dashboard</li>
                </ol>
            </div>
        </div>
        <section id="main-content">
            <div className='ideas-list'>
                <div className="panel panel-body">
                    <div className="ideas-buttons">
                        <button onClick={(e) => { if (days.get() != 0) days.set(0); else days.set(-1); }} className={'btn btn-success btn-action ideas-button ' + (days.get() === 0 ? '' : 'btn-trans')}>
                            A
                        </button>
                        <button onClick={(e) => { if (days.get() != 1) days.set(1); else days.set(-1); }} className={'btn btn-success btn-action ideas-button ' + (days.get() === 1 ? '' : 'btn-trans')}>
                            C
                        </button>
                        <button onClick={(e) => { if (days.get() != 3) days.set(3); else days.set(-1); }} className={'btn btn-success btn-action ideas-button ' + (days.get() === 3 ? '' : 'btn-trans')}>
                            3 M
                        </button>
                        <button onClick={(e) => { if (days.get() != 6) days.set(6); else days.set(-1); }} className={'btn btn-success btn-action ideas-button ' + (days.get() === 6 ? '' : 'btn-trans')}>
                            6 M
                        </button>
                        <button onClick={(e) => { days.set(-1) }} className={'btn btn-success btn-action ideas-button ' + (days.get() === -1 ? '' : 'btn-trans')}>
                            <i className="fa fa-ban"></i>
                        </button>
                    </div>
                </div>
                <div className="row cards-container">
                    {_.map(data, (area, index) =>
                        <DashboardCard key={index} area={area} month={days.get()} />
                    )}
                </div>
            </div>
        </section>
    </div>
);

export default Dashboard;
