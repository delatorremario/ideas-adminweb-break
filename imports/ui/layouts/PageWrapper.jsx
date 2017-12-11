import React from 'react';
import { Route } from 'react-router-dom';

// Corporaciones
import Corporations from '../pages/corporations/Corporations';
import NewCorporation from '../pages/corporations/NewCorporation';
import EditCorporation from '../containers/corporations/EditCorporation';

// Areas
import Areas from '../pages/areas/Areas';
import NewArea from '../pages/areas/NewArea'; // debería llamar al contenedor
import EditArea from '../containers/areas/EditArea';

// Ideas
import Ideas from '../pages/ideas/Ideas';
import EditIdea from '../containers/ideas/EditIdea';

// ideas new user
import EditIdeaUser from '../containers/ideas/EditIdeaUser';

import Dashboard from '../containers/dashboard/Dashboard';
import BlankPage from '../pages/BlankPage';
import ComponentsPage from '../pages/ComponentsPage';

// Profile
import EditProfile from '../containers/profile/EditProfile';

// Configs

import Configs from '../containers/configs/Configs';
import EditConfig from '../containers/configs/EditConfig';

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
            <Route exact path="/areas/new" component={NewArea} />
            <Route exact path="/area/:_id/edit" component={EditArea} />

            {/* Ideas */}
            <Route exact path="/ideas/:text?/:stateCode?/:step?/:areaId?/find" component={Ideas} />
            <Route exact path="/ideas/new" component={EditIdea} />
            <Route exact path="/idea/:_id/edit" component={EditIdea} />
            
            {/* Ideas Usuario */}
            <Route exact path="/ideas/new_user" component={EditIdeaUser} />
            
            {/* Profile */}
            <Route exact path="/profile" component={EditProfile} />


            {/* Configs */}
            <Route exact path="/configs" component={Configs} />
            {/* <Route exact path="/ideas/new" component={EditIdea} /> */}
             <Route exact path="/config/:_id/edit" component={EditConfig} /> 
            
            <Route path="/sendinvitation" component={SendInvitationPage} />
            
            <Route path="/blank-page" component={BlankPage} />
            <Route path="/components-page" component={ComponentsPage} />
        </section>
    );

export default PageWrapper;
