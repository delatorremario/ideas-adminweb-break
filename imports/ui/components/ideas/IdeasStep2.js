import React from 'react';
import _ from 'lodash';
import PersonCard from './PersonCard';
import PersonSearch from './PersonSearch';
import StatesSelect from './StatesSelect';
import StateCard from './StateCard';

const IdeasStep2 = ({ onChangeForm, data, onChangeSearchPerson, persons, selectChief, selectState, ideasstates }) =>

    (
        <div className="row form-steps step-two">
            <div className="col-xs-12">
                <h2>Selección de Encargado de Área de Destino</h2>
                <div className="row" style={{ display: "flex" }}>
                    {
                        data && data.chief && <PersonCard person={data.chief} removePerson={selectChief} />
                    }
                </div>
                <div className="row">
                    {
                        data && !data.chief && <PersonSearch persons={persons} onChangeSearchPerson={onChangeSearchPerson} selectPerson={selectChief} />
                    }
                </div>
            </div>
        </div>
    );

export default IdeasStep2;
