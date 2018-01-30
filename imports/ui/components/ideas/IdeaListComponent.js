import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Alert, Button } from 'react-bootstrap';
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

class IdeasListComponent extends Component {

    state = {
        text: '',
        areaSelected: undefined,
        statesCodesSelected: [],
        showArea: true,
        showStates: false,
        showExcelButton: false,
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
                }
            })
        }, (dismiss) => {
            console.log(dismiss)
        })
    }

    selectState = state => e => {
        e.preventDefault();
        const { statesCodesFilter } = this.props;
        const statesCodes = statesCodesFilter.get()
        if (_.includes(statesCodes, state.code)) _.remove(statesCodes, code => code === state.code)
        else statesCodes.push(state.code);
        this.setState({ statesCodesSelected: statesCodes });
    }

    selectArea = area => {
        this.setState({ areaSelected: area });
        this.props.areasIdsFilter.set(area && area.family || [])
    }

    onChangeTextSearch = e => {
        e.preventDefault();
        const text = e.target.value;
        this.setState({ text })
    }

    showArea = e => {
        e.preventDefault();
        this.setState(prev => ({ showArea: true, showStates: false }));
    }

    showStates = e => {
        e.preventDefault();
        this.setState(prev => ({ showArea: false, showStates: true }));
    }

    search = () => {
        const { textSearch, statesCodesFilter, areasIdsFilter } = this.props
        const { text, areaSelected, statesCodesSelected } = this.state;
        textSearch.set(text);
        areasIdsFilter.set(areaSelected && areaSelected.family || [])
        statesCodesFilter.set(statesCodesSelected);
        this.setState({ showMore: true })
    }

    handleKeyPress = (event) => {
        if (event.key == 'Enter') {
            this.search();
        }
    }

    clear = () => {
        const { textSearch, statesCodesFilter, areasIdsFilter, ideasFindLimit } = this.props;
        this.setState({ text: '', statesCodesSelected: [] })
        textSearch.set('')
        statesCodesFilter.set([]);
        // areasIdsFilter.set([])
        // ideasFindLimit.set(5);
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

        const { history, ideas, ideasstates, showEdit, user, textSearch, ideasFindLimit } = this.props;
        const { stateSelected, areaSelected, statesCodesSelected, showExcelButton } = this.state;
        const { showFilters, showArea, showList, text, showStates } = this.state;

        const showMore = ideasFindLimit.get() === ideas.length
        console.log('showExcelButton 2', showExcelButton)

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

                <div className="show-filters">
                    {/* find input */}
                    <div className="panel panel-body">
                        <input type="search"
                            value={text}
                            onChange={this.onChangeTextSearch}
                            onKeyPress={this.handleKeyPress}
                            placeholder="Buscar por oportunidad, descripción o nombres"
                            className="form-control input-sm"
                        />
                    </div>
                    <div className="panel panel-body">

                        {/* <Button disabled={showArea} className={"btn btn-success btn-search " + (showArea ? '' : 'btn-trans')} onClick={this.showArea}>{areaSelected && <i className="fa fa-filter"></i>} Areas</Button> */}
                        <Button className={"btn btn-success btn-search " + (showArea ? '' : 'btn-trans')} onClick={this.showArea}>{areaSelected && <i className="fa fa-filter"></i>} Areas</Button>

                        {
                            showEdit && !Roles.userIsInRole(user && user._id, ['Employee']) &&
                            <Button className={"btn btn-success btn-search " + (showStates ? '' : 'btn-trans')} onClick={this.showStates}>{statesCodesSelected.length > 0 && <i className="fa fa-filter"></i>} Estados</Button>

                        }
                    </div>
                    <div className="panel panel-body">
                        {
                            showArea &&
                            <AreasSearch {...this.props} selectArea={this.selectArea} areaSelected={areaSelected} /> ||
                            (
                                showEdit &&
                                <StatesSearch stateSelected={stateSelected}
                                    removeStateFilter={this.removeStateFilter}
                                    selectState={this.selectState}
                                    ideasstates={ideasstates}
                                    statesCodesSelected={statesCodesSelected}
                                />
                            )
                        }
                    </div>
                    <div className="panel panel-body">
                        <Button className={"btn btn-success btn-search"} onClick={this.search}><i className="fa fa-search"></i> BUSCAR</Button>
                        <Button className={"btn btn-success btn-search"} onClick={this.clear}><i className="fa fa-ban"></i> LIMPIAR</Button>
                    </div>
                </div>
                <div>
                    {
                        ideas.length > 0 ?
                            <div>
                                <div className="row cards-container">
                                    {_.map(ideas, (idea, index) => {
                                        let lap = index / 2;
                                        return <IdeaCard key={index} idea={idea} lap={lap} handleRemove={this.handleRemove} showEdit={showEdit} />
                                    })}
                                </div>
                                {
                                    showMore &&
                                    <div className="row cards-container">
                                        <Button className={"btn btn-primary btn-search"} onClick={this.more}><i className="fa fa-bars"></i> ver más</Button>
                                    </div>
                                }

                            </div>
                            : <Alert bsStyle="warning">No se encontraron datos.</Alert>
                    }
                </div>

            </div >
        )
    }
}

IdeasListComponent.propTypes = {
    history: PropTypes.object,
    ideas: PropTypes.array,
    ideasstates: PropTypes.array,
};

export default IdeasListComponent;
