import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Header from './Header';
import SidebarPush from './SidebarPush'
import PageWrapper from './PageWrapper'
import Footer from './Footer'

const MainWrapper = ({ user, userImg, location, history }) => (

    <div id="main-wrapper" className="theme-green">
        <Header history={history} />
        <SidebarPush user={user} userImg={userImg} match={location} />
        <PageWrapper />
        <Footer history={history} />
    </div>

)

export default MainWrapper