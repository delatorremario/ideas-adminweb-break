import React from 'react';
import { Link } from 'react-router-dom';
import NotFound from '../NotFound';
import PersonsListContainer from '../../containers/persons/PersonsListContainer';

const PersonsPage = ({ history }) => {
    return history ? (
        <div className="pageWrapper">
            <div className="pageheader">
                <h2>Personas</h2>
                <div className="breadcrumb-wrapper hidden-xs">
                    <span className="label">Estás aquí:</span>
                    <ol className="breadcrumb">
                        <li>
                            <Link to="/persons">Personas</Link>
                        </li>
                    </ol>
                </div>
            </div>
            <section id="main-content">
                <div className="row">
                    <div className="col-md-12 col-lg-12">
                        <div className="panel">
                            <div className="panel-body ng-binding idea-view">
                                <PersonsListContainer history={history} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    ) : <NotFound />
};

export default PersonsPage