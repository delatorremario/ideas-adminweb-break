import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import AlertsMenuContainer from '../containers/alerts/AlertsMenuContainer';
import NonViewedContainer from '../containers/nonViewed/NonViewedContainer';
import NonViewedAlertsContainer from '../containers/nonViewed/NonViewedAlertsContainer';

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
        const { history } = this.props;
        return (
            <footer id="footer">
                <div className="footer-item">
                    <Link className="footer-button" to="/my-ideas" >
                        <button className="footer-button">
                            <i className="fa fa-fw fa-lightbulb-o"></i>
                        </button>
                    </Link>
                </div>
                <div className="footer-item">
                    <Link className="footer-button" to="/comments" >
                        <button className="footer-button">
                            <i className="fa fa-fw fa-envelope">
                            </i>
                            <NonViewedContainer />
                        </button>
                    </Link>
                </div>
                <div className="footer-item">
                    {/* <i className="footer-button">
                        <AlertsMenuContainer history={history} />
                    </i> */}
                    <Link className="footer-button" to="/alerts" >
                        <button className="footer-button">
                            <NonViewedAlertsContainer />
                        </button>
                    </Link>
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
