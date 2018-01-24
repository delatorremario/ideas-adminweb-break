import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import Button from 'react-bootstrap-button-loader';

import DashboardCard from './DashboardCard';
export default class Dashboard extends Component {

    state = {
        data: null,
        days: -1,
        daySpinner: -2,
    }

    componentDidMount() {
        this.getData(-1)
    }

    getData = (days) => {
        this.setState({ daySpinner: days });
        Meteor.call('getDashboard', days, (err, data) => {
            this.setState({ data, days, daySpinner: -2 });
        })
    }
    onClick = (number) => e => {
        this.getData(number);
    }
    render() {
        const { days, daySpinner, data } = this.state;

        return (
            <div>
                <div className="pageheader">
                    <h1>Dashboard</h1>
                    <p className="description">Bienvenido a Ideas 3.0</p>
                    <div className="breadcrumb-wrapper hidden-xs">
                        <span className="label">You are here:</span>
                        <ol className="breadcrumb">
                            <li className="active">Dashboard</li>
                        </ol>
                    </div>
                </div>
                <section id="main-content">
                    <div className='ideas-list'>
                        <div className="panel panel-body">
                            <div className="ideas-buttons">
                                <Button
                                    loading={daySpinner === 0}
                                    disabled={daySpinner != -2}
                                    icon='A'
                                    spinColor='white'
                                    onClick={this.onClick(0).bind(this)}
                                    className={'btn btn-success btn-action ideas-button ' + (days === 0 ? '' : 'btn-trans')}>
                                </Button>
                                <Button
                                    loading={daySpinner === 1}
                                    disabled={daySpinner != -2}
                                    icon='C'
                                    spinColor='white'
                                    onClick={this.onClick(1).bind(this)}
                                    className={'btn btn-success btn-action ideas-button ' + (days === 1 ? '' : 'btn-trans')}>
                                </Button>
                                <Button
                                    loading={daySpinner === 3}
                                    disabled={daySpinner != -2}
                                    icon='3 M'
                                    spinColor='white'
                                    onClick={this.onClick(3).bind(this)}
                                    className={'btn btn-success btn-action ideas-button ' + (days === 3 ? '' : 'btn-trans')}>
                                </Button>
                                <Button
                                    loading={daySpinner === 6}
                                    disabled={daySpinner != -2}
                                    icon='6 M'
                                    spinColor='white'
                                    onClick={this.onClick(6).bind(this)}
                                    className={'btn btn-success btn-action ideas-button ' + (days === 6 ? '' : 'btn-trans')}>
                                </Button>
                                <Button
                                    loading={daySpinner === -1}
                                    disabled={daySpinner != -2}
                                    spinColor='white'
                                    onClick={this.onClick(-1).bind(this)}
                                    className={'btn btn-success btn-action ideas-button ' + (days === -1 ? '' : 'btn-trans')}>
                                    { daySpinner!=-1 && <i className="fa fa-ban"></i>}
                                </Button>
                            </div>
                        </div>
                        <div className="row cards-container">
                            {_.map(data, (area, index) =>
                                <DashboardCard key={index} area={area} month={days} />
                            )}
                        </div>
                    </div>
                </section>
            </div>

        )
    }
}


