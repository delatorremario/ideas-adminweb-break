import PersonsItemContainer from '../../containers/persons/PersonsItemContainer';
import ExcelPersonComponent from '../excel/ExcelPersonComponent';
import { ControlLabel } from 'react-bootstrap';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert2';
import XLSX from 'xlsx';
import _ from 'lodash';

const PersonsListComponent = ({ history, persons, onChangeSearchPerson }) => {
    return (
        <div className="col-xs-12">
            <div className="panel-body ng-binding">
                <div className='ideas-list'>
                    <div className="persons-buttons">
                        <Link to="/persons/new" className="btn btn-success btn-trans btn-action ideas-button">
                            <i className="fa fa-user"></i>
                        </Link>
                        <ExcelPersonComponent />
                        <div className="col-md-6 person-search">
                            <div className="form-group">
                                <i className="fa fa-search"></i>
                                <input id="personSearchInput" type="text" placeholder="Apellido / Nombres / RUT" onChange={onChangeSearchPerson.bind(this)} autoComplete="off" autoFocus />
                            </div>
                        </div>
                    </div>
                    <br className="isMobile" />
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