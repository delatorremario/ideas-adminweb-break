import React from 'react';
import { Accordion, Panel } from 'react-bootstrap';
import Loading from '../../components/Loading';
import _ from 'lodash';
import moment from 'moment';
import Files from '../../../api/files/files';

const CommentsComponent = (ideas) => {
    console.log('CC Ideas', ideas);
    return (
        <Accordion>
            {
                _.map(ideas, (idea, index) => {
                    return <Panel className="ci-item" header={idea.opportunity + ' - ' + moment(idea.createAt).format('DD/MM/YYYY')} eventKey={index} key={index}>
                        <div className="ci-item-list">
                            {
                                _.map(idea.comments, (comment, index) => {
                                    return <div className="ci-comment" key={index}>
                                        <div className="ci-comment-info">
                                            <div className="ci-comment-user">
                                                <div className="ci-comment-img" style={{ backgroundImage: 'url("http://localhost:3000/cdn/storage/Files/G2p3QTX8qJ3N9iJxD/original/G2p3QTX8qJ3N9iJxD")' }}></div>
                                                <div>
                                                    <div className="ci-comment-name">
                                                        <b>{comment.user.firstName}</b>
                                                    </div>
                                                    <div className="ci-comment-date">
                                                        <i>
                                                            {
                                                                moment(comment.createAt).format('HH:mm DD/MM/YYYY')
                                                            }
                                                        </i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ci-comment-views" >
                                                <b>
                                                    {
                                                        _.reduce(comment.viewers, (sum, v) => sum + (v.view ? 1 : 0), 0) + ' / ' + comment.viewers.length
                                                    }
                                                </b>
                                            </div>
                                        </div>
                                        <div className="ci-comment-text">
                                            {comment.comment}
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                        <div className="ci-item-new">
                            <label htmlFor="newComment">
                                <i className="ci-item-new-icon fa fa-comment-o"></i>
                            </label>
                            <input type="text" id="newComment" className="ci-item-new-input" placeholder="Comentar"></input>
                            <i className="ci-item-new-icon fa fa-send-o"></i>
                        </div>
                    </Panel>
                })
            }
        </Accordion>
    )
}

export default CommentsComponent;