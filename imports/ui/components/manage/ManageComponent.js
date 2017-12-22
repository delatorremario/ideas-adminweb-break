import React from 'react';
import { Accordion, Panel } from 'react-bootstrap';
import Loading from '../../components/Loading';


import ManageIdeasListContainer from './ManageIdeasListContainer';

const ManageComponent = ({ listStates }) => {
    return (
        <Accordion>
            {
                _.map(listStates, (state, index) => 
                    <Panel header={state.title + ` (${state.count})`} eventKey={index} key={index}>
                        <ManageIdeasListContainer state={state} />
                    </Panel>
                )
            }
        </Accordion>
    )
}

export default ManageComponent;