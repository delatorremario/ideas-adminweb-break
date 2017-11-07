import React, { Component, PropTypes } from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ideaEditor from '../../../modules/ideas/idea-editor.js';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import MainList from '../MainList';
import _ from 'lodash';
import $ from 'jquery';

// collections
import Persons from '../../../api/persons/persons';

// Step components
import StepIndicator from '../../components/StepIndicator';
import IdeasStep1 from './IdeasStep1'
import IdeasStep2 from './IdeasStep2'
import IdeasStep3 from './IdeasStep3'
import IdeasStep4 from './IdeasStep4'

export default class IdeaEditor extends Component {
    state = {
        formStep: 1,
        doc: {
            _id: '',
            origin: '',
            person: {},
            chief: {},
            description: '',
            opportunity: '',
            drivers: [],
            collaborators: [],
        },
    }

    componentDidMount() {
        ideaEditor({ component: this });
        // setTimeout(() => { document.querySelector('[name="name"]').focus(); }, 0);
        if (this.props.doc) {
            this.setState({
                doc: this.props.doc
            });
        }
        this.calculateIndicatorWidth();
        $(window).on("resize", () => {
            this.calculateIndicatorWidth();
        })
    }

    toggleStepReady = () => {
        const { formStep } = this.state;
        const { origin, person, chief, description, opportunity, drivers } = this.state.doc;
        return (formStep === 1 && origin && person) ||
            (formStep === 2 && origin && person && chief) ||
            (formStep === 3 && origin && person && chief && description && opportunity && drivers) ||
            (formStep === 4 && origin && person && chief && description && opportunity && drivers)
    }


    onChangeDoc = e => {
        e.preventDefault();
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

    changeStep = (add, step) => e => {
        e.preventDefault()
        if (add) {
            this.setState(prev => ({
                formStep: prev.formStep + step
            }))
        } else {
            this.setState({
                formStep: step
            })
        }

        setTimeout(() => {
            this.calculateIndicatorWidth()
        }, 100);
    }

    calculateIndicatorWidth() {
        const { formStep } = this.state;

        let breakpoints = $(".stepIndicator ul").children().length + 1;
        let elWidth = $(".line-progress-back").width();
        let eachStep = elWidth / breakpoints;

        $(".line-progress-front").width(eachStep * formStep);
    }

    onChangeSearchPerson = e => {
        e.preventDefault();
        const text = e.target.value;
        this.props.textSearch.set(text);
    }

    selectPerson = person => e => {
        e.preventDefault()
        delete person.score;
        
        this.setState(prev => ({
            doc: { ...prev.doc, person: prev.doc.person !== person && person || undefined }
        }))

        this.props.textSearch.set('');
        
    }

    selectChief = chief => e => {
        e.preventDefault()
        delete chief.score;
        
        this.setState(prev => ({
            doc: { ...prev.doc, chief: prev.doc.chief !== chief && chief || undefined }
        }))

        this.props.textSearch.set('');
        
    }
    selectCollaborator = collaborator => e => {
        e.preventDefault()
        $('#personSearchInput').html('');
        delete collaborator.score;
        
        const prevCollaborators = this.state.doc.collaborators;
        const collaborators = _.includes(prevCollaborators, collaborator) && _.pull(prevCollaborators, collaborator) || _.union(prevCollaborators, [collaborator])
        this.setState(prev => ({ doc: { ...prev.doc, collaborators }, persons: [] }))

        this.props.textSearch.set('');
        
    }

    selectOrigin = origin => e => {
        e.preventDefault()
        this.setState(prev => ({ doc: { ...prev.doc, origin } }))
    }

    selectDriver = driver => e => {
        e.preventDefault()
        const prevDrivers = this.state.doc.drivers;
        const drivers = _.includes(prevDrivers, driver) && _.pull(prevDrivers, driver) || _.union(prevDrivers, [driver])
        this.setState(prev => ({ doc: { ...prev.doc, drivers } }))
    }

    render() {
        const origins = ['Email', 'Yamer', 'Otra']
        const driversArray = ['Driver 1', 'Driver 2', 'Drivers 3', 'Driver 4']
        const formMaxStep = 4;

        const { persons } = this.props;

        const { formStep } = this.state;
        const { doc } = this.state;
        const { origin, _id } = this.state.doc;

        return (
            <div>

                <section id="main-content">
                    <div className="row">
                        <div className="col-md-12 col-lg-12">
                            <div className="panel">

                                <div className="row">
                                    <div className="col-xs-12">
                                        <StepIndicator changeStep={this.changeStep} formStep={formStep} items={formMaxStep} />
                                    </div>
                                    <div className="panel-body ng-binding col-xs-10 col-xs-offset-1">

                                        <CSSTransitionGroup
                                            component="div"
                                            className="steps-container"
                                            transitionName="formTransition"
                                            transitionEnterTimeout={1000}
                                            transitionLeaveTimeout={1000}
                                        >

                                            <form
                                                className="label-left"
                                                noValidate
                                                ref={form => (this.ideaEditorForm = form)}
                                                onSubmit={event => event.preventDefault()}>

                                                {formStep === 1 &&
                                                    <IdeasStep1 onChangeForm={this.onChangeDoc}
                                                        data={doc}
                                                        onChangeSearchPerson={this.onChangeSearchPerson}
                                                        persons={persons}
                                                        selectPerson={this.selectPerson}
                                                        origins={origins}
                                                        selectOrigin={this.selectOrigin}
                                                    />}
                                                {formStep === 2 &&
                                                    <IdeasStep2 onChangeForm={this.onChangeDoc}
                                                        data={doc}
                                                        onChangeSearchPerson={this.onChangeSearchPerson}
                                                        persons={persons}
                                                        selectChief={this.selectChief}
                                                    />}
                                                {formStep === 3 &&
                                                    <IdeasStep3 onChangeForm={this.onChangeDoc}
                                                        data={doc}
                                                        driversArray={driversArray}
                                                        selectDriver={this.selectDriver}
                                                    />}
                                                {formStep === 4 &&
                                                    <IdeasStep4
                                                        data={doc}
                                                        onChangeSearchPerson={this.onChangeSearchPerson}
                                                        persons={persons}
                                                        selectCollaborator={this.selectCollaborator}
                                                    />}

                                                <div className="forms-bottom-panel">
                                                    {
                                                        formStep === formMaxStep &&
                                                        <Button
                                                            disabled={this.toggleStepReady() ? false : true}
                                                            type='submit'
                                                            bsStyle="success"
                                                            className="btn btn-sm pull-right">
                                                            <i className="fa fa-paper-plane"></i>
                                                            Finalizar
                                                        </Button> ||
                                                        <Button
                                                            onClick={this.changeStep(true, 1)}
                                                            disabled={this.toggleStepReady() ? false : true}
                                                            type='button'
                                                            bsStyle="success"
                                                            className="btn btn-sm pull-right">
                                                            <i className="fa fa-arrow-right"></i>
                                                            Siguiente
                                                        </Button>
                                                    }

                                                    {
                                                        formStep !== 1 &&
                                                        <Button
                                                            onClick={this.changeStep(true, -1)}
                                                            type="button" bsStyle="default" className="btn btn-sm pull-right">
                                                            <i className="fa fa-arrow-left"></i>{`Anterior`}
                                                        </Button>
                                                    }

                                                    <Button onClick={(e) => this.props.history.push('/ideas')} type="button" bsStyle="default" className="btn btn-trans btn-sm pull-right"><i className="fa fa-times"></i>Cancelar</Button>

                                                </div>
                                            </form>

                                        </CSSTransitionGroup>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

IdeaEditor.propTypes = {
    doc: PropTypes.object,
};
