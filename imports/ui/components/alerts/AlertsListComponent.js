import React, { PropTypes } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import $ from 'jquery';
import swal from 'sweetalert2';
import Moment from 'moment';
import { removeAlert } from '../../../api/alerts/methods';

const handleRemove = _id => {
    swal({
        title: 'Eliminar Datos',
        text: "La eliminación de los datos es permanente. ¿Está seguro que desea continuar?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
    }).then(() => {
        removeAlert.call({ _id }, (error) => {
            if (error) {
                Bert.alert(error.reason, 'danger')
            } else {
                Bert.alert('Datos eliminados', 'success')
            }
        })
    }, (dismiss) => {
        console.log(dismiss)
    })
}

const setOpened = not => {
    Meteor.call('alerts.setOpened', not, (err, res) => {
        if (err) {
            Bert.alert("Se produjo un error al abrir la notificación: " + err.message, 'danger');
        }
    })
};

const CorporationsList = ({ match, alerts }) => (
    <div>
        {alerts.length > 0 ?
            <div className="row cards-container">
                {
                    alerts.map(not => {
                        return (
                            <div key={not._id} className="col-sm-6 col-lg-4 cards-item">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h3 className="panel-title col-flex" style={{ zoom: 0.8 }}>
                                            {not.body.title}
                                            {
                                                not.state === "new" && <i>&nbsp;</i>
                                            }
                                            {
                                                not.state === "new" &&
                                                <span className="badge badge-danger" style={{ fontSize: '0.7em', marginTop: '-5px', backgroundColor: '#2c5694' }}>
                                                    nuevo!
                                                </span>
                                            }
                                        </h3>
                                        <div className="actions col-fixed righty">
                                            <i className="fa fa-trash righty" onClick={() => { handleRemove(not._id) }}></i>
                                        </div>
                                    </div>
                                    <Link to={not.path} onClick={() => { setOpened(not) }} >
                                        <div className="row panel-body">
                                            <p className="col-md-12 panel-body-title">
                                                <i className="fa fa-calendar"></i>
                                                &nbsp;
                                                <b>Fecha</b>
                                            </p>
                                            <div className="col-md-12 panel-body-description">
                                                <p className="col-md-12">{Moment(not.createdAt).format("DD/MM/YYYY HH:mm")}</p>
                                            </div>
                                            <p className="col-md-12 panel-body-title">
                                                <i className="fa fa-commenting"></i>
                                                &nbsp;
                                                <b>Mensaje</b>
                                            </p>
                                            <div className="col-md-12 panel-body-description">
                                                <p className="col-md-12">{not.body.message}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            : <Alert bsStyle="warning">Sin alertas.</Alert>}
    </div>
);

CorporationsList.propTypes = {
    match: PropTypes.object,
    notifications: PropTypes.array,
};

export default CorporationsList;
