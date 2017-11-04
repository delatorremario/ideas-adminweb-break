import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IdeaEditor from '../../components/ideas/IdeaEditor.js';
import { Link } from 'react-router-dom';

const NewIdea = ({ history }) => (
    <div className="pageWrapper">
        <div className="pageheader">
            <h1>Nueva Idea</h1>

            <div className="breadcrumb-wrapper hidden-xs">
                <span className="label">You are here:</span>
                <ol className="breadcrumb">
                    <li>  <Link to="/">Dashboard</Link>
                    </li>
                    <li>Pages</li>
                    <li className="active">Nueva Idea</li>
                </ol>
            </div>
        </div>

        <section id="main-content">
            <div className="row">
                <div className="col-md-12 col-lg-12">
                    <div className="panel">
                        <div className="panel-body ng-binding">
                            <IdeaEditor history={history} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
);

NewIdea.propTypes = {
    history: PropTypes.shape().isRequired,
}

export default NewIdea;
