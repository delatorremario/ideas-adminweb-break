import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import NotFound from '../NotFound';
import CommentsComponent from '../../components/comments/CommentsComponent';
import moment from 'moment';
import UpSideDown from '../../components/upsidedown/UpSideDown';

export default class IdeaCommentsPage extends Component {
    render() {
        const { idea } = this.props;
        return (
            <div>
                <div className="pageheader">
                    <h1>
                        Comentarios
                </h1>
                    <p>
                        <br />
                        <b>{idea.opportunity ? idea.opportunity : 'de una idea...'}</b>
                    </p>
                    <div className="breadcrumb-wrapper hidden-xs">
                        <span className="label">You are here:</span>
                        <ol className="breadcrumb">
                            <li className="active">
                                Comentarios de {
                                    idea.opportunity ? idea.opportunity : 'una idea...'
                                }
                            </li>
                        </ol>
                    </div>
                </div>
                <section id="main-content">
                    <div className="row">
                        <div className="col-md-12 col-lg-12 noneMargin">
                            <div className="panel">
                                <div className="panel-body ng-binding">
                                    <div className="ci-item">
                                        <CommentsComponent idea={idea} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <UpSideDown />
            </div>
        )
    };
}