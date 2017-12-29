import React from 'react';
import _ from 'lodash';
import PersonCard from '../persons/PersonCard';
import PersonSearch from '../persons/PersonSearch';
import StatesSelect from './StatesSelect';
import StateCard from './StateCard';

const IdeasStep2 = ({ onChangeForm, data, onChangeSearchPerson, persons, selectChief, selectState, ideasstates }) =>

    (
        <div className="row panel-body panel-body-mobile form-steps step-two">
            <div className="col-xs-12">
                <h2 className="stepH2">Selección de Encargado de Área de Destino</h2>
                <div className="row" style={{ display: "flex" }}>
                    {
                        data && data.chief && <PersonCard className="personCard" person={data.chief} removePerson={selectChief} />
                    }
                </div>
                <div className="row">
                    {
                        data && !data.chief && <PersonSearch className="personSearch" persons={persons} onChangeSearchPerson={onChangeSearchPerson} selectPerson={selectChief} />
                    }
                </div>
            </div>
        </div>
    );

export default IdeasStep2;
