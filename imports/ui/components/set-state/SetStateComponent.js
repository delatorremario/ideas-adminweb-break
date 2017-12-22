import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import IdeaCardContainer from '../../components/ideas/IdeaCardContainer'
import StateCard from '../../components/ideas/StateCard';

const setState = (props) => e => {
    e.preventDefault();
    console.log('props', props);
    const { state, idea, history } = props;

    Meteor.call('idea.setState', idea._id, state, (err) => {
        if (err) { Bert.alert(error.reason, 'danger'); return; }
        history.push('/manage-ideas');
    });

}

const SetStateComponent = (props) => {
    const { state, idea } = props;
    return <div>
        <FormGroup>
            <ControlLabel>Motivo</ControlLabel>
            <FormControl componentClass="textarea"
                name="description"
                // onChange={onChangeForm}
                // value={data.description}
                placeholder='Motivo'
            />
        </FormGroup>
        <StateCard state={state} />
        <div className='set-state-button-container'>
            <button onClick={setState(props).bind(this)} className='btn btn-success btn-trans'>Confirmar</button>
        </div>
        <IdeaCardContainer
            // key={index} 
            idea={idea}
            lap={0}
            // handleRemove={this.handleRemove} 
            showEdit={false} />
    </div>
}

export default SetStateComponent;
