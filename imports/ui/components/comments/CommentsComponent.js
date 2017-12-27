import React from 'react';
import { Accordion, Panel } from 'react-bootstrap';
import Loading from '../../components/Loading';
import _ from 'lodash';
import moment from 'moment';

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
                                            {
                                                _.reduce(comment.viewers, (sum, v) => sum + v.view ? 1 : 0, 0) + '/' + comment.viewers.length + ' - ' + moment(comment.createAt).format('HH:mm DD/MM/YYYY')
                                            }
                                        </div>
                                        <div className="ci-comment-text">
                                            <b className="ci-comment-user">{comment.user.firstName}</b> {comment.comment}
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </Panel>
                })
            }
        </Accordion>
    )
}

export default CommentsComponent;