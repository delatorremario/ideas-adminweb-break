import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';


import IdeaCardContainer from '../../components/ideas/IdeaCardContainer'
import StateCard from '../../components/ideas/StateCard';
import PersonSearch from '../../components/persons/PersonSearch';

class SetStateComponent extends React.Component {

    state = { toChanges: [] }

    componentDidMount() {
        const { state } = this.props;
        console.log('__state__', state);
        this.setState({ toChanges: state.toChanges })
    }

    handlerState = e => {
        e.preventDefault();
        const { state, idea, history, next } = this.props;
        const { toChanges } = this.state;

        _.extend(state, { changes: toChanges, action: next.title });

        // console.log('state', state);
        Meteor.call('idea.setState', idea._id, state, (err) => {
            if (err) { Bert.alert(error.reason, 'danger'); return; }
            history.push('/manage-ideas');
        });

    }

    onChangeChange = (index, type) => e => {
        // e.preventDefault();

        const value = (type, e) => {
            console.log('valuessss', type, e);
            switch (type) {
                case 'date':
                    return e;
                    break;
                default:
                    return e.target.value;
            }
        }
        console.log('_value_', value(type, e));
        const { toChanges } = this.state;
        toChanges[index].value = value(type, e);
        this.setState({ toChanges });
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
                            return toChange.type === 'date'
                                &&
                                <FormGroup key={index}>
                                    <ControlLabel>{toChange.label}</ControlLabel>
                                    {/* <i className="fa fa-calendar"></i> */}
                                    <DatePicker
                                        id="date"
                                        name={toChange.name}
                                        value={toChange.value}
                                        onChange={this.onChangeChange(index, 'date').bind(this)}
                                        dateFormat={'DD MM YYYY'}
                                        dayLabels={['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']}
                                        monthLabels={['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']}
                                        showTodayButton={true}
                                        todayButtonLabel={'Hoy'}
                                    />
                                </FormGroup> ||
                                toChange.type === 'person'
                                &&
                                <FormGroup>
                                    <ControlLabel>{toChange.label}</ControlLabel>
                                    <PersonSearch className="personSearch" persons={[]} onChangeSearchPerson={() => { }} selectPerson={() => { }} />
                                </FormGroup>
                                ||
                                <FormGroup key={index}>
                                    <FormControl componentClass="textarea"
                                        name={toChange.name}
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
