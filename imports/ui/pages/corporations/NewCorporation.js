import React, { Component } from 'react';
import CorporationEditor from '../../components/corporations/CorporationEditor.js';
import { Link } from 'react-router-dom';

const NewCorporation = ({ history }) => (
    <div className="pageWrapper">
        <div className="pageheader">
            <h1>Nueva Corporación</h1>

            <div className="breadcrumb-wrapper hidden-xs">
                <span className="label">You are here:</span>
                <ol className="breadcrumb">
                    <li>  <Link to="/">Dashboard</Link>
                    </li>
                    <li>Pages</li>
                    <li className="active">Nueva Corporación</li>
                </ol>
            </div>
        </div>

        <section id="main-content">
            <div className="row">
                <div className="col-md-12 col-lg-12">
                    <div className="panel">
                        <div className="panel-body ng-binding">
                            <CorporationEditor history={history} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
);

export default NewCorporation;
