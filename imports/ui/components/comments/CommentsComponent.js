import React from 'react';
import { Accordion, Panel } from 'react-bootstrap';
import Loading from '../../components/Loading';
import _ from 'lodash';

const CommentsComponent = (ideas) => {
    console.log('CC Ideas', ideas);
    return (
        <Accordion>
            {
                _.map(ideas, (idea, index) => {
                    return <Panel header={idea.person.firstName} eventKey={index} key={index}>
                        {
                            _.map(idea.comments, (comment, index) => {
                                return <div key={index}>
                                    {comment.comment}
                                </div>
                            })
                        }
                    </Panel>
                })
            }
        </Accordion>
    )
}

export default CommentsComponent;