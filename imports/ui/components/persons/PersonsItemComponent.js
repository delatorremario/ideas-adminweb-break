import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const handleRemove = (_id) => (e) => {
    console.log(_id);
}

const PersonsItemComponent = ({ history, person }) => {
    const user = false;
    return (person &&
        <div className="col-sm-6 col-lg-4 cards-item person-card">
            <div className="panel panel-default" style={{ borderColor: '#6e8694 !important' }}>
                <div className="panel-heading" style={{ borderColor: '#6e8694 !important', backgroundColor: '#2c5594AC !important' }}>
                    <h5 className="panel-title">
                        <div style={{ borderBottom: `1px solid #6e8694 !important` }}>
                            <div className="title-name" style={{ color: '#2e3238 !important' }}>
                                <b>&nbsp;&nbsp;{person && person.lastName}&nbsp;&nbsp;</b>{person && person.firstName} {person && person.secondName}
                            </div>
                        </div>
                    </h5>
                    {/* <div className="actions pull-right" style={{ marginTop: '5px' }}>
                        <Link to={`/persons/${person._id}/edit`}><i className="fa fa-pencil"></i></Link>
                        <i className="fa fa-trash" onClick={handleRemove(person._id).bind(this)}></i>
                    </div> */}
                </div>
                <div className="row panel-body">
                    <small>
                        <p className="col-md-12 panel-body-title">
                            &nbsp;<i className="fa fa-envelope-o"></i><b>&nbsp;&nbsp;E-mail:&nbsp;</b> {person.email}
                        </p>
                        <p className="col-md-12 panel-body-title">
                            &nbsp;<i className="fa fa-building-o"></i><b>&nbsp;&nbsp;&nbsp;Area:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>{person.area.name}
                        </p>
                    </small>
                </div>
            </div>
        </div >
    )
}
export default PersonsItemComponent;
