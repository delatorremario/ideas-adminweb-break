import React from 'react';
import _ from 'lodash';
import PersonCard from './PersonCard';
import PersonSearch from './PersonSearch';
import StateSelect from './StatesSelect';
import StateCard from './StateCard';

const IdeasStep2 = ({ onChangeForm, data, onChangeSearchPerson, persons, selectChief, selectState, ideasstates }) =>

    (
        <div className="form-steps step-one">
            <h2>Selección de Encargado de Área de Destino</h2>
            <div>
                {
                    data && data.state && data.state[0] && <StateCard state={data.state[0]} />
                }
                {
                    data && data.chief && <PersonCard person={data.chief} removePerson={selectChief} />
                }
            </div>
            {
                data && !data.chief && <PersonSearch persons={persons} onChangeSearchPerson={onChangeSearchPerson} selectPerson={selectChief} />
            }
            <h2>Seleccione el estado de la Idea</h2>
            <StateSelect ideasstates={ideasstates} selectState={selectState} />
        </div>
    );

export default IdeasStep2;
