import React from 'react';
import _ from 'lodash';
import PersonCard from './PersonCard';
import PersonSearch from './PersonSearch';
import StateSelect from './StatesSelect';
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
                    {
                        data && data.state && data.state[0] && <StateCard state={data.state[0]} />
                    }
                </div>
                <div className="row">
                    {
                        data && !data.chief && <PersonSearch persons={persons} onChangeSearchPerson={onChangeSearchPerson} selectPerson={selectChief} />
                    }
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <div className="form-group">
                            <h2>Seleccione el estado de la Idea</h2>
                            <StateSelect ideasstates={ideasstates} selectState={selectState} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

export default IdeasStep2;
