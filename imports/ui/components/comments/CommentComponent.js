import React from 'react';
import Loading from '../../components/Loading';
import _ from 'lodash';
import moment from 'moment';

const CommentComponent = ({ text, name, img, date, color }) => {
    return <div className="ci-comment">
        <div className="ci-comment-info">
            <div className="ci-comment-user">
                {
                    img ? <div className='ci-comment-img' style={{ backgroundImage: img }}></div>
                        : <div className='ci-comment-img colored-avatar' style={{ backgroundColor: `${color}` }}>
                            <h2>{name.charAt(0)}</h2>
                        </div>
                }
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