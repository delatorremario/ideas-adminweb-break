import React from 'react';
import Loading from '../../components/Loading';
import _ from 'lodash';
import moment from 'moment';
import { Link, Redirect } from 'react-router-dom';

const IdeaCommentsItemComponent = ({ idea }) => {
    console.log(idea)
    const cantCom = cantComments(idea);
    const cantNVCom = cantNonViewedComments(idea);
    return (
        <Link to={'/comment/' + idea._id} className="ci-a">
            <li className="ci-li pointer">
                <label className="ci-oportunity pointer">{idea.opportunity}</label>
                <label className="ci-data pointer">
                    <label className="ci-date pointer">{moment(idea.date).format('DD/MM/YYYY')}</label>
                    {
                        cantNVCom < 1 ? '' :
                            <label className="ci-cantNVCom pointer">
                                <span className="label label-primary label-circlet ci-label pointer">{cantNVCom} sin leer</span>
                            </label>
                    }
                </label>
            </li>
        </Link>
    )
}

const cantComments = (idea) => {
    return idea && idea.comments && idea.comments.length || 0;
}

const cantNonViewedComments = (idea) => {
    const userId = Meteor.userId();
    return _.reduce(idea.comments, (sum, c) => {
        c.viewers = _.filter(c.viewers, (v) => (v.userId === userId) && !v.viewedAt);
        return sum + c.viewers.length;
    }, 0);
}

export default IdeaCommentsItemComponent;