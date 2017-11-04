import React, { PropTypes } from 'react';
import { Alert, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Bert } from 'meteor/themeteorchef:bert'
import { removeIdea } from '../../../api/ideas/methods'
import $ from 'jquery'
import swal from 'sweetalert2'

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
        <div className="panel panel-body">
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
        </div>

        {ideas.length > 0 ?
            <div className="row cards-container">
                {ideas.map((idea, index) => {
                    let lap = index / 2;

                    return (
                        <div key={index} className="col-sm-6 col-lg-4 cards-item">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="panel-title">{idea.origin}</h3>
                                    <div className="actions pull-right">
                                        <Link to={`/idea/${idea._id}/edit`}><i className="fa fa-pencil"></i></Link>
                                        <i className="fa fa-trash" onClick={() => { handleRemove(history, idea._id) }}></i>
                                    </div>
                                </div>
                                {/* <div className="row panel-body">
                                    <p className="col-md-12 panel-body-title"><i className="fa fa-user"></i><b>Administradores</b></p>
                                    <div className="col-md-12 panel-body-description">
                                        <ul className="panel-list">
                                            {idea.adminsEmails.map((email, index) => (<li key={index}> {email} </li>))}
                                        </ul>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    )
                })}
            </div>
            : <Alert bsStyle="warning">No ideas yet.</Alert>}
    </div>
);

IdeasList.propTypes = {
    history: PropTypes.object,
    ideas: PropTypes.array,
};

export default IdeasList;
