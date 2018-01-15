import React from 'react';
import MyIdeasList from '../../containers/ideas/MyIdeasList';

const MyIdeas = (props) => (
    <div className="pageWrapper">
        <div className="pageheader">
            <h1>Mis Ideas</h1>

            <div className="breadcrumb-wrapper hidden-xs">
                <span className="label">Estás aquí:</span>
                <ol className="breadcrumb">
                    <li>
                        Mis Ideas
                    </li>
                </ol>
            </div>
        </div>

        <section id="main-content">
            <div className="row">
                <div className="col-md-12 col-lg-12">
                    <MyIdeasList {...props} />
                </div>
            </div>
        </section>
    </div>
);

export default MyIdeas;
