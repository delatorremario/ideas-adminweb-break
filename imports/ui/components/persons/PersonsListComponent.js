import React, { Component } from 'react';
import PersonsItemContainer from '../../containers/persons/PersonsItemContainer';
import { Link } from 'react-router-dom';
import { ControlLabel } from 'react-bootstrap';

const PersonsListComponent = ({ history, persons, onChangeSearchPerson }) => {
    console.log(persons);
    return (
        <div className="col-xs-12">
            <div className="panel-body ng-binding">
                <div className='ideas-list'>
                    <div className="persons-buttons">
                        <Link to="/persons/new" className="btn btn-success btn-trans btn-action ideas-button">
                            <i className="fa fa-user"></i>
                        </Link>
                        <div className="col-md-6 person-search">
                            <div className="form-group">
                                <i className="fa fa-users"></i>
                                <input id="personSearchInput" type="text" placeholder="Apellido / Nombres / RUT" onChange={onChangeSearchPerson.bind(this)} autoComplete="off" autoFocus />
                            </div>
                        </div>
                    </div>
                    <br className="isMobile"/>
                </div>
            </div>
            <div className="row cards-container">
                {
                    _.map(persons, (p, index) => <PersonsItemContainer key={index} _id={p._id} />)
                }
            </div>
        </div>
    )
}

export default PersonsListComponent;