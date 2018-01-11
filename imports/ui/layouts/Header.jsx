import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import IdeasLogo from '../components/IdeasLogo'
import AlertsMenuContainer from '../containers/alerts/AlertsMenuContainer';

const handleLogout = () => {
    Meteor.logout();
}

const userName = () => {
    const user = Meteor.user();
    const name = user && user.profile ? user.profile.name : '';
    return user ? `${name.first} ${name.last}` : '';
};

class Header extends Component {

    sidebarPush = () => {
        var bodyEl = $('#main-wrapper');
        ($(window).width() > 767) ? $(bodyEl).toggleClass('sidebar-mini') : $(bodyEl).toggleClass('sidebar-opened');
    }

    render() {
        return (
            <header id="header">
                <div className="brand">
                    <IdeasLogo />
                </div>
                <ul className="nav navbar-nav navbar-left">
                    <li className="toggle-navigation toggle-left">
                        <button className="sidebar-toggle" id="toggle-left" onClick={this.sidebarPush} >
                            <i className="fa fa-bars"></i>
                        </button>
                    </li>
                    {/* <li className="hidden-xs">
                        <input type="text" className="search" placeholder="Search project..." />
                        <button type="submit" className="btn btn-sm btn-search">
                            <i className="fa fa-search"></i>
                        </button>
                    </li> */}
                </ul>
                <ul className="nav navbar-nav navbar-right isDesktop">
                    <AlertsMenuContainer />
                    <li className="toggle-navigation toggle-right">
                        <button className="sidebar-toggle" onClick={handleLogout} >
                            <i className="fa fa-sign-out"></i>
                        </button>
                    </li>
                </ul>
            </header>
        );
    }
}

export default Header
