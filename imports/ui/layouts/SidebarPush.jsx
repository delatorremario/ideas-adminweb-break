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
import '../../../node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar';
// import NonViewedComponent from '../components/nonViewed/NonViewedComponent';
import NonViewedContainer from '../containers/nonViewed/NonViewedContainer';
import AvatarContainer from '../containers/avatar/AvatarContainer.js';
require('malihu-custom-scrollbar-plugin')($);
import Ideas from '../../api/ideas/ideas';

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
                // {
                //     title: "Areas",
                //     iconClasses: ["fa", "fa-fw", "fa-sitemap"],
                //     path: "/areas",
                //     roles: ['SuperAdminHolos']
                // },
                {
                    title: "Panel de Control",
                    path: "/dashboard",
                    iconClasses: ["fa", "fa-fw", "fa-tachometer"],
                    collapsed: true,
                },
                {
                    title: "Mis Ideas",
                    iconClasses: ["fa", "fa-fw", "fa-lightbulb-o"],
                    path: "/my-ideas",
                },
                {
                    title: "Buscar Ideas",
                    iconClasses: ["fa", "fa-fw", "fa-search"],
                    path: "/ideas/find",
                },
                {
                    title: "Gestionar Ideas",
                    iconClasses: ["fa", "fa-fw", "fa-suitcase"],
                    path: "/manage-ideas",
                    roles: ['SuperAdminHolos', 'Leader', 'Executive']
                },
                {
                    title: "Comentarios",
                    iconClasses: ["fa", "fa-fw", "fa-comment-o"],
                    path: "/comments",
                },
                {
                    title: "Personas",
                    iconClasses: ["fa", "fa-fw", "fa-users"],
                    path: "/persons",
                    roles: ['SuperAdminHolos', 'Leader']
                },
                {
                    title: "Profile",
                    iconClasses: ["fa", "fa-fw", "fa-user-circle-o"],
                    path: "/profile",
                },
                {
                    title: "Areas",
                    iconClasses: ["fa", "fa-fw", "fa-building-o"],
                    path: "/areas",
                    roles: ['SuperAdminHolos', 'Leader']
                },
                {
                    title: "Enviar Invitación",
                    path: "/sendinvitation",
                    iconClasses: ["fa", "fa-fw", "fa-envelope-o"],
                    collapsed: true,
                },
                {
                    title: "Configuraciones",
                    iconClasses: ["fa", "fa-fw", "fa-cogs"],
                    path: "/configs",
                    roles: ['SuperAdminHolos', 'Leader']
                },
                // {
                //     title: "Ejemplo Componentes",
                //     path: "/components-page",
                //     iconClasses: ["fa", "fa-fw", "fa-bar-chart-o"],
                //     collapsed: true,
                // },

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
        $('.sidebar.sidebar-left').mCustomScrollbar();
        let bodyEl = $('#main-wrapper');
        $(window).on('resize', () => {
            if ($(window).width() < 767) {
                $(bodyEl).removeClass('sidebar-mini');
            }
            this.setHeightScrollbar();
        })
        this.setHeightScrollbar();
    }

    setHeightScrollbar() {
        let windowHeight = $(window).height();
        // console.log('WH', windowHeight)
        if (windowHeight < 600) {
            windowHeight -= 180;
            // console.log('WHM', windowHeight)
        } else {
            windowHeight -= 150;
            // console.log('WHD', windowHeight)
        }
        $('.sidebar.sidebar-left').css({ height: windowHeight });
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
        const { user } = this.props;
        const userName = user && user.profile && user.profile.firstName && user.profile.lastName && (user.profile.firstName + ' ' + user.profile.lastName) ||
            user && user.emails[0].address.split("@")[0];
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

    cantNonViewedComments = (idea) => {
        const userId = Meteor.userId();
        return _.reduce(idea.comments, (sum, c) => {
            c.viewers = _.filter(c.viewers, (v) => (v.userId === userId) && !v.viewedAt);
            return sum + c.viewers.length;
        }, 0);
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
                                {
                                    link.title !== 'Comentarios' ? '' :
                                        <NonViewedContainer />
                                }
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
        const { user, userImg } = this.props;
        return (
            <aside className="sidebar sidebar-left">
                <div className="sidebar-profile">
                    <AvatarContainer userId={user._id} />
                    <div className="profile-body dropdown">
                        <a href="javascript:void(0);" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                            <h4>{this.renderUserName()}
                                {/* <span className="caret"></span> */}
                            </h4>
                        </a>
                        <div className="title">{user && user.roles && user.roles.map((rol, index) => (
                            index === 0 ? rol : `, ${rol}`)) || ' NO TIENE ROLES '}
                            <div><small>{user && user.profile && user.profile.area && user.profile.area.name || 'Sin Area Asignada'}</small></div>
                        </div>

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
