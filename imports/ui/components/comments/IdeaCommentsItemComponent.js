import React from 'react';
import Loading from '../../components/Loading';
import _ from 'lodash';
import moment from 'moment';
import { Link, Redirect } from 'react-router-dom';

const IdeaCommentsItemComponent = ({ idea, cantNVCom }) => {
    const colorB = (idea.states && _.last(idea.states).color) || 'rgb(249, 254, 255)';
    const colorT = (idea.states && _.last(idea.states).color) || '#484848';
    return (
        <Link to={'/comment/' + idea._id} className="ci-a">
            <li className="ci-li pointer" style={{ backgroundColor: colorB + '0C', borderBottomColor: colorB }}>
                <label className="ci-oportunity pointer" style={{ color: colorT }}>{idea.opportunity}</label>
                <label className="ci-data pointer">
                    <label className="ci-date pointer">{moment(idea.date).format('DD/MM/YYYY')}</label>
                    {
                        cantNVCom < 1 ? '' :
                            <label className="ci-cantNVCom pointer">
                                <span className="label label-primary label-circlet ci-label pointer" style={{ backgroundColor: colorT }}>{cantNVCom} sin leer</span>
                            </label>
                    }
                </label>
            </li>
        </Link>
    )
}

export default IdeaCommentsItemComponent;