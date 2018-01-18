import React from 'react';
import IdeasList from '../../containers/ideas/IdeasList';

const Ideas = (props) => (
    <div className="pageWrapper">
        <div className="pageheader">
            <h1>Buscar Ideas</h1>

            <div className="breadcrumb-wrapper hidden-xs">
                <span className="label">Estás aquí:</span>
                <ol className="breadcrumb">
                    <li>
                        Buscar Ideas
                    </li>
                </ol>
            </div>
        </div>

        <section id="main-content">
            <div className="row">
                <div className="col-md-12 col-lg-12">
                    <IdeasList {...props} />
                </div>
            </div>
        </section>
    </div>
);

export default Ideas;
