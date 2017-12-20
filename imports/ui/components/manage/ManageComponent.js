import React from 'react';
import { Accordion, Panel } from 'react-bootstrap';
import Loading from '../../components/Loading';


import ManageIdeasListContainer from './ManageIdeasListContainer';

const ManageComponent = ({ listStates }) => {
    console.log('listStates', listStates);

    return (
        <Accordion>
            {
                _.map(listStates, (state, index) => 
                    <Panel header={state.title} eventKey={index} key={index}>
                        <ManageIdeasListContainer />
                    </Panel>
                )
            }
        </Accordion>
    )
}

export default ManageComponent;