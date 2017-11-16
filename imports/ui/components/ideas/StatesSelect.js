import React from 'react';
import _ from 'lodash';

const StatesSelect = ({ ideasstates, selectState, statesCodesSelected }) => (
    <div className="states-select">
        <ul>
            {
                _.map(ideasstates, (state, index) => {
                    return (
                        <li className={_.includes(statesCodesSelected, state.code) && 'state-selected'} style={{ backgroundColor: state.color }} key={index} onClick={selectState(state).bind(this)}>
                           <div className="state-info" > {state.step} <small>{state.state}</small></div>
                        </li>
                    )
                })
            }
        </ul>
    </div>
);

export default StatesSelect;

// onClick={selectState(state).bind(this)}