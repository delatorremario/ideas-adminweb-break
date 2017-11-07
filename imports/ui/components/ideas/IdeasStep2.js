import React from 'react';
import _ from 'lodash';
import PersonCard from './PersonCard';
import PersonSearch from './PersonSearch';

const IdeasStep2 = ({ onChangeForm, data, onChangeSearchPerson, persons, selectChief }) =>

    (
        <div className="form-steps step-one">
            <h2>Selección de Encargado de Área de Destino</h2>
            {
                data && data.chief && <PersonCard person={data.chief} removePerson={selectChief} />
            }

            {
                data && !data.chief && <PersonSearch persons={persons} onChangeSearchPerson={onChangeSearchPerson} selectPerson={selectChief} />
            }

        </div>
    );

export default IdeasStep2;
