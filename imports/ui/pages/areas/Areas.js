import React from 'react';
import AreasList from '../../containers/areas/AreasList';

const Areas = ({ history }) => (
    <div className="pageWrapper">
        <div className="pageheader">
            <h1>Areas</h1>

            <div className="breadcrumb-wrapper hidden-xs">
                <span className="label">Estás aquí:</span>
                <ol className="breadcrumb">
                    <li>
                        Areas
                    </li>
                </ol>
            </div>
        </div>

        <section id="main-content">
            <div className="row">
                <div className="col-md-12 col-lg-12">
                    <AreasList history={history} />
                </div>
            </div>
        </section>
    </div>
);

export default Areas;
