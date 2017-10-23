import React from 'react';
import CorporationsList from '../../containers/corporations/CorporationsList';

const Corporations = ({ history }) => (
    <div>
        <div className="pageheader">
            <h1>Corporaciones</h1>

            <div className="breadcrumb-wrapper hidden-xs">
                <span className="label">Estás aquí:</span>
                <ol className="breadcrumb">
                    <li>
                        Corporaciones
                    </li>
                </ol>
            </div>
        </div>

        <section id="main-content">
            <div className="row">
                <div className="col-md-12 col-lg-12">
                    <CorporationsList history={history} />
                </div>
            </div>
        </section>
    </div>
);

export default Corporations