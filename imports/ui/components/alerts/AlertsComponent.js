import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import { Bert } from 'meteor/themeteorchef:bert';

class AlertsComponent extends Component {

    state = {
        showNotMenu: false,
    };

    componentDidMount() {
        const { counter } = this.props;
    }

    toggleNotificationsMenu = e => {
        if (e) e.preventDefault();
        this.setState(prev => ({
            showNotMenu: !prev.showNotMenu
        }));
        $(window).unbind("click");
        if (e) setTimeout(() => {
            this.addEvent();
        }, 0);
    };

    addEvent = () => {
        $(window).on("click", () => {
            this.toggleNotificationsMenu();
        });
    };

    setOpened = not => {
        Meteor.call('setNotificationOpened', not, (err, res) => {
            if (err) {
                Bert.alert("Se produjo un error al abrir la notificación: " + err.message, 'danger');
            }
        })
    };

    render() {
        const { notifications, counter } = this.props;
        const { showNotMenu } = this.state;
        return (
            <li className="toggle-navigation toggle-right">
                <button className="sidebar-toggle" onClick={e => { this.toggleNotificationsMenu(e); e.stopPropagation(); }} >
                    <i className="fa fa-bell">
                        {
                            counter < 1 ? '' :
                                <span className="badge" style={{
                                    backgroundColor: '#2c5694',
                                    color: 'white',
                                    zoom: 0.9,
                                    position: 'relative',
                                    top: '-10px',
                                    right: '7px',
                                    borderRadius: '50%',
                                    padding: '3px 6px',
                                    margin: '0px'
                                }}>{counter}</span>
                        }
                    </i>
                </button>
                {showNotMenu && <ul className="dropdown-notifications">
                    {notifications.length ? <div>
                        {notifications.map(not => {
                            return (
                                <li key={not._id} className={"single-notification" + (not.state === 'new' ? ' not-opened' : '')} onClick={() => { this.setOpened(not) }}>
                                    <Link to={not.path} >
                                        <h3>{not.body.title}</h3>
                                        <p>{not.body.message}</p>
                                        <p className="date"><i className="fa fa-calendar"></i> {Moment(not.createdAt).from()}</p>
                                    </Link>
                                </li>
                            )
                        })}
                        <li className="single-notification btn-show-more" >
                            <Link to="/notifications">
                                Ver todas las notificaciones
                                </Link>
                        </li>
                    </div>
                        :
                        <div className="empty-notifications">
                            <i className="fa fa-bell-slash-o"></i>
                            <h3>No hay notificaciones pendientes</h3>
                        </div>
                    }
                </ul>}
            </li>
        );
    }
}

export default AlertsComponent;