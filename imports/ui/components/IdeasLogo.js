import React from 'react';
import { Link } from 'react-router-dom';

const IdeasLogo = (fontSize) => {
    if (!fontSize) {
        fontSize = '10em';
    }
    return (
        <div className="logo-container">
            <Link to="/" className="logo-idea">
                <div className="logo-container-img">
                    <img className="logo-img" src="/logo.png" alt="I" />
                </div>
                <p className="logo-title" style={{ fontSize: fontSize+' !important' }}>Plataforma Ideas 3.0</p>
            </Link>
        </div >
    );
}

export default IdeasLogo