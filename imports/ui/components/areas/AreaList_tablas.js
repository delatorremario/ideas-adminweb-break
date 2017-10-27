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
    }).then( () => {
        removeCorporation.call({ _id }, (error) => {
            if (error) {
                Bert.alert(error.reason, 'danger')
            } else {
                Bert.alert('Datos eliminados', 'success')
                history.push('/corporations')
            }
        })
    }
    ,
     (dismiss) => {console.log(dismiss)}
)
}

const CorporationsList = ({ history, corporations }) => (
    <div className="panel-body">
        <div role="grid" id="example_wrapper" className="dataTables_wrapper form-inline no-footer">
            <div className="row table-top">
                <div className="col-fixed" style={{ width: "120px" }}>
                    <Link to="/corporations/new" className="btn btn-success"><i className="fa fa-plus"></i> Nuevo</Link>
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
            {corporations.length > 0 ?
                <table id="corporationsList" className="table table-striped table-bordered dataTable no-footer" cellSpacing="0" width="100%" aria-describedby="example_info" style={{ width: "100%" }}>
                    <thead>
                        <tr role="row">
                            <th className="sorting_asc" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-sort="ascending" aria-label="Nombre: activate to sort column ascending" style={{ width: "130px" }}>Nombre</th>
                            <th className="sorting" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1" aria-label="Emails: activate to sort column ascending">Administradores</th>
                            <th className="sorting actions" tabIndex="0" aria-controls="example" rowSpan="1" colSpan="1">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>

                        {corporations.map((corp, index) => {
                            let lap = index / 2;
                            return (
                                <tr key={corp._id} className={lap !== 0 ? "odd" : "even"}>
                                    <td className="sorting_1">{corp.name}</td>
                                    <td>{corp.adminsEmails.map((email, index) => (<span key={index} className="main-label"> {email} </span>))}</td>
                                    <td className="actions">
                                        <Link to={`/corporation/${corp._id}/edit`} className="btn btn-primary"><i className="fa fa-pencil"></i></Link>
                                        <Button onClick={() => { handleRemove(history, corp._id) }}><i className="fa fa-trash"></i></Button>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
                : <Alert bsStyle="warning">No corporations yet.</Alert>}
        </div>
    </div>
);

CorporationsList.propTypes = {
    history: PropTypes.object,
    corporations: PropTypes.array,
};

export default CorporationsList;
