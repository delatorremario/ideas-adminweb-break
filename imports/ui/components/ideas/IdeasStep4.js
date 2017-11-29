import React from 'react';
import _ from 'lodash';

import PersonCard from './PersonCard';
import PersonSearch from './PersonSearch';

const IdeasStep4 = ({ data, onChangeSearchPerson, persons, selectCollaborator }) => {

    const { collaborators } = data;

    return (
        <div className="row panel-body form-steps step-four">
            <div className="col-xs-12">
                <h2 className="stepH2">Selección de Colaboradores</h2>
                <div className="row">
                    {
                        _.map(collaborators, (collaborator, index) => <PersonCard className="personCard" key={index} person={collaborator} removePerson={selectCollaborator} />)
                    }
                </div>
                <div className="row">
                    <PersonSearch className="personSearch" persons={persons} onChangeSearchPerson={onChangeSearchPerson} selectPerson={selectCollaborator} />
                </div>
            </div>
        </div>
    );
}

export default IdeasStep4;
