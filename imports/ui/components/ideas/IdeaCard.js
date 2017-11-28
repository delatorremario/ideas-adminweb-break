import React from 'react';
import { Meteor } from 'meteor/meteor';
import Moment from 'react-moment';
import 'moment/locale/es';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import Areas from '../../../api/areas/areas';

const IdeaCard = ({ idea, lap, handleRemove }) => {
    const { userId, person, chief, description, opportunity, collaborators, drivers, origin, createdAt, date, states } = idea;
    const createdUser = Meteor.users.findOne(userId);
    const color = states && _.last(states).color || 'black';
    // const userName = `${createdUser.profile && createdUser.profile.name && createdUser.profile.name.first} ${createdUser.profile && createdUser.profile.name && createdUser.profile.name.last}`;

    return <div className="col-sm-6 col-lg-4 cards-item">
        <div className="panel panel-default" style={{ borderColor: color }}>
            <div className="panel-heading" style={{ borderColor: color, boxShadow: `0px 0px 10px ${color} !important` }}>
                <h5 className="panel-title">
                    <div style={{borderBottom: `1px solid ${color}`}}>
                        <small style={{borderRight: `1px solid ${color}`}}> <Moment format="DD MMM YYYY" date={date} /> </small> <b>&nbsp;{person.lastName} </b> {person.firstName} {person.secondName}
                    </div>
                    <br></br>
                    {states && <div> <small className="label" style={{ backgroundColor: color }}>{_.last(states).step} - {_.last(states).state}</small> <small>hace <Moment fromNow ago locale="es">{_.last(states).createdAt}</Moment></small></div>}
                    <br></br>
                    {
                        idea.area && <label className="label label-default label-sm">{idea.area.name}</label>
                    }
                </h5>

                <div className="actions pull-right">
                    <Link to={`/idea/${idea._id}/edit`}><i className="fa fa-pencil"></i></Link>
                    <i className="fa fa-trash" onClick={handleRemove(idea._id).bind(this)}></i>
                </div>
            </div>
            <div className="row panel-body">
                <small>
                    <p className="col-md-12 panel-body-title">
                        <i className="fa fa-user"></i> Idea de <b>{person.lastName} {person.firstName} {person.secondName}</b>
                    </p>
                    <div className="col-md-12 panel-body-description">
                        <p>Ingresada: <small><Moment format="DD MMM YYYY" date={createdAt} /></small></p>
                        <p>Encargado de Area: <b>{chief.lastName} {chief.firstName} {chief.secondName}</b></p>
                        <p>Oportunidad: <b>{opportunity}</b></p>
                        <p>Descripción: <b>{description}</b></p>
                        <p>Medio de Captura: <b>{origin}</b></p>
                        <div>
                            <p>
                                {
                                    _.map(drivers, (driver, index) =>
                                        <small key={index} className='label-tag'><label className='label label-default label-valor'>{driver}</label></small>
                                    )
                                }
                            </p>
                        </div>
                        {
                            collaborators && <div>
                                <p>Colaboradores</p>
                                <ul>
                                    {
                                        _.map(collaborators, (person, index) =>
                                            <li key={index}>{person.firstName} {person.secondName} {person.lastName}</li>
                                        )
                                    }
                                </ul>
                            </div>
                        }

                        <p>Estados</p>
                        <ul>
                            {
                                _.map(states, (state, index) =>
                                    <li key={index}> <small> <Moment format="DD MMM YY" date={state.createdAt} /> {state.step} {state.state} </small></li>
                                )
                            }
                        </ul>
                    </div>
                </small>
            </div>
        </div>
    </div >
}

export default IdeaCard;
