import React from 'react';
import AlertsListContainer from '../../containers/alerts/AlertsListContainer';

const AlertsPage = (match) => (
    <div className="pageWrapper">
        <div className="pageheader">
            <h1>Alertas</h1>
            <div className="breadcrumb-wrapper hidden-xs">
                <span className="label">Estás aquí:</span>
                <ol className="breadcrumb">
                    <li>
                        Alertas
                    </li>
                </ol>
            </div>
        </div>
        <section id="main-content">
            <div className="row">
                <div className="col-md-12 col-lg-12">
                    <AlertsListContainer match={match}/>
                </div>
            </div>
        </section>
    </div>
);

export default AlertsPage;