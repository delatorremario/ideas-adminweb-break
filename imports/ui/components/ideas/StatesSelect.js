import React from 'react';

const StatesSelect = ({ ideasstates, selectState }) => (
    <div className='panel panel-default'>
        <div className='panel-body'>
            {
                _.map(ideasstates, (state, index) => {
                    return <button style={{ marginBottom: '5px', backgroundColor: state.color }} key={index} onClick={selectState(state).bind(this)} className='btn btn-sm'>
                        {state.step} <small> {state.state}</small>
                    </button>
                })
            }
        </div>
    </div>
);

export default StatesSelect;
