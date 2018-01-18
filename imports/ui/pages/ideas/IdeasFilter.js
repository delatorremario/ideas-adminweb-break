import React from 'react';
import IdeasListFilter from '../../components/ideas/IdeaListFilter';

const IdeasFilter = (props) => (
    <div className="pageWrapper">
        <div className="pageheader">
            <h1>Ideas desde Panel de Control</h1>

            <div className="breadcrumb-wrapper hidden-xs">
                <span className="label">Estás aquí:</span>
                <ol className="breadcrumb">
                    <li>
                        Ideas desde Panel de Control
                    </li>
                </ol>
            </div>
        </div>

        <section id="main-content">
            <div className="row">
                <div className="col-md-12 col-lg-12">
                    <IdeasListFilter {...props} />
                </div>
            </div>
        </section>
    </div>
);

export default IdeasFilter;
