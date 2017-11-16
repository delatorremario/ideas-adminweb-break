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

import IdeaCard from './IdeaCardContainer';

import StatesSearch from './StatesSearch';

import AreasSearch from '../../containers/areas/AreasSearch';
import Areas from '../../../api/areas/areas';

class IdeasList extends Component {

    state = {
        areaSelected: undefined,
        textSearch: '',
        statesCodesSelected: []
    }


    componentWillMount() {
        // reactVars
        const { textSearch, statesCodesFilter, areasIdsFilter } = this.props;

        const { text, state, areaId } = this.props.params;

        // console.log('STATE', this.props.params && this.props.params.sate);

        if (text) textSearch.set(text.trim())
        if (state) statesCodesFilter.set([state.trim()])
        if (areaId) {
            const area = Areas.findOne(areaId);
            this.setState({ areaSelected: area });
            this.props.areasIdsFilter.set(area && area.family || [])
        }

        this.setState({ textSearch: textSearch.get() })
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
        this.setState({ statesCodesSelected: statesCodes });
        statesCodesFilter.set(statesCodes);

    }

    selectArea = area => {
        console.log('AREA', area);
        this.setState({ areaSelected: area });
        this.props.areasIdsFilter.set(area && area.family || [])

    }

    // removeStateFilter = e => {
    //     e.preventDefault();
    //     this.setState({ stateSelected: {} });
    //     this.props.stateFilter.set('')
    // }

    onChangeTextSearch = e => {
        e.preventDefault();
        const text = e.target.value;
        this.setState({ textSearch: text })
        this.props.textSearch.set(text);
    }

    render() {

        const { history, ideas, ideasstates } = this.props;
        const { areaId } = this.props.params;
        const { stateSelected, textSearch, areaSelected, statesCodesSelected } = this.state;

        console.log('this.state', this.state);

        return (
            <div>
                <div className="panel panel-body">
                    <div role="grid" id="example_wrapper" className="dataTables_wrapper form-inline no-footer">
                        <div className="row table-top">
                            <div className="col-fixed" style={{ width: "115px" }}>
                                <Link to="/ideas/new" className="btn btn-success"><i className="fa fa-plus"></i> Nuevo</Link>
                            </div>
                            <div className="col-flex smart-searcher-container">
                                <div id="example_filter" className="dataTables_filter">
                                    <input type="search" value={textSearch} onChange={this.onChangeTextSearch.bind(this)} placeholder="Buscar por palabras claves en oportunidad o descripción o nombres ..." className="form-control input-sm" aria-controls="example" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel panel-body">
                    <div className="row">

                        <div className="col-md-6"><AreasSearch {...this.props} selectArea={this.selectArea} /></div>

                        <div className="col-md-6">
                            <StatesSearch
                                stateSelected={stateSelected}
                                removeStateFilter={this.removeStateFilter}
                                selectState={this.selectState}
                                ideasstates={ideasstates}
                                statesCodesSelected={statesCodesSelected}
                            />
                        </div>
                    </div>

                </div>
                {
                    ideas.length > 0 ?
                        <div className="row cards-container">
                            {_.map(ideas, (idea, index) => {
                                let lap = index / 2;
                                return <IdeaCard key={index} idea={idea} lap={lap} handleRemove={this.handleRemove} />
                            })}
                        </div>
                        : <Alert bsStyle="warning">No ideas yet.</Alert>
                }

            </div>
        )
    }
}
IdeasList.propTypes = {
    history: PropTypes.object,
    ideas: PropTypes.array,
    ideasstates: PropTypes.array,
};

export default IdeasList;
