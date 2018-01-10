import React, { Component } from 'react';
import Loading from '../../components/Loading';
import _ from 'lodash';
import moment from 'moment';
import AvatarContainer from '../../containers/avatar/AvatarContainer';

export default class CommentComponent extends Component {

    componentDidMount() {
        $('html,body').stop(true, true);
        $('html,body').animate({ scrollTop: document.body.scrollHeight }, 0, "swing");
    }

    render() {
        const { text, name, userId, date, color, index } = this.props;
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

}
