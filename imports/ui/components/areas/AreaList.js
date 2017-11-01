import React, { PropTypes } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import { removeArea } from '../../../api/areas/methods';
import $ from 'jquery';
import swal from 'sweetalert2';

import { Treebeard } from 'react-treebeard';

import * as filters from './filter';





// Example: Customising The Header Decorator To Include Icons
// decorators.Header = ({style, node}) => {
//     const iconType = node.children ? 'folder' : 'file-text';
//     const iconClass = `fa fa-${iconType}`;
//     const iconStyle = {marginRight: '5px'};

//     return (
//         <div style={style.base}>
//             <div style={style.title}>
//                 <i className={iconClass} style={iconStyle}/>

//                 {node.name}
//             </div>
//         </div>
//     );
// };




// ({ history, areas, typesAreaStructure }) =>
export default class AreasList extends React.Component {

    state = {
        data: [

        ],
        cursor: undefined
    }


    componentWillMount() {
        const { areas } = this.props;
        const initialnode = {
            name: 'Areas',
            toggled: true,
            children: areas
        }
        this.setState({ data: initialnode, initialnode });
    }


    handleNav(history, _id) {
        history.push(`/area/${_id}`)
    }

    handleRemove(history, _id) {
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

    onToggle(node, toggled) {

        const { cursor } = this.state

        if (cursor) { cursor.active = false; }
        node.active = true;
        if (node.children) { node.toggled = toggled; }
        this.setState({ cursor: node });
    };

    onFilterMouseUp(e) {
        e.preventDefault();

        const filter = e.target.value.trim();
        const { initialnode } = this.state;

        if (!!filter) {
            var filtered = filters.filterTree(initialnode, filter);
            filtered = filters.expandFilteredNodes(filtered, filter);
            this.setState({ data: filtered });
        } else {
            this.setState((prev) => {
                return { data: prev.initialnode };
            })
        }
    };

    render() {
        const { data } = this.state;
        const { history } = this.props;

        return (
            <div className='pageWrapper' >
                <div className="panel panel-body">
                    <div role="grid" id="example_wrapper" className="dataTables_wrapper form-inline no-footer">
                        <div className="row table-top">
                            <div className="col-fixed" style={{ width: "115px" }}>
                                {/* <Link to="/areas/new" className="btn btn-success"><i className="fa fa-plus"></i> Nuevo</Link> */}
                            </div>
                            <div className="col-flex smart-searcher-container">
                                <div id="example_filter" className="dataTables_filter">
                                    <input type="search" className="form-control input-md"
                                        onKeyUp={this.onFilterMouseUp.bind(this)}
                                        placeholder="Buscar..."
                                        type="text"
                                        aria-controls="example" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Treebeard
                    data={data}
                    onToggle={this.onToggle.bind(this)}
                />

                {/*
                        areas.length > 0 ? <div className="row cards-container">
                            {
                                areas.map((area, index) => {
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
                                })
                            }
                        </div>
                            : <Alert bsStyle="warning">No areas yet.</Alert>

                        */}
            </div>
        );
    }
}

AreasList.propTypes = {
    history: PropTypes.object.isRequired,
    areas: PropTypes.array.isRequired,
};