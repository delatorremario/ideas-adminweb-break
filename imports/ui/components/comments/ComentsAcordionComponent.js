import React from 'react';
import { Accordion, Panel } from 'react-bootstrap';
import _ from 'lodash';
import moment from 'moment';
import CommentsComponent from './CommentsComponent';

const CommentsAcordionComponent = ({ ideas }) => {
    return (
        <Accordion>
            {
                _.map(ideas, (idea, index) => {
                    const cantComments = idea && idea.comments && idea.comments.length || 0;
                    return <Panel className="ci-item" header={idea.opportunity + ' (' + cantComments + ') - ' + moment(idea.createAt).format('DD/MM/YYYY')} eventKey={index} key={index}>
                        <CommentsComponent idea={idea} />
                    </Panel>
                })
            }
        </Accordion>
    )
}

export default CommentsAcordionComponent;