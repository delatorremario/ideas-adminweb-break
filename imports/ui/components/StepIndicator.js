import React from 'react/react';

const StepIndicator = ({ changeStep, formStep, items }) => {
    let itemsElement = [];
    for(let i = 1; i <= items; i++) {
        itemsElement.push(<li key={i}><a className={(formStep === i ? "active" : "" + formStep > i ? "done" : "")} onClick={changeStep(false, i).bind(this)}>{i}</a></li>)
    }
    return (
        <div className="stepIndicator">
            <ul>
                {itemsElement}
            </ul>
            <div className="line-progress-back">
                <div className="line-progress-front"></div>
            </div>
        </div>
    )
};

export default StepIndicator;
