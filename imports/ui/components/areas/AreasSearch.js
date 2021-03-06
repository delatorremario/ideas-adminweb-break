import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { ControlLabel } from 'react-bootstrap';


class AreasSearch extends Component {

    state = {
        // selected: undefined,
        // text: '',
    }

    // componentDidMount() {
    //     this.setState({ selected: this.props.areaSelected, text: this.props.textSearch.get() })
    // }


    onChangeSearch = e => {
        e.preventDefault();
        const text = e.target.value;
        this.props.textSearch.set(text);
        // this.setState({ text: text })
    }

    select = select => e => {
        e.preventDefault();
        const { textSearch, selectArea } = this.props;
        textSearch.set('');
        selectArea(select);
    }
    removeFilter = e => {
        e.preventDefault()
        const { textSearch, selectArea } = this.props;
        textSearch.set('');
        selectArea(undefined);
    }
    render() {
        // const { selected } = this.state;
        const { areas, selectArea, textSearch, areaSelected } = this.props;
        const text = textSearch.get();
        return <div className='areas-search'>
            {
                !areaSelected &&
                <input type="search" className="form-control input-sm" placeholder="Buscar por Nombre de Area ..." onChange={this.onChangeSearch.bind(this)} />
            }
            {
                areaSelected &&
                <div >
                    <div className="area-selected">
                        <h3>{areaSelected.name} <span><a href="" onClick={this.removeFilter.bind(this)}><i className='fa fa-times' /></a></span></h3>

                    </div>
                </div>
            }

            {
                !areaSelected && areas && <div className="form-group">
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
