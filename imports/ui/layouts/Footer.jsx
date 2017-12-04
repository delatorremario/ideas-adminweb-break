import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

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
        return (
            <footer id="footer">
                <div className="footer-item">
                    <button className="footer-button" onClick={handleLogout} >
                        <i className="fa fa-fw fa-lightbulb-o"></i>
                    </button>
                </div>
                <div className="footer-item">
                    <button className="footer-button" onClick={handleLogout} >
                        <i className="fa fa-fw fa-envelope-o"></i>
                    </button>
                </div>
                <div className="footer-item">
                    <button className="footer-button" onClick={handleLogout} >
                        <i className="fa fa fa-bell"></i>
                    </button>
                </div>
                <div className="footer-item">
                    <button className="footer-button" onClick={handleLogout} >
                        <i className="fa fa-sign-out"></i>
                    </button>
                </div>
            </footer>
        );
    }
}

export default Footer
