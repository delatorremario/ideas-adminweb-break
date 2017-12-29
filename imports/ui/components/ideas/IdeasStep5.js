import React from 'react';
import _ from 'lodash';
import PersonCard from '../persons/PersonCard';
import PersonSearch from '../persons/PersonSearch';
import StatesSelect from './StatesSelect';
import StateCard from './StateCard';

const IdeasStep5 = ({ data, selectState, ideasstates }) =>

    (
        <div className="row panel-body panel-body-mobile form-steps step-two">
            <div className="col-xs-12">
                {
                    data && data.states && data.states[0] && <StateCard state={data.states[0]} />
                }
                <div className="row">
                    <div className="col-xs-12">
                        <div className="form-group">
                            <h2 className="stepH2">Seleccione el estado de la Idea</h2>
                            <StatesSelect ideasstates={ideasstates} selectState={selectState} statesCodesSelected={[data && data.states && data.states[0] && data.states[0].code]} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

export default IdeasStep5;
