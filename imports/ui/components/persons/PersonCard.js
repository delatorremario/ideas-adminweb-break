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
            <div className="col-md-6 person-card" style={{ display: "flex" }}>
                <div className="card-single" style={{ width: "100%" }}>
                    <div className="close-card" onClick={removePerson(person).bind(this)} ><i className="fa fa-times"></i></div>
                    <h2><i className="fa fa-user title-icon"></i> {person.lastName} {person.secondLastName}, {person.firstName} {person.secondName}</h2>
                    <h3>{area && area.name} <span><small>{person.email}</small></span> </h3>
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
