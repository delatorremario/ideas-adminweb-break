import React from 'react';
import Loading from '../../components/Loading';
import _ from 'lodash';
import moment from 'moment';

const CommentComponent = ({ text, name, img, date }) => {
    const color = stringToColor(name);
    return <div className="ci-comment">
        <div className="ci-comment-info">
            <div className="ci-comment-user">
                <div className='ci-comment-img'
                    style={{ backgroundImage: img }}></div>
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

const stringToColor = (string) => {
    let color = 0;
    stringA = string.split('');
    _.forEach(stringA, (n, i) => {
        color += n.charCodeAt(0) * stringA.length * i * 10;
    })
    if (color > 16777215) color -= 16777215;
    if (color < 1048576) color += 1048576;
    if (color > 16777215) color -= 16777215;
    if (color < 1048576) color += 1048576;
    color = parseInt(color, 10).toString(16);
    color = '#' + color;
    return color;
}

export default CommentComponent;