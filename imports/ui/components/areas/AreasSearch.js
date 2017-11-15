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
        const { textSearch, selectArea } = this.props;

        textSearch.set('');
        this.setState({ selected: undefined, text: '' })
        selectArea(undefined);
    }
    render() {
        const { selected, text } = this.state;
        const { areas, selectArea } = this.props;

        return <div>
                {
                    !selected &&
                    <div className="form-group">
                        <ControlLabel>Seleccione un Area</ControlLabel>
                        <input id="search" type="text" className="form-control" value={text} placeholder="Buscar por Nombre de Area" onChange={this.onChangeSearch.bind(this)} />
                    </div>
                }
                {
                    selected &&
                    <div >
                        <button className="btn btn-defualt btn-sm" onClick={this.removeFilter.bind(this)}>Quitar Filtro</button>
                        <div className="area-selected">
                            <h1>{selected.name}</h1>
                        </div>
                    </div>
                }

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
