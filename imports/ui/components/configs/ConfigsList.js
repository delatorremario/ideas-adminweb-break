import React, { PropTypes } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
// import $ from 'jquery';
// import swal from 'sweetalert2';

// import ideasstates from '../../../api/ideasStatesSchema/ideasstates';



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

const ConfigsList = ({ history, corporations, ideasstates }) => (
    <div>

        <div className="pageheader">
            <h1>Configuraciones</h1>
            <div className="breadcrumb-wrapper hidden-xs">
                <span className="label">You are here:</span>
                <ol className="breadcrumb">
                    <li className="active">Configuraciones</li>
                </ol>
            </div>
        </div>

        <div className='config-list'>
            <div className="configs-head">
                <h2>Estados de Ideas</h2>
            </div>
            {
                _.map(ideasstates, (state, index) =>
                    <div className='configs-row' key={index}>
                        <div className='state-color' style={{ backgroundColor: state.color }} ></div>
                        <div className='state-step'>{state.step} {state.state}</div>
                        <div className="state-select" >
                            <Toggle
                                id='state-select'
                                checked={state.showInDashboard}
                            // onChange={this.handleCheeseChange}
                            />
                        </div>
                        <div className="state-config">
                            <Link to={`/config/${state._id}/edit`} className="btn btn-default btn-sm btn-trans"><i className="fa fa-cog"></i></Link>
                        </div>
                    </div>
                )
            }
        </div>
    </div>
);

ConfigsList.propTypes = {
    // history: PropTypes.object,
    // corporations: PropTypes.array,
};

export default ConfigsList;
