import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Authenticated from '../pages/Authenticated';

import Dashboard from '../pages/Dashboard'
import BlankPage from '../pages/BlankPage'

// class PageWrapper extends Component {
//     constructor(props) {
//         super(props)
//         console.log(props.match)
//     }
//     render() {
//         return (
//             <section className="main-content-wrapper">
//                 <div>PageWrapper</div>

//                 <Route path={`${this.props.match.url}/dashboard`} component={Dashboard} />
//                 <Route path="/blank-page" component={BlankPage} />

//             </section>
//         )
//     }
// }

const PageWrapper = () => {
    return (
        <section className="main-content-wrapper">
            <Route exact path="/" component={Dashboard} />            
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/blank-page" component={BlankPage} />
        </section>
    )
}

export default PageWrapper;