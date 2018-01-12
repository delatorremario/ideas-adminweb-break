import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import { Bert } from 'meteor/themeteorchef:bert';
import NonViewedAlertsComponent from '../nonViewed/NonViewedAlertsComponent';
import $ from 'jquery';

class AlertsMenuComponent extends Component {

    state = {
        showNotMenu: false
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
        Meteor.call('alerts.setOpened', not, (err, res) => {
            if (err) {
                Bert.alert("Se produjo un error al abrir la notificación: " + err.message, 'danger');
            }
        })
    };

    render() {
        const { alerts, counter } = this.props;
        const { showNotMenu } = this.state;
        return (
            <li className="toggle-navigation toggle-right">
                <button className="sidebar-toggle" onClick={e => { this.toggleNotificationsMenu(e); e.stopPropagation(); }} >
                    <NonViewedAlertsComponent counter={counter} />
                </button>
                {showNotMenu && <ul className="dropdown-notifications">
                    {alerts.length ? <div>
                        {alerts.map(not => {
                            return (
                                <Link key={not._id} to={not.path} >
                                    <li className={"single-notification" + (not.state === 'new' ? ' not-opened' : '')} onClick={() => { this.setOpened(not) }}>
                                        <h3>{not.body.title}</h3>
                                        <p>{not.body.message}</p>
                                        <p className="date"><i className="fa fa-calendar"></i> {Moment(not.createdAt).from()}</p>
                                    </li>
                                </Link>
                            )
                        })}
                        <Link to="/alerts">
                            <li className="single-notification btn-show-more" >
                                Ver todas las alertas
                            </li>
                        </Link>
                    </div>
                        :
                        <div className="empty-notifications">
                            <i className="fa fa-bell-slash-o"></i>
                            <h3>No hay alertas pendientes</h3>
                        </div>
                    }
                </ul>}
            </li>
        );
    }
}

export default AlertsMenuComponent;