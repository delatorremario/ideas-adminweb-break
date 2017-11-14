import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { ControlLabel } from 'react-bootstrap';


class AreasSearch extends Component {

    state = {
        selected: undefined,
        text: '',
    }

    onChangeSearch = e => {
        e.preventDefault();
        const text = e.target.value;
        this.props.textSearch.set(text);
        this.setState({ text: text })
    }

    select = select => e => {
        e.preventDefault();
        this.setState({ selected: select });
        this.props.selectArea(select);
    }
    removeFilter = e => {
        e.preventDefault()
        this.props.textSearch.set('');
        this.setState({ selected: undefined, text: '' })
        this.props.selectArea(undefined);
    }
    render() {
        const { selected, text } = this.state;
        const { areas, selectArea } = this.props;

        return <div className="col-xs-12">
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <ControlLabel>Seleccione un Area</ControlLabel>
                        <input id="search" type="text" className="form-control" value={text} placeholder="Buscar por Nombre de Area" onChange={this.onChangeSearch.bind(this)} />
                    </div>
                </div>

                {
                    selected &&
                    <div className="panel panel-body">
                        <div role="grid" id="example_wrapper" className="dataTables_wrapper form-inline no-footer">
                            <div className="row table-top">
                                <div className="col-fixed" style={{ width: "115px" }}>
                                    <button className="btn btn-defualt btn-sm" onClick={this.removeFilter.bind(this)}>Quitar Filtro</button>
                                </div>
                                <div className="col-flex smart-searcher-container">
                                    <div className="well">
                                        <h1>{selected.name}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

            </div>

            {
                !selected && areas && <div className="form-group">
                    {/* <label className="col-md-10 control-label">Seleccione una Persona para continuar</label> */}
                    <div className="card" style={{ marginTop: "25px" }}>
                        <ul className="list-group list-group-flush">
                            {
                                _.map(areas, (area, index) => (
                                    <li key={index} className="list-group-item" onClick={this.select(area).bind(this)}>
                                        {area.name}
                                    </li>))
                            }
                        </ul>
                    </div>
                </div>
            }
        </div>
    }
}

AreasSearch.propTypes = {
    selectArea: PropTypes.func.isRequired,
    areas: PropTypes.arrayOf(PropTypes.shape()).isRequired
}

export default AreasSearch;
