import React, { PropTypes } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import { removeIdea } from '../../../api/ideas/methods';
import $ from 'jquery';
import swal from 'sweetalert2';
import moment from 'moment';

const handleNav = (history, _id) => {
    history.push(`/idea/${_id}`)
}

const handleRemove = (history, _id) => {
    swal({
        title: 'Eliminar Datos',
        text: "La eliminación de los datos es permanente. ¿Está seguro que desea continuar?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
    }).then(() => {
        removeIdea.call({ _id }, (error) => {
            if (error) {
                Bert.alert(error.reason, 'danger')
            } else {
                Bert.alert('Datos eliminados', 'success')
                history.push('/ideas')
            }
        })
    }, (dismiss) => {
        console.log(dismiss)
    })
}

const IdeasList = ({ history, ideas }) => (
    <div>
        {/* <div className="panel panel-body">
            <div role="grid" id="example_wrapper" className="dataTables_wrapper form-inline no-footer">
                <div className="row table-top">
                    <div className="col-fixed" style={{ width: "115px" }}>
                        <Link to="/ideas/new" className="btn btn-success"><i className="fa fa-plus"></i> Nuevo</Link>
                    </div>
                    <div className="col-flex smart-searcher-container">
                        <div id="example_filter" className="dataTables_filter">
                            <input type="search" placeholder="Buscar..." className="form-control input-sm" aria-controls="example" />
                        </div>
                    </div>
                </div>
            </div>
        </div> */}


        {/* --- tabla ---*/}
        <div className="panel-body">
            <div role="grid" id="example_wrapper" className="dataTables_wrapper form-inline no-footer">
                <div className="row table-top">
                    <div className="col-fixed" style={{ width: "120px" }}>
                        <Link to="/ideas/new" className="btn btn-success"><i className="fa fa-plus"></i> Nuevo</Link>
                    </div>
                    <div className="col-fixed">
                        <div className="dataTables_length" id="example_length">
                            <label>
                                <select name="example_length" aria-controls="example" className="form-control input-sm">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select> Registros por página
                        </label>
                        </div>
                    </div>
                    <div className="col-flex smart-searcher-container">
                        <div id="example_filter" className="dataTables_filter">
                            <input type="search" placeholder="Buscar..." className="form-control input-sm" aria-controls="example" />
                        </div>
                    </div>
                </div>
                {ideas.length > 0 ?
                    <table id="corporationsList" className="table table-striped table-bordered dataTable no-footer" cellSpacing="0" width="100%" aria-describedby="example_info" style={{ width: "100%" }}>
                        <thead>
                            <tr role="row">
                                <th className="sorting_asc" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-sort="ascending" aria-label="Nombre: activate to sort column ascending" style={{ width: "130px" }}>Nombre</th>
                                <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Emails: activate to sort column ascending">Administradores</th>
                                <th className="sorting actions" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1">Acciones</th>
                            </tr>
                        </thead>

                        <tbody>

                            {_.map(ideas, (idea, index) => {
                                let lap = index / 2;
                                return (
                                    <tr key={idea._id} className={lap !== 0 ? "odd" : "even"}>
                                        <td className="sorting_1">{idea.name}</td>
                                        <td className="actions">
                                            <Link to={`/corporation/${idea._id}/edit`} className="btn btn-primary"><i className="fa fa-pencil"></i></Link>
                                            <Button onClick={() => { handleRemove(history, idea._id) }}><i className="fa fa-trash"></i></Button>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                    : <Alert bsStyle="warning">No ideas yet.</Alert>}
            </div>
        </div>
        {/* ---- tabla ----*/}



        {/*
            ideas.length > 0 ?
            <div className="row cards-container">
                {ideas.map((idea, index) => {
                    let lap = index / 2;
                    const { person, chief, description, opportunity, collaborators, drivers, origin, createdAt } = idea;
                    console.log('created', createdAt);
                    return (
                        <div key={index} className="col-sm-6 col-lg-4 cards-item">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="panel-title">{person.lastName}</h3>
                                    <div className="actions pull-right">
                                        <Link to={`/idea/${idea._id}/edit`}><i className="fa fa-pencil"></i></Link>
                                        <i className="fa fa-trash" onClick={() => { handleRemove(history, idea._id) }}></i>
                                    </div>
                                </div>
                                <div className="row panel-body">
                                    <p className="col-md-12 panel-body-title">
                                        <i className="fa fa-user"></i> Idea de <b>{person.firstName} {person.secondName} {person.lastName}</b>
                                    </p>
                                    <div className="col-md-12 panel-body-description">
                                        <p>Creada el: <b></b></p>
                                        <p>Encargado de Area: <b>{chief.firstName} {chief.secondName} {chief.lastName}</b></p>
                                        <p>Descripción: <b>{description}</b></p>
                                        <p>Oportunidad: <b>{opportunity}</b></p>
                                        <p>Origin: <b>{origin}</b></p>
                                        <p>Drivers:</p>
                                        {
                                            _.map(drivers, (driver, index) =>
                                                <div key={index}>{driver}</div>
                                            )
                                        }

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
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            : <Alert bsStyle="warning">No ideas yet.</Alert>
            */}

    </div>
);

IdeasList.propTypes = {
    history: PropTypes.object,
    ideas: PropTypes.array,
};

export default IdeasList;
