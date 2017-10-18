import React, { Component } from 'react'
import ReactDom from 'react-dom'
import classNames from "classnames"
import {
    Router,
    Route,
    Link,
    hashHistory,
    browserHistory,
    IndexRoute
} from 'react-router-dom';
import {
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
    MenuItem,
    ProgressBar
} from "react-bootstrap";

import $ from 'jquery'

class SidebarPush extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            navLinks: [
                {
                    title: "Dashboard",
                    path: "/dashboard",
                    iconClasses: ["fa", "fa-fw", "fa-tachometer"],
                    collapsed: true,
                },
                {
                    title: "Components",
                    path: "/components-page",
                    iconClasses: ["fa", "fa-fw", "fa-bar-chart-o"],
                    collapsed: true,
                },
                {
                    title: "Sublevels",
                    path: false,
                    iconClasses: ["fa", "fa-fw", "fa-list"],
                    collapsed: true,
                    subLevel: [
                        {
                            title: "Testing recursive links",
                            path: "/dashboard/test",
                        },]
                },
                {
                    title: "Pages",
                    path: false,
                    iconClasses: ["fa", "fa-fw", "fa-bar-chart-o"],
                    collapsed: true,
                    subLevel: [
                        {
                            title: "Blank Page",
                            path: "/blank-page",
                        },
                        {
                            title: "Admin Page",
                            path: "/admin-page",
                        }
                    ]
                }
            ]
        };

    }

    activeRoute(getPath) {
        getPath = Array.isArray(getPath) ? getPath : [getPath];
        
        for (let i in getPath) {
            if (this.context.router.route.location.pathname == getPath[i])
                return true;
        }
        return false;
    }

    renderUserName() {
        let userName = "";
        userName = this.props.user.emails[0].address.split("@")[0];
        return userName
    }

    toggleSubLevel(event) {
        // event.preventDefault()
        let levelNumb = event.target.id.split("-")[1];

        $(".sub-level").each((index, level) => {
            let subLevelNumb = level.id.split("-")[1];
            if(levelNumb !== subLevelNumb)
                $(level).slideUp();
        })

        $('#level-' + levelNumb).slideToggle()
    }

    renderNavigation() {
        let links = ``;
        const { navLinks } = this.state

        links = navLinks.map((link, index) => {
            if (!link.subLevel) {
                return (
                    <li key={index} className={this.activeRoute(link.path) ? 'active' : ''}>
                        <Link to={link.path} title={link.path}>
                            <i className={link.iconClasses.join(" ")}></i>
                            {link.title}
                        </Link>
                    </li>
                )
            }

            if (link.subLevel) {
                return (
                    // En el primer activeRoute se debe imprimir el path de todos los sublinks del padre
                    <li key={index} className={this.activeRoute(link.subLevel.map(obj => obj.path)) ? 'active' : ''}>
                        <a id={`anchor-${index}`} onClick={this.toggleSubLevel}>
                            <i className={link.iconClasses.join(" ")}></i>
                            {link.title}
                        </a>
                        {/* className={classNames({ 'nav-sub': true, 'collapse': !this.state.pagesCollapsed }) */}
                        <ul id={`level-${index}`} className={classNames('sub-level' , { 'nav-sub': true, 'collapse': !this.state.pagesCollapsed }) }>
                            {link.subLevel.map((subLink, index) => {
                                return (
                                    <li key={index}>
                                        <Link title={subLink.title} to={subLink.path} className={this.activeRoute(subLink.path) ? 'active' : ''}>
                                            {subLink.title}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </li>
                )
            }
        });

        return links
    }

    render() {
        return (
            <aside className="sidebar sidebar-left">
                <div className="sidebar-profile">
                    <div className="avatar">
                        <img className="img-circle profile-image" src="img/profile.jpg" />
                        <i className="on border-dark animated bounceIn"></i>
                    </div>
                    <div className="profile-body dropdown">
                        <a href="javascript:void(0);" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                            <h4>{this.renderUserName()}<span className="caret"></span>
                            </h4>
                        </a>
                        <p className="title">{this.props.user.roles.map((rol, index) => (
                            index === 0 ? rol : `, ${rol}`))}</p>

                        <ul className="dropdown-menu animated fadeInRight" role="menu">
                            <li className="profile-progress">
                                <h5>
                                    <span>80%</span>
                                    <small>Profile complete</small>
                                </h5>
                                <div className="progress progress-xs">
                                    <div className="progress-bar progress-bar-primary" style={{
                                        "width": "60%"
                                    }}></div>
                                </div>
                            </li>
                            <li className="divider"></li>
                            <li>
                                <a href="javascript:void(0);">
                                    <span className="icon">
                                        <i className="fa fa-user"></i>
                                    </span>My Account</a>
                            </li>
                            <li>
                                <a href="javascript:void(0);">
                                    <span className="icon">
                                        <i className="fa fa-envelope"></i>
                                    </span>Messages</a>
                            </li>
                            <li>
                                <a href="javascript:void(0);">
                                    <span className="icon">
                                        <i className="fa fa-cog"></i>
                                    </span>Settings</a>
                            </li>
                            <li className="divider"></li>
                            <li>
                                <a href="javascript:void(0);">
                                    <span className="icon">
                                        <i className="fa fa-sign-out"></i>
                                    </span>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <nav className="sidebarNav">
                    <h5 className="sidebar-header">Navigation</h5>
                    <ul className="nav nav-pills nav-stacked">
                        
                        {this.renderNavigation()}

                    </ul>
                </nav>
            </aside>
        );
    }
}
SidebarPush.contextTypes = {
    router: React.PropTypes.object
};

export default SidebarPush;
