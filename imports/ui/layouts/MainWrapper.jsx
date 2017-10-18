import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Header from './Header';
import SidebarPush from './SidebarPush'
import PageWrapper from './PageWrapper'

class MainWrapper extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: Meteor.users.findOne(Meteor.userId())
        };

        console.log('this.state.user', this.state.user)
    }

    render() {
        return (
            <div id="main-wrapper" className="theme-green">
                <Header />
                <SidebarPush user={this.state.user} match={this.props.location} />
                <PageWrapper />
            </div>
        )
    }
}

export default MainWrapper