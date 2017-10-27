import React from 'react';
import { Route } from 'react-router-dom';

// Corporaciones
import Corporations from '../pages/corporations/Corporations';
import NewCorporation from '../pages/corporations/NewCorporation';
import EditCorporation from '../containers/corporations/EditCorporation';

// Areas
import Areas from '../pages/areas/Areas';
// import NewArea from '../pages/areas/NewArea';
// import EditCorporation from '../containers/corporations/EditCorporation';

import Dashboard from '../pages/Dashboard';
import BlankPage from '../pages/BlankPage';
import ComponentsPage from '../pages/ComponentsPage';

import SendInvitationPage from '../pages/singinup/SendInvitationPage';

const PageWrapper = () => (
        <section className="main-content-wrapper">
            <Route exact path="/" component={Dashboard} />
            <Route path="/dashboard" component={Dashboard} />
            {/* Corporaciones */}
            <Route exact path="/corporations" component={Corporations} />
            <Route exact path="/corporations/new" component={NewCorporation} />
            <Route exact path="/corporation/:_id/edit" component={EditCorporation} />
            
            {/* Areas */}
            <Route exact path="/areas" component={Areas} />
            {/* <Route exact path="/areas/new" component={NewArea} />
            <Route exact path="/area/:_id/edit" component={EditCorporation} /> */}
            
            <Route path="/sendinvitation" component={SendInvitationPage} />
            
            <Route path="/blank-page" component={BlankPage} />
            <Route path="/components-page" component={ComponentsPage} />
        </section>
    );

export default PageWrapper;
