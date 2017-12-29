import React from 'react';

import PersonCard from '../../components/persons/PersonCard';
import PersonSearch from '../../components/persons/PersonSearch';

const PersonSearchAndCard = ({ persons, person, onChangeSearchPerson, selectPerson }) => {

    return <div>
        {person && <PersonCard className="personCard" person={person} removePerson={selectPerson} />}
        {!person && <PersonSearch className="personSearch" persons={persons} onChangeSearchPerson={onChangeSearchPerson} selectPerson={selectPerson} />}
    </div>
}

export default PersonSearchAndCard;