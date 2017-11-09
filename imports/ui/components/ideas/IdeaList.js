import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Alert } from 'react-bootstrap';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import { removeIdea } from '../../../api/ideas/methods';
import $ from 'jquery';
import swal from 'sweetalert2';
import _ from 'lodash';

import IdeaCard from './IdeaCard';

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

        

        {
            ideas.length > 0 ?
                <div className="row cards-container">
                    {_.map(ideas, (idea, index) => {
                        let lap = index / 2;
                        return <IdeaCard key={index} idea={idea} lap={lap} />
                    })}
                </div>
                : <Alert bsStyle="warning">No ideas yet.</Alert>
        }

    </div>
);

IdeasList.propTypes = {
    history: PropTypes.object,
    ideas: PropTypes.array,
};

export default IdeasList;
