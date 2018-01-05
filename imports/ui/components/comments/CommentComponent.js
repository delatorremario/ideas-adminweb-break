import React from 'react';
import Loading from '../../components/Loading';
import _ from 'lodash';
import moment from 'moment';
import AvatarContainer from '../../containers/avatar/AvatarContainer';

const CommentComponent = ({ text, name, userId, date, color, read, ideaId, index }) => {
    return <div className="ci-comment">
        <div className="ci-comment-info">
            <div className="ci-comment-user">
                <AvatarContainer userId={userId} />
                <div>
                    <div className="ci-comment-name">
                        <b style={{ color: color }}>{name}</b>
                    </div>
                    <div className="ci-comment-date">
                        <i>
                            {
                                moment(date).format('HH:mm DD/MM/YYYY')
                            }
                        </i>
                    </div>
                </div>
            </div>
        </div>
        <div className="ci-comment-text">
            {text}
        </div>
    </div>
}

export default CommentComponent;