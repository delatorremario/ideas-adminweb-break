import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FormGroup, ControlLabel, FormControl, Checkbox, Radio } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';


import IdeaCardContainer from '../../components/ideas/IdeaCardContainer'
import StateCard from '../../components/ideas/StateCard';
import PersonSearchAndCardContainer from '../../containers/person/PersonSearchAndCardContainer';
import AreasSearch from '../../containers/areas/AreasSearch'

class SetStateComponent extends React.Component {

    state = {}

    componentDidMount() {
        const { state } = this.props;
        console.log('lalalla state', state);
        this.setState({ ...state })
    }

    handlerState = e => {
        e.preventDefault();
        const { idea, history, next } = this.props;
        const state = this.state;

        _.extend(state, { action: next.title });

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
            case 'area':
                toChanges[index].chief = e;
                break;
            case 'check':
                toChanges[index].checked = e.target.checked;
                break;
            case 'option':
                _.map(toChanges, t => {
                    if (t.type==='option' && t.name===e.target.name ) {
                        t.value ="off"
                        return t
                    } 
                })
                toChanges[index].value = e.target.value;
                break;
            default:
                toChanges[index].text = e.target.value;
        }
        this.setState({ toChanges });
    }

    render() {
        const { idea } = this.props;
        // const newState = this.props.state;
        const { toChanges } = this.state
        console.log('_ toChanges _', toChanges);

        return (
            <div>
                <div>
                    <FormGroup>
                        {
                            _.map(toChanges, (toChange, index) => {
                                const selectPerson = person => e => {
                                    let chief = undefined
                                    if (person !== toChange.chief) chief = person;
                                    this.onChangeChange(index, 'chief')(chief);
                                }
                                const selectArea = area => {
                                    let chief = undefined;
                                    if (area === undefined) chief = undefined;
                                    else {
                                        chief = { areaId: area._id }
                                    }
                                    this.onChangeChange(index, 'chief')(chief);
                                }
                                return <div key={index}>
                                    {
                                        toChange.type === 'date' && <div>
                                            <ControlLabel>{toChange.label}</ControlLabel>
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
                                        </div>
                                    }

                                    {
                                        toChange.type === 'chief' && <div>
                                            <ControlLabel>{toChange.label}</ControlLabel>
                                            <PersonSearchAndCardContainer
                                                selectPerson={selectPerson}
                                                person={toChange.chief}
                                            />
                                        </div>

                                    }
                                    {
                                        toChange.type === 'area' && <div>
                                            <ControlLabel>{toChange.label}</ControlLabel>
                                            <AreasSearch {...this.props} selectArea={selectArea} />
                                        </div>
                                    }

                                    {
                                        toChange.type === 'check' && <div>
                                            <Checkbox name={toChange.name} onChange={this.onChangeChange(index, 'check').bind(this)}>
                                                {toChange.label}
                                            </Checkbox>
                                        </div>
                                    }
                                    {
                                        toChange.type === 'option' && <div>
                                            <Radio inline name={toChange.name} onChange={this.onChangeChange(index, 'option').bind(this)}>
                                                {toChange.label}
                                            </Radio>
                                        </div>

                                    }
                                    {
                                        toChange.type === 'text' && <div>
                                            <FormControl componentClass="textarea"
                                                name={toChange.name}
                                                onChange={this.onChangeChange(index, 'text').bind(this)}
                                                value={toChange.value}
                                                placeholder={toChange.label}
                                            />
                                        </div>
                                    }
                                </div>
                            })
                        }
                    </FormGroup>
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
