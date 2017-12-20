import React from 'react';
import { Alert } from 'react-bootstrap'

import ManageIdeasCardContainer from './ManageIdeaCardContainer';

const ManageIdeasListComponent = ({ ideas }) => {
    return (
       ideas && ideas.length > 0 ?
            <div className="row cards-container">
                {_.map(ideas, (idea, index) => {
                    let lap = index / 2;
                    return <ManageIdeasCardContainer key={index} idea={idea} lap={lap} handleRemove={this.handleRemove} showEdit={false} />
                })}
            </div>
            : <Alert bsStyle="warning">No se encontraron datos.</Alert>
    )
}

export default ManageIdeasListComponent;
