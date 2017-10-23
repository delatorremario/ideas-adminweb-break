import React from 'react';

const ColoredAvatar = ({ color, userName }) => {
    return (
        <div>
            <div className="colored-avatar" style={{ backgroundColor: `${color}` }}>
                <h2>{ userName.charAt(0) }</h2>
            </div>
            {/* <i className="on border-dark animated bounceIn"></i> */}
        </div>
    )
};

export default ColoredAvatar