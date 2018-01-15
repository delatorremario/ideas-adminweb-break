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

class MyIdeasList extends Component {

    state = {
        areaSelected: undefined,
        textSearch: '',
        statesCodesSelected: [],
        showFilters: false,
        showArea: true,
        showList: true,
    }

    // componentWillMount() {
    //     // reactVars
    //     const { textSearch, statesCodesFilter, areasIdsFilter } = this.props;

    //     const { text, stateCode, areaId } = this.props.params;

    //     if (text) {
    //         textSearch.set(text.trim());
    //         this.setState({ showFilters: true })
    //     }
    //     if (stateCode) {
    //         statesCodesFilter.set([stateCode.trim()]);
    //         this.setState({ statesCodesSelected: [stateCode.trim()], showFilters: true })
    //     }
    //     if (areaId) {
    //         const area = Areas.findOne(areaId);
    //         this.setState({ areaSelected: area, showFilters: true });
    //         this.props.areasIdsFilter.set(area && area.family || [])
    //     }

    //     if (!text && !stateCode && !areaId) this.setState({ showFilters: false });

    //     this.setState({ textSearch: textSearch.get() })
    // }

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
        this.setState({ textSearch: text })
        this.props.textSearch.set(text);
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
                this.props.history.push('/ideas/find/true');
                console.log('history');
            }
        }

        this.setState(prev => ({ showFilters: !prev.showFilters, showList: prev.showFilters }));

    }

    showArea = e => {
        e.preventDefault();
        this.setState(prev => ({ showArea: !prev.showArea }));
    }

    showList = e => {
        e.preventDefault();
        this.setState(prev => ({ showList: true }));
    }

    render() {

        const { history, ideas, ideasstates, showEdit, user, remove } = this.props;
        //const { areaId } = this.props.params;
        // const { stateSelected, textSearch, areaSelected, statesCodesSelected } = this.state;
        // const { showFilters, showArea, showList } = this.state;

        console.log('IDEAS', ideas);

        return (
            <div className='ideas-list'>
                {/* <IdeasTableForExcelContainer ideas={ideas} />*/}
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



                <div>
                    {
                        ideas &&
                        <div className="row cards-container">
                            {_.map(ideas, (idea, index) => {
                                let lap = index / 2;
                                return <IdeaCard key={index} idea={idea} lap={lap} handleRemove={this.handleRemove} showEdit={showEdit} />
                            })}
                        </div>
                        || <Alert bsStyle="warning">No se encontraron datos.</Alert>
                    }
                </div>


            </div >
        )
    }
}
MyIdeasList.propTypes = {
    ideas: PropTypes.array,
};

export default MyIdeasList;
