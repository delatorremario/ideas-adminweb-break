import React from 'react';
import _ from 'lodash';
import PersonCard from '../persons/PersonCard';
import PersonSearch from '../persons/PersonSearch';
import PersonSearchAndCardContainer from '../../containers/person/PersonSearchAndCardContainer'
import StatesSelect from './StatesSelect';
import StateCard from './StateCard';

const IdeasStep2 = ({ data, selectChief }) =>

    (
        <div className="row panel-body panel-body-mobile form-steps step-two">
            <div className="col-xs-12">
                <h2 className="stepH2">Selección de Encargado de Área de Destino</h2>
                <PersonSearchAndCardContainer
                                                onlyChief={true}
                                                selectPerson={selectChief}
                                                person={data.chief}
                                            />
                {/* <div className="row" style={{ display: "flex" }}>
                    {
                        data && data.chief && <PersonCard className="personCard" person={data.chief} removePerson={selectChief} />
                    }
                </div>
                <div className="row">
                    {
                        data && !data.chief && <PersonSearch className="personSearch" persons={persons} onChangeSearchPerson={onChangeSearchPerson} selectPerson={selectChief} onlyChief={true} />
                    }
                </div> */}
            </div>
        </div>
    );

export default IdeasStep2;
