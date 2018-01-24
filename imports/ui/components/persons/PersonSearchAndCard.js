import React from 'react';

import PersonCard from '../../components/persons/PersonCard';
import PersonSearch from '../../components/persons/PersonSearch';

const PersonSearchAndCard = ({ persons, person, onChangeSearchPerson, selectPerson, hideInput }) => {

    return <div>
        {person && <PersonCard className="personCard" person={person} removePerson={selectPerson} />}
        {!person && <PersonSearch
            className="personSearch"
            persons={persons}
            onChangeSearchPerson={onChangeSearchPerson}
            selectPerson={selectPerson}
            hideInput={hideInput}
        />}
    </div>
}

export default PersonSearchAndCard;