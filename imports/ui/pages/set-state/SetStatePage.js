import React from 'react';
import { Link } from 'react-router-dom';
import NotFound from '../NotFound';
import _ from 'lodash';

import SetStateComponent from '../../components/set-state/SetStateComponent';

const SetStatePage = (props) => {
    const { next } = props;
    console.log('next', next);
    return <div>
        <div className="pageheader">
            <h1>{next && next.action}</h1>
            <div className="breadcrumb-wrapper hidden-xs">
                <span className="label"></span>
                <ol className="breadcrumb">
                    <li className="active"></li>
                </ol>
            </div>
        </div>
        <section id="main-content">
            <div className="row">
                <div className="col-md-12 col-lg-12">
                    <div className="panel">
                        <div className="panel-body ng-binding">

                            <SetStateComponent {...props} />

                        </div>

                    </div>
                </div>
            </div>
        </section>
    </div>
};

export default SetStatePage;
