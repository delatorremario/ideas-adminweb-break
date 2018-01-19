import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FormGroup, ControlLabel, FormControl, Checkbox, Radio } from 'react-bootstrap';
import Button from 'react-bootstrap-button-loader';

import DatePicker from 'react-bootstrap-date-picker';
// import DatePicker from 'react-date-picker';
import { Bert } from 'meteor/themeteorchef:bert';
import moment from 'moment';

import IdeaCardContainer from '../../components/ideas/IdeaCardContainer'
import StateCard from '../../components/ideas/StateCard';
import PersonSearchAndCardContainer from '../../containers/person/PersonSearchAndCardContainer';
import AreasSearch from '../../containers/areas/AreasSearch'

class CustomControl extends React.Component {
    render() {
        const {
            value,
            placeholder,
            ...rest,
        } = this.props;
        return <Button {...rest}>{value || placeholder}</Button>;
    }
};

const validate = (toChanges) => {
    const confirm = true;
    _.each(toChanges, toChange => {
        if (!toChange.optional && toChange.type != 'check') {
            switch (toChange.type) {
                case 'date':
                    confirm = !!toChange.date;
                    break;
                case 'chief':
                    confirm = !!toChange.chief;
                    break;
                case 'area':
                    confirm = !!toChange.chief;
                    break;
                case 'option':
                    confirm = !!toChange.value;
                    break;
                default:
                    confirm = !!toChange.text;
            }
        }
    })
    return confirm
}

class SetStateComponent extends React.Component {

    state = {
        loading: false,
    }

    componentDidMount() {
        const { state } = this.props;
        this.setState({ ...state })
    }

    handlerState = e => {
        e.preventDefault();
        const { idea, history, next } = this.props;
        const state = this.state;
        const { toChanges } = this.state;

        if (validate(toChanges)) {
            this.setState({ loading: true })
            _.extend(state, { action: next.title });

            Meteor.call('idea.setState', idea._id, state, (err) => {
                if (err) { Bert.alert(error.reason, 'danger'); this.setState({ loading: false }); return; }
                history.push('/manage-ideas');
            });
        } else Bert.alert('Debe completar los campos requeridos', 'warning')

    }

    onChangeChange = (index, type) => e => {
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
                    if (t.type === 'option' && t.name === e.target.name) {
                        t.value = "off"
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
        const { toChanges } = this.state
        const { area } = idea;
        return (
            <div className='state-component'>
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
                                // const myAreaCheck = () => {
                                //     console.log('toChange.label', toChange.label, toChange.label === 'Otro Ejecutivo de mi Area');
                                //     return false // toChange.label === 'Otro Ejecutivo de mi Area'
                                // }
                                return <div key={index}>
                                    {
                                        toChange.type === 'date' && <div>
                                            <ControlLabel>{toChange.label}</ControlLabel>
                                            <DatePicker
                                                id="date"
                                                name={toChange.name}
                                                value={toChange.date}
                                                onChange={this.onChangeChange(index, 'date').bind(this)}
                                                dateFormat={'DD-MM-YYYY'}
                                                dayLabels={['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']}
                                                monthLabels={['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']}
                                                showTodayButton={true}
                                                todayButtonLabel={'Hoy'}
                                                placeholder='Seleccionar Fecha'
                                                autoComplete='off'
                                                minDate={moment().toISOString()}
                                                maxDate={toChange.maxDais && moment().add('days', toChange.maxDais).toISOString()}
                                            // customControl={<CustomControl />}
                                            />
                                        </div>
                                    }
                                    {
                                        toChange.type === 'chief' && <div>
                                            <ControlLabel>{toChange.label} {console.log(toChange.label)}</ControlLabel>
                                            <PersonSearchAndCardContainer
                                                onlyChief={true}
                                                myArea={toChange.label === 'Otro Ejecutivo de mi Area'}
                                                selectPerson={selectPerson}
                                                person={toChange.chief}
                                            />
                                        </div>

                                    }
                                    {
                                        toChange.type === 'area' && <div>
                                            <ControlLabel>{toChange.label}</ControlLabel>
                                            <AreasSearch {...this.props} areaSelected={area} selectArea={selectArea} />
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
                        <Button loading={this.state.loading} onClick={this.handlerState.bind(this)} className='btn btn-success btn-trans'>Confirmar</Button>
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
