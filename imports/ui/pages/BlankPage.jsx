import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BlankPage extends Component {
    render() {
        return(
            <div>
            <div className="pageheader">
              <h1>Blank Page</h1>
              <div className="breadcrumb-wrapper hidden-xs">
                  <span className="label">You are here:</span>
                  <ol className="breadcrumb">
                      <li>  <Link to="/">Dashboard</Link>
                      </li>
                      <li>Pages</li>
                      <li className="active">Blank Page</li>
                  </ol>
              </div>
          </div>
          <section id="main-content">
                <div className="row">
                    <div className="col-md-12 col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-body ng-binding">
                                You can quickly bootstrap your Web App project here.
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </div>
        );
    }
}

export default BlankPage
