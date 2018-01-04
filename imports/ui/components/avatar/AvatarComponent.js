import React from 'react';
import Loading from '../../components/Loading';
import _ from 'lodash';
import moment from 'moment';
import ColoredAvatar from '../ColoredAvatar';

const AvatarComponent = ({ userImg, color, name, email }) => {
    return (
        <div>
            {
                userImg ?
                    <div className="avatar">
                        <img className="img-circle profile-image" src={userImg && userImg.link()} />
                        <i className="on border-dark animated bounceIn"></i>
                    </div>
                    : <ColoredAvatar color={color} userName={name ? name : email} />
            }
        </div>
    )
}

export default AvatarComponent;