import React, { PropTypes } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import { removeArea } from '../../../api/areas/methods';
import $ from 'jquery';
import swal from 'sweetalert2';

const handleNav = (history, _id) => {
    history.push(`/area/${_id}`)
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
        removeArea.call({ _id }, (error) => {
            if (error) {
                Bert.alert(error.reason, 'danger')
            } else {
                Bert.alert('Datos eliminados', 'success')
                history.push('/areas')
            }
        })
    }, (dismiss) => {
        console.log(dismiss)
    })
}

const AreasList = ({ history, areas, typesAreaStructure }) => (
    <div className='pageWrapper'>
        <div className="panel panel-body">
            <div role="grid" id="example_wrapper" className="dataTables_wrapper form-inline no-footer">
                <div className="row table-top">
                    <div className="col-fixed" style={{ width: "115px" }}>
                        <Link to="/areas/new" className="btn btn-success"><i className="fa fa-plus"></i> Nuevo</Link>
                    </div>
                    <div className="col-flex smart-searcher-container">
                        <div id="example_filter" className="dataTables_filter">
                            <input type="search" placeholder="Buscar..." className="form-control input-sm" aria-controls="example" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        types:
        {
            typesAreaStructure.map((type, index) => {
                return <div> type: {type.name}</div>;
            })
        }

        { 
            areas.length > 0 ? <div className="row cards-container">
                {areas.map((area, index) => {
                    return (
                        <div key={index} className="col-sm-6 col-lg-4 cards-item">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="panel-title">{area.name}</h3>
                                    <div className="actions pull-right">
                                        <Link to={`/area/${area._id}/edit`}><i className="fa fa-pencil"></i></Link>
                                        <i className="fa fa-trash" onClick={() => { handleRemove(history, area._id); }}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            : <Alert bsStyle="warning">No areas yet.</Alert>
            
            }
    </div>
);

AreasList.propTypes = {
    history: PropTypes.object.isRequired,
    areas: PropTypes.array.isRequired,
    typesAreaStructure: PropTypes.array.isRequired,
};

export default AreasList;
