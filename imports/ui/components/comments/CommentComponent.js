import React from 'react';
import Loading from '../../components/Loading';
import _ from 'lodash';
import moment from 'moment';

const CommentComponent = ({ text, name, img, date }) => {
    return <div className="ci-comment">
        <div className="ci-comment-info">
            <div className="ci-comment-user">
                <div className='ci-comment-img'
                    style={{ backgroundImage: img }}></div>
                <div>
                    <div className="ci-comment-name">
                        <b>{name}</b>
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