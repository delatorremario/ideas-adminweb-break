import React from 'react';
import _ from 'lodash';

const StatesSelect = ({ ideasstates, selectState, statesCodesSelected }) => (
    <div className="states-select">
        {
            _.map(ideasstates, (state, index) => {
                return (
                    <div className='state-row' key={index} onClick={selectState(state).bind(this)}>
                        <div className='state-color' style={{ backgroundColor: state.color }} ></div>
                        {
                            _.includes(statesCodesSelected, state.code) &&
                            <div className='state-color' style={{ backgroundColor: state.color }} ></div>
                        }
                        <div className="state-info" >
                            <div>{state.code}</div> <div>{state.step}</div> <small>{state.state}</small>
                        </div>
                    </div>
                )
            })
        }
    </div>
);

export default StatesSelect;

// onClick={selectState(state).bind(this)}