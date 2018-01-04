import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import NonViewedContainer from '../containers/nonViewed/NonViewedContainer';

const handleLogout = () => {
    Meteor.logout();
}

const userName = () => {
    const user = Meteor.user();
    const name = user && user.profile ? user.profile.name : '';
    return user ? `${name.first} ${name.last}` : '';
};

cantNonViewedComments = (idea) => {
    const userId = Meteor.userId();
    return _.reduce(idea.comments, (sum, c) => {
        c.viewers = _.filter(c.viewers, (v) => (v.userId === userId) && !v.viewedAt);
        return sum + c.viewers.length;
    }, 0);
}

class Footer extends Component {
    render() {
        return (
            <footer id="footer">
                <div className="footer-item">
                    <button className="footer-button">
                        <Link className="footer-button" to="/ideas/find" >
                            <i className="fa fa-fw fa-lightbulb-o"></i>
                        </Link>
                    </button>
                </div>
                <div className="footer-item">
                    <button className="footer-button">
                        <Link className="footer-button" to="/comments" >
                            <i className="fa fa-fw fa-envelope"></i>
                        </Link>
                    </button>
                </div>
                <div className="footer-item">
                    <button className="footer-button">
                        <Link className="footer-button" to="/" >
                            <i className="fa fa fa-bell">
                            <NonViewedContainer />
                            </i>
                        </Link>
                    </button>
                </div>
                <div className="footer-item">
                    <button className="footer-button" onClick={handleLogout} to="#" >
                        <i className="fa fa-sign-out"></i>
                    </button>
                </div>
            </footer>
        );
    }
}

export default Footer
