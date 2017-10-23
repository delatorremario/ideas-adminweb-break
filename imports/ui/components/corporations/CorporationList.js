import React, { PropTypes } from 'react';
import { Alert, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Bert } from 'meteor/themeteorchef:bert'
import { removeCorporation } from '../../../api/corporations/methods'
import $ from 'jquery'
import swal from 'sweetalert2'

const handleNav = (history, _id) => {
    history.push(`/corporation/${_id}`)
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
        removeCorporation.call({ _id }, (error) => {
            if (error) {
                Bert.alert(error.reason, 'danger')
            } else {
                Bert.alert('Datos eliminados', 'success')
                history.push('/corporations')
            }
        })
    }, (dismiss) => {
        console.log(dismiss)
    })
}

const CorporationsList = ({ history, corporations }) => (
    <div>
        <div className="panel panel-body">
            <div role="grid" id="example_wrapper" className="dataTables_wrapper form-inline no-footer">
                <div className="row table-top">
                    <div className="col-fixed" style={{ width: "115px" }}>
                        <Link to="/corporations/new" className="btn btn-success"><i className="fa fa-plus"></i> Nuevo</Link>
                    </div>
                    <div className="col-flex smart-searcher-container">
                        <div id="example_filter" className="dataTables_filter">
                            <input type="search" placeholder="Buscar..." className="form-control input-sm" aria-controls="example" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {corporations.length > 0 ?
            <div className="row cards-container">
                {corporations.map((corp, index) => {
                    let lap = index / 2;

                    return (
                        <div key={index} className="col-sm-6 col-lg-4 cards-item">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="panel-title">{corp.name}</h3>
                                    <div className="actions pull-right">
                                        <Link to={`/corporation/${corp._id}/edit`}><i className="fa fa-pencil"></i></Link>
                                        <i className="fa fa-trash" onClick={() => { handleRemove(history, corp._id) }}></i>
                                    </div>
                                </div>
                                <div className="row panel-body">
                                    <p className="col-md-12 panel-body-title"><i className="fa fa-user"></i><b>Administradores</b></p>
                                    <div className="col-md-12 panel-body-description">
                                        <ul className="panel-list">
                                            {corp.adminsEmails.map((email, index) => (<li key={index}> {email} </li>))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            : <Alert bsStyle="warning">No corporations yet.</Alert>}
    </div>
);

CorporationsList.propTypes = {
    history: PropTypes.object,
    corporations: PropTypes.array,
};

export default CorporationsList;
