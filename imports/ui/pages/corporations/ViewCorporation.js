import React, { PropTypes } from 'react'
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Bert } from 'meteor/themeteorchef:bert'
import { removeCorporation } from '../../../api/corporations/methods'
import NotFound from '../NotFound'
import swal from 'sweetalert2'

const handleEdit = (history, _id) => {
    history.push(`/corporations/${_id}/edit`)
};

const ViewCorporation = ({ doc, history }) => {
    return doc ? (
        <div>
            <div className="pageheader">
                <h1>{doc && doc.name}</h1>

                <div className="breadcrumb-wrapper hidden-xs">
                    <span className="label">Estás aquí:</span>
                    <ol className="breadcrumb">
                        <li>
                            <Link to="/">Corporación</Link>
                        </li>
                        <li>Ver</li>
                        <li className="active">{doc && doc.name}</li>
                    </ol>
                </div>
            </div>
            <section id="main-content">
                <div className="row">
                    <div className="col-md-12 col-lg-12">
                        <div className="panel">
                            <div className="panel-body ng-binding">

                                <ButtonToolbar className="pull-right">
                                    <ButtonGroup bsSize="small">
                                        <Button
                                            onClick={() => handleEdit(history, doc._id)}
                                        >Editar</Button>
                                        <Button
                                            onClick={() => handleRemove(history, doc._id)}
                                            className="text-danger"
                                        >Eliminar</Button>
                                    </ButtonGroup>
                                </ButtonToolbar>

                                <div>
                                    {doc && doc.adminEmail}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    ) : <NotFound />;
};

ViewCorporation.propTypes = {
    doc: PropTypes.object,
    history: PropTypes.object,
}

export default ViewCorporation;