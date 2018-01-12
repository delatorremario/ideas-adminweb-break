import React, { Component } from 'react';

const NonViewedAlertsComponent = ({ counter }) => {
    return (
        <i className="fa fa-bell">
            {
                counter < 1 ? '' :
                    <span className="badge" style={{
                        backgroundColor: '#2c5694',
                        color: 'white',
                        zoom: 0.9,
                        position: 'relative',
                        top: '-10px',
                        right: '7px',
                        borderRadius: '50%',
                        padding: '3px 6px',
                        margin: '0px'
                    }}>{counter}</span>
            }
        </i>
    )
}

export default NonViewedAlertsComponent;

