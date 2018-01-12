import React from 'react';
import { Meteor } from 'meteor/meteor';
import Moment from 'react-moment';
import 'moment/locale/es';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import Areas from '../../../api/areas/areas';
import SetStateComponent from '../../components/set-state/SetStateComponent';
import IdeaCardChiefAreaContainer from './IdeaCardChiefAreaContainer';

const IdeaCard = ({ idea, imagesCursor, lap, handleRemove, showEdit, showNext, nonViewed }) => {
    console.log('idea', idea)
    const { userId, person, chief, description, opportunity, collaborators, drivers, origin, createdAt, date, states, images, area } = idea;
    const { leader } = area;
    const createdUser = Meteor.users.findOne(userId);
    const lastState = states && _.last(states);
    const color = states && lastState && lastState.color || 'white';
    const nexts = states && lastState && lastState.nexts || [];

    console.log('--idea--',idea);

    return <div className="col-sm-6 col-lg-4 cards-item">
        <div className="panel panel-default" style={{ borderColor: color }}>
            <div className="panel-heading" style={{ borderColor: color, backgroundColor: color + '0C' }}>
                <h5 className="panel-title">
                    <div style={{ borderBottom: `1px solid ${color}` }}>
                        <small> <Moment format="DD MMM YYYY HH:mm" date={date} /> </small>
                        <div className="title-name" style={{ color: color }}>
                            <b>&nbsp;{person.lastName} </b>{person.firstName} {person.secondName}
                        </div>
                    </div>
                    <br></br>
                    {
                        states && lastState &&
                        <div>
                            <small className="label" style={{ backgroundColor: `${color}` }}>{lastState.step} - {lastState.state}</small>
                            <span className="time-ago">hace <Moment fromNow ago locale="es">{lastState.updatedAt}</Moment></span>
                        </div>
                    }
                    {
                        idea.area &&
                        <div className="area-name">
                            <label className="label label-default label-sm">{idea.area.name}</label>
                        </div>
                    }
                </h5>

                <div className="actions pull-right">
                    {
                        showEdit &&
                        <Link to={`/idea/${idea._id}/edit`}><i className="fa fa-pencil"></i></Link>
                    }
                    {
                        _.filter(idea.viewers, v => {
                            return v.userId === Meteor.userId();
                        }).length < 1 ? '' :
                            <Link to={`/comment/${idea._id}`}>
                                <i className="fa fa-comment">
                                    {
                                        nonViewed < 1 ? '' :
                                            <span className="badge" style={{
                                                backgroundColor: color,
                                                color: 'white',
                                                zoom: 0.75,
                                                position: 'relative',
                                                top: '-10px',
                                                right: '7px',
                                                borderRadius: '50%',
                                                padding: '3px 5px',
                                                margin: '0px'
                                            }}>{nonViewed}</span>
                                    }
                                </i>
                            </Link>
                    }
                    {
                        showEdit &&
                        <i className="fa fa-trash" onClick={handleRemove(idea._id).bind(this)}></i>
                    }
                </div>
            </div>
            <div className="row panel-body">
                <small>
                    <p className="col-md-12 panel-body-title">
                        <i className="fa fa-user"></i> Idea de <b>{person.lastName} {person.firstName} {person.secondName}</b>
                    </p>
                    <div className="col-md-12 panel-body-description">
                        <p>Ingresada: <small><Moment format="DD MMM YYYY" date={createdAt} /></small></p>
                        <p><b>Lider: {leader.lastName} {leader.firstName} {leader.secondName}</b></p>
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
                                    <li key={index}>
                                        <small> <Moment format="DD MMM YY" date={state.createdAt} /> {state.step} {state.state} </small>
                                        <h4>{state.action}</h4>
                                        {
                                            _.map(state.toChanges, (toChange, i) => {
                                                if (toChange.text) return <p key={i}>{toChange.label}: {toChange.text}</p>
                                                if (toChange.type === 'check') return <p key={i}>{toChange.label}: {toChange.checked && 'SI' || 'NO'}</p>
                                                if (toChange.date) return <p key={i}>{toChange.label}: <Moment format="DD MMM YYYY" date={toChange.date} /></p>
                                                if (toChange.chief) return <div key={i}><IdeaCardChiefAreaContainer chief={toChange.chief} /></div>
                                            })
                                        }
                                    </li>
                                )
                            }
                        </ul>
                        <div className="images-list">

                            {_.map(imagesCursor, (imagePath, index) =>
                                <div key={index} className="image-container" style={{ backgroundImage: `url(${imagePath.link()})` }}></div>
                            )}

                        </div>

                        {
                            showNext && nexts && <div className="nexts-container">
                                {
                                    _.map(nexts, (next, index) =>
                                        <Link to={`/set-state/${idea._id}/${next.code}`}
                                            key={index}
                                            style={{ backgroundColor: next.color }}
                                            className="btn btn-trans" >
                                            {next.title} ({next.code})
                                            </Link>
                                    )
                                }
                            </div>
                        }
                    </div>
                </small>
            </div>
        </div>
    </div >
}

export default IdeaCard;
