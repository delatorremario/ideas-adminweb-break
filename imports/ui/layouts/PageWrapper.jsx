import React from 'react';
import { Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import BlankPage from '../pages/BlankPage';
import ComponentsPage from '../pages/ComponentsPage';

const PageWrapper = () => (
        <section className="main-content-wrapper">
            <Route exact path="/" component={Dashboard} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/blank-page" component={BlankPage} />
            <Route path="/components-page" component={ComponentsPage} />
        </section>
    );

export default PageWrapper;
