import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import NonViewedComponent from '../components/nonViewed/NonViewedComponent';

const handleLogout = () => {
    Meteor.logout();
}

const userName = () => {
    const user = Meteor.user();
    const name = user && user.profile ? user.profile.name : '';
    return user ? `${name.first} ${name.last}` : '';
};

class Footer extends Component {
    render() {
        const user = Meteor.user();
        const nonViewed = [1, 2, 3, 4];
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
                            <NonViewedComponent className="nonViewed" number={nonViewed.length} />
                        </Link>
                    </button>
                </div>
                <div className="footer-item">
                    <button className="footer-button">
                        <Link className="footer-button" to="/" >
                            <i className="fa fa fa-bell"></i>
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
