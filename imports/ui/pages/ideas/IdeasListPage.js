import React from 'react';
import IdeaListComponent from '../../components/ideas/IdeaListComponent';

const IdeasListPage = (props) => (
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
                    <IdeaListComponent {...props} />
                </div>
            </div>
        </section>
    </div>
);

export default IdeasListPage;
