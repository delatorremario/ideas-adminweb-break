import React from 'react';
import { Accordion, Panel } from 'react-bootstrap';
import _ from 'lodash';
import moment from 'moment';
import CommentsComponent from './CommentsComponent';
import IdeaCommentsItemContainer from '../../containers/comments/IdeaCommentsItemContainer';

const CommentsAcordionComponent = ({ ideas }) => {
    return (
        <ul className="ci-ul">
            {
                _.map(ideas, (idea, index) => {
                    return (
                        <IdeaCommentsItemContainer idea={idea} key={index} />
                    )
                })
            }
        </ul>
    )
}

export default CommentsAcordionComponent;