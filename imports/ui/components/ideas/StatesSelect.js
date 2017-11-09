import React from 'react';

const StatesSelect = ({ ideasstates, selectState }) => (
    <div style={{ textAlign: "center" }}>
        {
            _.map(ideasstates, (state, index) => {
                return (
                    <button style={{ marginBottom: '5px', backgroundColor: state.color }} key={index} onClick={selectState(state).bind(this)} className='btn btn-sm'>
                        {state.step} <br/><small>{state.state}</small>
                    </button>
                )
            })
        }
    </div>
);

export default StatesSelect;
