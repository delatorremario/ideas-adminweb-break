import React from 'react';
import _ from 'lodash';

import DashboardCard from './DashboardCard';


const Dashboard = ({ data }) => (
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
            <div className="row cards-container">
                {_.map(data, (area, index) =>
                    <DashboardCard key={index} area={area} />
                )}
            </div>
        </section>
    </div>
);

export default Dashboard;
