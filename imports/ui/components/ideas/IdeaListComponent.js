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
        // showFilters: false,
        showArea: true,
        showMore: true,
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

    selectState = state => e => {
        e.preventDefault();
        const { statesCodesFilter } = this.props;
        const statesCodes = statesCodesFilter.get()
        if (_.includes(statesCodes, state.code)) _.remove(statesCodes, code => code === state.code)
        else statesCodes.push(state.code);
        this.setState({ statesCodesSelected: statesCodes, showList: false, });
        statesCodesFilter.set(statesCodes);
    }

    selectArea = area => {
        this.setState({ areaSelected: area, showList: false });
        this.props.areasIdsFilter.set(area && area.family || [])
    }

    onChangeTextSearch = e => {
        e.preventDefault();
        const text = e.target.value;
        console.log('text', text);
        this.setState({ text })
        //this.props.textSearch.set(text);
    }

    showFilters = e => {
        e.preventDefault();
        const { showFilters } = this.state;
        const { textSearch, statesCodesFilter, areasIdsFilter } = this.props
        if (showFilters) {

            const { text, stateCode, areaId } = this.props.params;

            textSearch.set('');
            statesCodesFilter.set([]);
            areasIdsFilter.set([]);
            this.setState({
                areaSelected: undefined,
                textSearch: '',
                statesCodesSelected: [],
            })

            if (text && stateCode && areaId) {
                this.props.history.push('/my-ideas');
                console.log('history');
            }
        }

        this.setState(prev => ({ showFilters: !prev.showFilters, showList: prev.showFilters }));

    }

    showArea = e => {
        e.preventDefault();
        this.setState(prev => ({ showArea: !prev.showArea }));
    }

    // showList = e => {
    //     e.preventDefault();
    //     this.setState(prev => ({ showList: true }));
    // }

    search = () => {
        const { textSearch, statesCodesFilter, areasIdsFilter } = this.props
        const { text } = this.state;
        textSearch.set(text);
        this.setState({ showMore: true })
        
    }
    handleKeyPress = (event) => {
        if (event.key == 'Enter') {
            console.log('enter press here! ')
            this.search();
        }
    }
    clear = () => {
        const { textSearch } = this.props;
        this.setState({ text: '' })
        textSearch.set('')
    }
    more = () => {
        const { ideasFindLimit, ideas } = this.props;

        // console.log(ideasFindLimit.get(), ideas.length);
        ideasFindLimit.set(ideasFindLimit.get() + 5)
        // console.log(ideasFindLimit.get(), ideas.length, ideas.length);
        this.setState({ showMore: (ideasFindLimit.get() === ideas.length + 5 ) })
    }
    render() {

        const { history, ideas, ideasstates, showEdit, user, textSearch } = this.props;
        // const text = textSearch.get();
        // const { areaId } = this.props.params;
        const { stateSelected, areaSelected, statesCodesSelected } = this.state;
        const { showFilters, showArea, showList, text, showMore } = this.state;


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
                        {/* {<div className={"btn btn-success btn-action ideas-button " + (showFilters ? 'active' : 'btn-trans')} onClick={this.showFilters}>
                            <i className={"fa " + (showFilters && "fa-ban" || "fa-filter")}></i>
                        </div>} */}
                        {/* <Button className="btn btn-success btn-action ideas-button btn-trans fa fa-ban" onClick={this.clear.bind(this)}></Button> */}
                        {showEdit && <ReactHTMLTableToExcel
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
                    {/* <div className="panel panel-body panel-tabs">
                        {
                            showEdit && <div>
                                <button disabled={showArea} className={"btn btn-success btn-action " + (showArea ? 'active' : 'btn-trans')} onClick={this.showArea}>{areaSelected && <i className="fa fa-filter"></i>} Areas</button>
                                <button disabled={!showArea} className={"btn btn-success btn-action " + (!showArea ? 'active' : 'btn-trans')} onClick={this.showArea}>{statesCodesSelected.length > 0 && <i className="fa fa-filter"></i>} Estados</button>
                            </div>
                        }
                    </div> */}
                    {/* <div className="panel panel-body">
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
                    </div> */}
                    <div className="panel panel-body">
                        <Button className={"btn btn-success btn-search"} onClick={this.search}><i className="fa fa-search"></i> BUSCAR</Button>
                        <Button className={"btn btn-success btn-search"} onClick={this.clear}><i className="fa fa-ban"></i> LIMPIAR</Button>
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
IdeasListComponent.propTypes = {
    history: PropTypes.object,
    ideas: PropTypes.array,
    ideasstates: PropTypes.array,
};

export default IdeasListComponent;
