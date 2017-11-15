import React from 'react';

const StatesSelect = ({ ideasstates, selectState }) => (
    <div className="states-select">
        <ul>
            {
                _.map(ideasstates, (state, index) => {
                    return (
                        <li style={{ backgroundColor: state.color }} key={index} >
                            <input type="checkbox"/> {state.step} <small>{state.state}</small>
                        </li>
                    )
                })
            }
        </ul>
    </div>
);

export default StatesSelect;

// onClick={selectState(state).bind(this)}