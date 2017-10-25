import React, { Component } from 'react';
import { Route, match } from 'react-router-dom';

const Testing = () => (
    <div>Testeando!!!!</div>
)

class Dashboard extends Component {
    constructor({ match }) {
        super()
    }
    render() {
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
                    <div className="row">
                        <div className="col-md-12 col-lg-12">
                            <div className="panel panel-default">
                                <div className="panel-body ng-binding">
                                    <Route path="/dashboard/test" component={Testing} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Dashboard;