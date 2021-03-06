import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Alert } from 'react-bootstrap';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import { removeIdea } from '../../../api/ideas/methods';
import $ from 'jquery';
import swal from 'sweetalert2';
import _ from 'lodash';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Roles } from 'meteor/alanning:roles';


import IdeaCard from './IdeaCardContainer';
import StatesSearch from './StatesSearch';
import AreasSearch from '../../containers/areas/AreasSearch';
import Areas from '../../../api/areas/areas';
import IdeasTableForExcelContainer from './IdeasTableForExcelContainer';

class IdeasListFilter extends Component {

    state = {
        showExcelButton: false
    }

    handleNav = (history, _id) => {
        history.push(`/idea/${_id}`)
    }

    handleRemove = (_id) => e => {
        e.preventDefault()
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
                    // history.push('/ideas') // NO SE DEBE LLAMAR NUEVAMENTE A LA RUTA YA QUE ES LOS DATOS SON REACTIVOS
                }
            })
        }, (dismiss) => {
            console.log(dismiss)
        })
    }
    more = () => {
        const { ideasFindLimit, ideas } = this.props;
        ideasFindLimit.set(ideasFindLimit.get() + 5)
        //this.setState({ showMore: (ideasFindLimit.get() === ideas.length + 5) })
    }

    showDownloadExcel = () => {
        const { ideasFindLimit } = this.props;
        ideasFindLimit.set(0)

        // swal({
        //     position: 'top-end',
        //     // type: 'success',
        //     title: 'Preparando la información...',
        //     showConfirmButton: false,
        //     timer: 10000,
        //     onOpen: () => {
        //         swal.showLoading()
        //     }
        // })
        this.setState(prev => ({ showExcelButton: !prev.showExcelButton }))
    }

    render() {

        const { history, ideas, ideasstates, showEdit, user, remove, ideasFindLimit } = this.props;
        // const { areaId } = this.props.params;
        const { stateSelected, textSearch, areaSelected, statesCodesSelected, showExcelButton } = this.state;
        const { showFilters, showArea, showList } = this.state;

        const showMore = ideasFindLimit.get() === ideas.length + 5
        console.log('showExcelButton', showExcelButton)
        return (
            <div className='ideas-list'>
                <IdeasTableForExcelContainer ideas={ideas} />
                <div className="panel panel-body">
                    <div className="ideas-buttons">
                        <Link to="/ideas/new_user" className="btn btn-success btn-trans btn-action ideas-button">
                            <i className="fa fa-lightbulb-o"></i>
                        </Link>
                        {
                            !Roles.userIsInRole(user && user._id, ['Employee']) &&
                            <Link to="/ideas/new" className="btn btn-success btn-trans btn-action ideas-button">
                                <i className="fa fa-hand-peace-o"></i>
                            </Link>
                        }
                        <Link className="btn btn-success btn-action ideas-button btn-trans" to='/ideas/find'>
                            <i className="fa fa-search"></i>
                        </Link>
                        {
                            showEdit && !showExcelButton &&
                            <button className="btn btn-success btn-trans btn-action btn-ideas-excel ideas-button"
                                onClick={this.showDownloadExcel}>
                                <i className="fa fa-download"></i>
                            </button> ||
                            <ReactHTMLTableToExcel
                                id="ideas-xls-button"
                                className="btn btn-success btn-trans btn-action btn-ideas-excel ideas-button"
                                table="ideas-to-xls"
                                filename={"ideas-" + new Date().toLocaleDateString()}
                                sheet="ideas"
                                buttonText="xls" />
                        }
                    </div>
                </div>

                <div>
                    {
                        ideas.length > 0 ?
                            <div className="row cards-container">
                                {_.map(ideas, (idea, index) => {
                                    let lap = index / 2;
                                    return <IdeaCard key={index} idea={idea} lap={lap} handleRemove={this.handleRemove} showEdit={showEdit} />
                                })}
                                {
                                    showMore &&
                                    <Button className={"btn btn-primary btn-search"} onClick={this.more}><i className="fa fa-bars"></i> ver más</Button>
                                }
                            </div>
                            : <Alert bsStyle="warning">No se encontraron datos.</Alert>
                    }
                </div>


            </div >
        )
    }
}
IdeasListFilter.propTypes = {
    history: PropTypes.object,
    ideas: PropTypes.array,
};

export default IdeasListFilter;
