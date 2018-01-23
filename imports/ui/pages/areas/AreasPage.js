import React from 'react';
import { Link } from 'react-router-dom';
import NotFound from '../NotFound';
import AreasListContainer from '../../containers/areas/AreasListContainer';

const AreasPage = ({ history }) => {
    return history ? (
        <div className="pageWrapper">
            <div className="pageheader">
                <h2>Areas</h2>
                <div className="breadcrumb-wrapper hidden-xs">
                    <span className="label">Estás aquí:</span>
                    <ol className="breadcrumb">
                        <li>
                            <Link to="/persons">Areas</Link>
                        </li>
                    </ol>
                </div>
            </div>
            <section id="main-content">
                <div className="row">
                    <div className="col-md-12 col-lg-12">
                        <div className="panel">
                            <div className="panel-body ng-binding idea-view">
                                <AreasListContainer history={history} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    ) : <NotFound />
};

export default AreasPage