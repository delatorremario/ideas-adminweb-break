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
                    const cantCom = cantComments(idea);
                    return <Panel className="ci-item" header={idea.opportunity + ' (' + cantCom + ') - ' + moment(idea.createAt).format('DD/MM/YYYY')} eventKey={index} key={index}>
                        <CommentsComponent idea={idea} />
                    </Panel>
                })
            }
        </Accordion>
    )
}

const cantComments = (idea) => {
    return idea && idea.comments && idea.comments.length || 0;
}

const cantNonViewesComments = (idea) => {
    _.reduce(idea, (sum, i) => {
        
    })
}

const viewComments = (idea) => {
    console.log(idea._id);
}

export default CommentsAcordionComponent;