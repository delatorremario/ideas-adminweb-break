import React from 'react'

import StatesSelect from './StatesSelect';
import StateCard from './StateCard';

const StatesSearch = ({ statesCodesSelected, removeStateFilter, selectState, ideasstates }) =>
    <div>


        <div style={{ marginTop: '10px' }}>
            <StatesSelect ideasstates={ideasstates} selectState={selectState} statesCodesSelected={statesCodesSelected} />
        </div>


        {/* <div>
            <button className="btn btn-defualt btn-sm" onClick={removeStateFilter}>Quitar Filtro</button>
            <div id="example_filter" className="dataTables_filter">
                <StateCard state={stateSelected} />
            </div>
        </div> */}


    </div>

export default StatesSearch;
