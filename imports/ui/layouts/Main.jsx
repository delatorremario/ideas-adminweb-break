import React, { Component, PropTypes } from 'react'
import MainWrapper from './MainWrapper'
import Dashboard from '../pages/Dashboard'
import { Route, Redirect } from 'react-router-dom'

// class Main extends Component {
//     render() {
//         return (
//             <div>
//                 <MainWrapper />
//             </div>
//         );
//     }
// }

const Main = ({ loggingIn, authenticated, component, ...rest, location }) => {
    return authenticated ? <MainWrapper match={location}/> : (<Redirect to="/login" />)
}

Main.propTypes = {
    loggingIn: PropTypes.bool,
    authenticated: PropTypes.bool,
    component: PropTypes.func,
};

export default Main;