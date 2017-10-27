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
import ColoredAvatar from '../components/ColoredAvatar';
import $ from 'jquery';
import { Roles } from 'meteor/alanning:roles';

class SidebarPush extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            navLinks: [
                {
                    title: "Corporaciones",
                    iconClasses: ["fa", "fa-fw", "fa-sitemap"],
                    path: "/corporations",
                    roles: ['SuperAdminHolos']
                },
                {
                    title: "Areas",
                    iconClasses: ["fa", "fa-fw", "fa-sitemap"],
                    path: "/areas",
                },
                {
                    title: "Panel de Control",
                    path: "/dashboard",
                    iconClasses: ["fa", "fa-fw", "fa-tachometer"],
                    collapsed: true,
                },
                {
                    title: "Enviar Invitación",
                    path: "/sendinvitation",
                    iconClasses: ["fa", "fa-fw", "fa-envelope-o"],
                    collapsed: true,
                },
                {
                    title: "Ejemplo Componentes",
                    path: "/components-page",
                    iconClasses: ["fa", "fa-fw", "fa-bar-chart-o"],
                    collapsed: true,
                },
               
                // {
                //     title: "Sublevels",
                //     path: false,
                //     iconClasses: ["fa", "fa-fw", "fa-list"],
                //     collapsed: true,
                //     subLevel: [
                //         {
                //             title: "Testing recursive links",
                //             path: "/dashboard/test",
                //         },]
                // },
                // {
                //     title: "Pages",
                //     path: false,
                //     iconClasses: ["fa", "fa-fw", "fa-bar-chart-o"],
                //     collapsed: true,
                //     subLevel: [
                //         {
                //             title: "Blank Page",
                //             path: "/blank-page",
                //         },
                //         {
                //             title: "Admin Page",
                //             path: "/admin-page",
                //         }
                //     ]
                // }
            ]
        };

    }

    componentDidMount() {
        let bodyEl = $('#main-wrapper');
        $(window).on('resize', () => {
            if ($(window).width() < 767) {
                $(bodyEl).removeClass('sidebar-mini');
            }
        })
    }

    sidebarPushMobile = () => {
        let bodyEl = $('#main-wrapper');
        if ($(window).width() < 767) {
            $(bodyEl).toggleClass('sidebar-opened');
        }
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
            if (levelNumb !== subLevelNumb)
                $(level).slideUp();
        })

        $('#level-' + levelNumb).slideToggle()
    }

    renderNavigation() {
        let links = ``;
        const { navLinks } = this.state

        links = navLinks.map((link, index) => {

            if (!link.roles || link.roles && Roles.userIsInRole(Meteor.userId(), link.roles)) {
                if (!link.subLevel) {
                    return (
                        <li key={index} className={this.activeRoute(link.path) ? 'active' : ''}>
                            <Link onClick={this.sidebarPushMobile} to={link.path} title={link.path}>
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
                            <ul id={`level-${index}`} className={classNames('sub-level', { 'nav-sub': true, 'collapse': !this.state.pagesCollapsed })}>
                                {link.subLevel.map((subLink, index) => {
                                    return (
                                        <li key={index}>
                                            <Link onClick={this.sidebarPushMobile} title={subLink.title} to={subLink.path} className={this.activeRoute(subLink.path) ? 'active' : ''}>
                                                {subLink.title}
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </li>
                    )
                }
            }
        });

        return links
    }

    render() {
        const { user } = this.props;

        return (
            <aside className="sidebar sidebar-left">
                <div className="sidebar-profile">
                    {user.imageUrl ?
                        <div className="avatar">
                            <img className="img-circle profile-image" src="img/profile.jpg" />
                            <i className="on border-dark animated bounceIn"></i>
                        </div>
                        : <ColoredAvatar color={user.profile && user.profile.color} userName={user && user.name ? user.name : user.emails[0].address} />
                    }
                    <div className="profile-body dropdown">
                        <a href="javascript:void(0);" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                            <h4>{this.renderUserName()}<span className="caret"></span>
                            </h4>
                        </a>
                        <p className="title">{user && user.roles && user.roles.map((rol, index) => (
                            index === 0 ? rol : `, ${rol}`)) || ' NO TIENE ROLES '}</p>

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
