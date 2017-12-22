import React from 'react';
import { Link } from 'react-router-dom';
import NotFound from '../NotFound';

import SetStateComponent from '../../components/set-state/SetStateComponent';

const SetStatePage = (props) => {
    return <div>
        <div className="pageheader">
            <h1>Asignar Estado</h1>
            <div className="breadcrumb-wrapper hidden-xs">
                <span className="label">You are here:</span>
                <ol className="breadcrumb">
                    <li className="active">Asignar Estado</li>
                </ol>
            </div>
        </div>
        <section id="main-content">
        <div className="row">
            <div className="col-md-12 col-lg-12">
                <div className="panel">
                    <div className="panel-body ng-binding">

                        <SetStateComponent {...props}/>

                    </div>

                </div>
            </div>
        </div>
    </section>
    </div>
};

export default SetStatePage;
