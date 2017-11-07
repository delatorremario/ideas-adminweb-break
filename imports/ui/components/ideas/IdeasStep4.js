import React from 'react';
import _ from 'lodash';

import PersonCard from './PersonCard';
import PersonSearch from './PersonSearch';

const IdeasStep4 = ({ data, onChangeSearchPerson, persons, selectCollaborator }) => {

    const { collaborators } = data;

    return (
        <div className="form-steps step-one">
            <h2>Selección de Colaboradores</h2>
            {
                _.map(collaborators, (collaborator, index) => <PersonCard key={index} person={collaborator} removePerson={selectCollaborator} />)
            }
           
            <PersonSearch persons={persons} onChangeSearchPerson={onChangeSearchPerson} selectPerson={selectCollaborator} />
            
        </div>
    );
}

export default IdeasStep4;
