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
                    const cVC = cantViewedComments(idea);
                    return (
                        <Panel className="ci-item" header={idea.opportunity + ' (' + (cVC) + '/' + cantCom + ') - ' + moment(idea.createAt).format('DD/MM/YYYY')} eventKey={index} key={index} onClick={viewComments(idea).bind(this)}>
                            <CommentsComponent idea={idea}/>
                        </Panel>
                    )
                })
            }
        </Accordion>
    )
}

const cantComments = (idea) => {
    return idea && idea.comments && idea.comments.length || 0;
}

const cantViewedComments = (idea) => {
    const userId = Meteor.userId();
    return cantComments(idea) - _.reduce(idea.comments, (sum, c) => {
        c.viewers = _.filter(c.viewers, (v) => (v.userId === userId) && !v.viewedAt);
        return sum + c.viewers.length;
    }, 0);
}

const viewComments = (idea) => (event) => {
    console.log(idea._id);
}

export default CommentsAcordionComponent;