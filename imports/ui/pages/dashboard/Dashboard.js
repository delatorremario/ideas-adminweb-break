import React from 'react';
import DashboardCard from './DashboardCard';

const Dashboard = ({ }) => (
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
            <div className="row">
                <div className="col-md-12 col-lg-12">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-md-4">
                                    <DashboardCard />
                                </div>
                                <div className="col-md-4">
                                    <DashboardCard />
                                </div>
                                <div className="col-md-4">
                                    <DashboardCard />
                                </div>
                                <div className="col-md-4">
                                    <DashboardCard />
                                </div>
                                <div className="col-md-4">
                                    <DashboardCard />
                                </div>
                                <div className="col-md-4">
                                    <DashboardCard />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
);

export default Dashboard;
