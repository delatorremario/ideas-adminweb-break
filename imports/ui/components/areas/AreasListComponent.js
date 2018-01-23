import React, { Component } from 'react';
import AreasItemComponent from '../../components/areas/AreasItemComponent';
import { Link } from 'react-router-dom';
import { ControlLabel } from 'react-bootstrap';

const AreasListComponent = ({ history, areas, onChangeSearchArea }) => {
    return (
        <div className="col-xs-12">
            <div className="panel-body ng-binding">
                <div className='ideas-list'>
                    <div className="persons-buttons">
                        <Link to="/areas/new" className="btn btn-success btn-trans btn-action ideas-button">
                            <i className="fa fa-building-o"></i>
                        </Link>
                        <div className="col-md-6 person-search">
                            <div className="form-group">
                                <i className="fa fa-search"></i>
                                <input id="personSearchInput" type="text" placeholder="Nombre del area..." onChange={onChangeSearchArea.bind(this)} autoComplete="off" autoFocus />
                            </div>
                        </div>
                    </div>
                    <br className="isMobile" />
                </div>
            </div>
            <div className="row cards-container">
                {
                    _.map(areas, (area, index) => <AreasItemComponent key={index} area={area} />)
                }
            </div>
        </div>
    )
}

export default AreasListComponent;