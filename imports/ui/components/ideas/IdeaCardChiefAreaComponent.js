import React from 'react';


const IdeaCardToChangeComponent = ({ chief }) => {
    return (
        <div>
            {chief.lastName} {chief.firstName} {chief.secondName}
            <div>{chief.area && chief.area.name}</div>
        </div>

    )

}

export default IdeaCardToChangeComponent;