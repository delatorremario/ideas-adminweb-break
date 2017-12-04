import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Header from './Header';
import SidebarPush from './SidebarPush'
import PageWrapper from './PageWrapper'
import Footer from './Footer'

const MainWrapper = ({ user, location }) => (
    
        <div id="main-wrapper" className="theme-green">
            <Header />
            <SidebarPush user={user} match={location} />
            <PageWrapper />
            <Footer />
        </div>
    
    )

export default MainWrapper