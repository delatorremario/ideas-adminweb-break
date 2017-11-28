import React from 'react';
import { PropTypes } from 'react';

const StateCard = ({ state }) => (
    <div className="card-single">
        <div className='state-color' style={{ backgroundColor: state.color }} ></div>
        <div>
            <h3>{state.step}</h3>
            <p>{state.state}</p>
            <small>{state.description}</small>
        </div>
    </div>
);

StateCard.propTypes = {
    state: PropTypes.shape().isRequired,
};

export default StateCard;
