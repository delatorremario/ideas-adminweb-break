import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { ControlLabel } from 'react-bootstrap';


class AreasSearch extends Component {

    state = {}

    onChangeSearch = e =>{
        e.preventDefault();
        const text = e.target.value;
        this.props.textSearch.set(text);
    }

    render() {
        const { areas , selectArea} = this.props;
        // console.log('AREAS', areas);
        return <div className="col-xs-12">
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <ControlLabel>Seleccione un Area</ControlLabel>
                        <i className="fa fa-user"></i>
                        <input id="search" type="text" className="form-control" placeholder="Buscar por Nombre de Area" onChange={this.onChangeSearch.bind(this)} />
                    </div>
                </div>
                {
                    areas && <div className="form-group">
                        {/* <label className="col-md-10 control-label">Seleccione una Persona para continuar</label> */}
                        <div className="col-md-6">
                            <div className="card" style={{ marginTop: "25px" }}>
                                <ul className="list-group list-group-flush">
                                    {
                                        _.map(areas, (area, index) => (
                                            <li key={index} className="list-group-item" onClick={selectArea(area).bind(this)}>
                                                {area.name}
                                            </li>))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    }
}

AreasSearch.propTypes = {
    selectArea: PropTypes.func.isRequired,
    areas: PropTypes.arrayOf(PropTypes.shape()).isRequired
}

export default AreasSearch;
