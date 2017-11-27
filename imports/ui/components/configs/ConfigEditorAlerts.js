
import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import ConfigEditorAlert from './ConfigEditorAlert';

class ConfigEditorAlerts extends Component {

    state = {
        key: 1,
    }

    handleSelect = key => {
        this.setState({ key });
    }

    render() {
        return (
            <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
                <Tab eventKey={1} title="Tab 1"><ConfigEditorAlert /></Tab>
                <Tab eventKey={2} title="Tab 2"><ConfigEditorAlert /></Tab>
            </Tabs>
        );
    }
}

export default ConfigEditorAlerts;
