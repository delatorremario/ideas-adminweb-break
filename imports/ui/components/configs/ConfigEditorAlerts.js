
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'react-bootstrap';
import _ from 'lodash';

import ConfigEditorAlert from './ConfigEditorAlert';
import ConfigEditor from './ConfigEditor';

class ConfigEditorAlerts extends Component {

    state = {
        key: 1,
    }

    handleSelect = key => {
        if (key === 0) {
            console.log('agreagar nueva alerta');
            Meteor.call('state.addAlert', this.props._id, (err) => {
                if (err) { Bert.alert(err.message, 'danger'); return }
            });
        } else
            this.setState({ key });
    }

    render() {
        const { _id, alerts } = this.props;
        return (
            <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
                {
                    _.map(alerts, (alert, index) => {
                        const i = index + 1;
                        return <Tab eventKey={i} title={`Alerta ${i}`}><ConfigEditorAlert _id={_id} index={index} alert={alert} /></Tab>
                    })
                }
                <Tab eventKey={0} title=' + Alerta'></Tab>
            </Tabs>
        );
    }
}

ConfigEditorAlerts.propTypes = {
    _id: PropTypes.string.isRequired,
    alerts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
}

export default ConfigEditorAlerts;
