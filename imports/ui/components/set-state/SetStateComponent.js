import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import IdeaCardContainer from '../../components/ideas/IdeaCardContainer'
import StateCard from '../../components/ideas/StateCard';



class SetStateComponent extends React.Component {

    state = { toChanges: [] }

    componentDidMount() {
        const { state } = this.props;
        this.setState({ toChanges: state.toChanges })
    }

    handlerState = e => {
        e.preventDefault();
        const { state, idea, history } = this.props;
        const { toChanges } = this.state;

        _.extend(state, { changes: toChanges });
        
        console.log('state', state);
        // Meteor.call('idea.setState', idea._id, state, (err) => {
        //     if (err) { Bert.alert(error.reason, 'danger'); return; }
        //     history.push('/manage-ideas');
        // });

    }

    onChangeChange = index => e => {
        e.preventDefault();
        const { name, value } = e.target;
        // console.log('index', index);
        // console.log('name', name);
        // console.log('value', value);
        const { toChanges } = this.state;
        toChanges[index].value = value;
        this.setState({ toChanges });
    }
    onChangeDoc = e => {
        e.preventDefault();


        _.map(toChanges, toChange)

        this.setState({
            doc: { ...this.state.doc, [e.target.name]: e.target.value }
        });
    }
    onChange = e => {
        e.preventDefault();
        this.setState(
            { ...this.state, [e.target.name]: e.target.value }
        );
    }

    render() {
        const { state, idea } = this.props;
        // const newState = this.props.state;
        const { toChanges } = this.state
        console.log('_ toChanges _', toChanges);
        return (
            <div>
                <div>
                    {
                        _.map(toChanges, (toChange, index) => {
                            return toChange.text && <FormGroup key={index}>
                                <FormControl componentClass="textarea"
                                    name={toChange.label}
                                    onChange={this.onChangeChange(index).bind(this)}
                                    value={toChange.value}
                                    placeholder={toChange.label}
                                />
                            </FormGroup>
                        })
                    }

                    <div className='set-state-button-container'>
                        <button onClick={this.handlerState.bind(this)} className='btn btn-success btn-trans'>Confirmar</button>
                    </div>
                </div>
                <IdeaCardContainer
                    idea={idea}
                    lap={0}
                    showEdit={false} />
            </div>
        )
    }


}

export default SetStateComponent;
