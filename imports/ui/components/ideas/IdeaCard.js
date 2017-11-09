import React from 'react';
import { Meteor } from 'meteor/meteor';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const IdeaCard = ({ idea, lap }) => {

    const { userId, person, chief, description, opportunity, collaborators, drivers, origin, createdAt, date, states } = idea;
    const createdUser = Meteor.users.findOne(userId);
    const userName = `${createdUser.profile && createdUser.profile.name && createdUser.profile.name.first} ${createdUser.profile && createdUser.profile.name && createdUser.profile.name.last}`;


    return <div className="col-sm-6 col-lg-4 cards-item">
        <div className="panel panel-default">
            <div className="panel-heading" style={{ backgroundColor: states && _.last(states).color }}>
                <h5 className="panel-title">
                    <small> <Moment format="DD MMM YYYY" date={date} /></small> {person.lastName}
                </h5>
                <div className="actions pull-right">
                    <Link to={`/idea/${idea._id}/edit`}><i className="fa fa-pencil"></i></Link>
                    <i className="fa fa-trash" onClick={() => { handleRemove(history, idea._id); }}></i>
                </div>
            </div>
            <div className="row panel-body">
                <small>
                    <p className="col-md-12 panel-body-title">
                        <i className="fa fa-user"></i> Idea de <b>{person.firstName} {person.secondName} {person.lastName}</b>
                    </p>
                    <div className="col-md-12 panel-body-description">
                        <p>Ingresada por: {userName} <small><Moment format="DD MMM YYYY" date={createdAt} /></small></p>
                        <p>Encargado de Area: <b>{chief.firstName} {chief.secondName} {chief.lastName}</b></p>
                        <p>Descripción: <b>{description}</b></p>
                        <p>Oportunidad: <b>{opportunity}</b></p>
                        <p>Medio de Captura: <b>{origin}</b></p>
                        <p>
                            {
                                _.map(drivers, (driver, index) =>
                                    <small key={index}><label className='label label-default'>{driver}</label></small>
                                )
                            }
                        </p>

                        {
                            collaborators && <div>
                                <p>Colaboradores</p>
                                <ul>
                                    {
                                        _.map(collaborators, (person,index) =>
                                            <li key={index}>{person.firstName} {person.secondName} {person.lastName}</li>
                                        )
                                    }
                                </ul>
                            </div>
                        }
                    </div>
                </small>
            </div>
        </div>
    </div>
}

export default IdeaCard;
