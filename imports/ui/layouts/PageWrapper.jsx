import React from 'react';
import { Route } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import $ from 'jquery';

// Corporaciones
import Corporations from '../pages/corporations/Corporations';
import NewCorporation from '../pages/corporations/NewCorporation';
import EditCorporation from '../containers/corporations/EditCorporation';

// Areas
import Areas from '../pages/areas/Areas';
import NewArea from '../pages/areas/NewArea'; // debería llamar al contenedor
import EditArea from '../containers/areas/EditArea';

// Ideas
import IdeaListContainer from '../containers/ideas/IdeasListContainer';
import EditIdea from '../containers/ideas/EditIdea';
import IdeaViewContainer from '../containers/ideas/IdeaViewContainer';
import MyIdeasList from '../containers/ideas/MyIdeasList';
import IdeasListFilter from '../containers/ideas/IdeasListFilter';

// Comments
import CommentsContainer from '../containers/comments/CommentsContainer';
import IdeaCommentsContainer from '../containers/comments/IdeaCommentsContainer';

// Alerts
import AlertsContainer from '../containers/alerts/AlertsContainer';

// Manage ideas
import ManageContainer from '../containers/manage/ManageContainer';
import SetStateContainer from '../containers/set-state/SetStateContainer';

// Ideas new user
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

const completedProfile = () => {
    const user = Meteor.user()
    return user && user.profile
        && user.profile.firstName
        && user.profile.lastName
        && user.profile.oneUp
        && user.profile.area
}

const componentDidMount = () => {
    $('html,body').stop(true, true);
    $('html,body').animate({ scrollTop: 0 }, 0, "swing");
    return true;
}

const PageWrapper = () => (
    <section className="main-content-wrapper">
        {
            componentDidMount() && !completedProfile() && <Route path="/" component={EditProfile} /> ||
            <div>
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

                {/* Menage Ideas */}
                <Route exact path="/manage-ideas" component={ManageContainer} />
                <Route exact path="/set-state/:ideaId/:code" component={SetStateContainer} />

                {/* Ideas */}
                <Route exact path="/ideas/find" component={IdeaListContainer} />
                <Route exact path="/ideas/:stateCode?/:areaId?/filter" component={IdeasListFilter} />
                <Route exact path="/my-ideas" component={MyIdeasList} />
                <Route exact path="/ideas/new" component={EditIdea} />
                <Route exact path="/idea/:_id/edit" component={EditIdea} />
                <Route exact path="/idea/:_id/view" component={IdeaViewContainer} />

                {/* Comments */}
                <Route exact path="/comments" component={CommentsContainer} />
                <Route exact path="/comment/:_id" component={IdeaCommentsContainer} />

                {/* Alerts */}
                <Route exact path="/alerts" component={AlertsContainer} />

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
            </div>
        }
    </section>
);

export default PageWrapper;
