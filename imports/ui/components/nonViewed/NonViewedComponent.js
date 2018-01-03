import React, { Component } from 'react';

const NonViewedComponent = ({ number }) => {
    return (
        <span>
            {
                number < 1 ? '' :
                    <span className="label label-primary label-circle pull-right">
                        {
                            number
                        }
                    </span>
            }
        </span>
    )
}

export default NonViewedComponent;