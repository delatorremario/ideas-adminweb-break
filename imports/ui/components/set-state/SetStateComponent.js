import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';


import IdeaCardContainer from '../../components/ideas/IdeaCardContainer'
import StateCard from '../../components/ideas/StateCard';
import PersonSearch from '../../components/persons/PersonSearch';
import PersonSearchAndCardContainer from '../../containers/person/PersonSearchAndCardContainer';

class SetStateComponent extends React.Component {

    state = {}

    componentDidMount() {
        const { state } = this.props;
        this.setState({ ...state })
    }

    handlerState = e => {
        e.preventDefault();
        const { idea, history, next } = this.props;
        const state = this.state;

        _.extend(state, { action: next.title });

        console.log('---- state -----', state);
        Meteor.call('idea.setState', idea._id, state, (err) => {
            if (err) { Bert.alert(error.reason, 'danger'); return; }
            history.push('/manage-ideas');
        });

    }

    onChangeChange = (index, type) => e => {
        // e.preventDefault();
        const { toChanges } = this.state;
        switch (type) {
            case 'date':
                toChanges[index].date = e;
                break;
            case 'chief':
                toChanges[index].chief = e;
                break;
            default:
                // console.log('--e.target.value--', e.target.value)
                toChanges[index].text = e.target.value;
        }
        this.setState({ toChanges });
    }

    render() {
        const { idea } = this.props;
        // const newState = this.props.state;
        const { toChanges } = this.state
        // console.log('_ this.state _', this.state);

        return (
            <div>
                <div>
                    {
                        _.map(toChanges, (toChange, index) => {
                            const selectPerson = person => e => {
                                let chief = undefined
                                if (person !== toChange.chief) chief = person;
                                this.onChangeChange(index, 'chief')(chief);
                            }
                            return toChange.type === 'date'
                                &&
                                <FormGroup key={index}>
                                    <ControlLabel>{toChange.label}</ControlLabel>
                                    {/* <i className="fa fa-calendar"></i> */}
                                    <DatePicker
                                        id="date"
                                        name={toChange.name}
                                        value={toChange.date}
                                        onChange={this.onChangeChange(index, 'date').bind(this)}
                                        dateFormat={'DD MM YYYY'}
                                        dayLabels={['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']}
                                        monthLabels={['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']}
                                        showTodayButton={true}
                                        todayButtonLabel={'Hoy'}
                                    />
                                </FormGroup> ||
                                toChange.type === 'chief'
                                &&
                                <FormGroup key={index}>
                                    <ControlLabel>{toChange.label}</ControlLabel>
                                    <PersonSearchAndCardContainer
                                        selectPerson={selectPerson}
                                        person={toChange.chief}
                                    />
                                </FormGroup>
                                ||
                                <FormGroup key={index}>
                                    <FormControl componentClass="textarea"
                                        name={toChange.name}
                                        onChange={this.onChangeChange(index,'text').bind(this)}
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
