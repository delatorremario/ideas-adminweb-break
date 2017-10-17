import React, { Component, PropTypes } from 'react';
import MainWrapper from './MainWrapper';

// class Main extends Component {
//     render() {
//         return (
//             <div>
//                 <MainWrapper />
//             </div>
//         );
//     }
// }

const Main = ({ loggingIn, authenticated, component, ...rest, location }) =>  <MainWrapper match={location}/>


Main.propTypes = {
    loggingIn: PropTypes.bool,
    authenticated: PropTypes.bool,
    component: PropTypes.func,
};

export default Main;