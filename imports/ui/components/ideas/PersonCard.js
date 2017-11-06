import React, { Component } from 'react';
import { PropTypes } from 'react'
import Areas from '../../../api/areas/areas';

class PersonCard extends Component {

    state = {
        loadingAreas: false,
        area: {}
    }

    componentWillMount() {
        const { person } = this.props;
        const area = Areas.findOne({ _id: person.areaId })
        this.setState({ area })
    }
    
    render() {
        const { person, removePerson, loadingAreas } = this.props;
        const { area } = this.state;

        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className="col-md-6 card-single">
                        <div className="close-card" onClick={removePerson(person).bind(this)} ><i className="fa fa-times"></i></div>
                        <h3><i className="fa fa-user title-icon"></i> {person.firstName} {person.secondName} {person.lastName}</h3>
                        <small>{person.email}</small>
                        <h4>{area && area.name}</h4>
                        {/* <p>Escondida - NPI & Conc. Handling Operations</p>
                        <p>NPI Mtto</p> */}
                    </div>
                </div>
            </div>
        );
    }
}

PersonCard.propTypes = {
    person: PropTypes.shape().isRequired,
    removePerson: PropTypes.func.isRequired,
}

export default PersonCard;
