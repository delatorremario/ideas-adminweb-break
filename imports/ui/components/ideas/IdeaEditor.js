import React, { Component, PropTypes } from 'react'
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import ideaEditor from '../../../modules/ideas/idea-editor.js'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import MainList from '../MainList'
import _ from 'lodash'

// collections
import Persons from '../../../api/persons/persons';

// Step components
import StepIndicator from '../../components/StepIndicator';
import IdeasStepOne from './IdeasStepOne'
import IdeasStepTwo from './IdeasStepTwo'

export default class IdeaEditor extends Component {
    state = {
        formStep: 1,
        doc: {
            _id: '',
            origin: '',
            description: '',
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
        const { origin, description } = this.state.doc;
        return (formStep === 1 && origin) ||
            (formStep === 2 && origin && description)
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

    onChangeSearchPerson  = e => {
        e.preventDefault();
        const persons = Persons.find({}).fetch()
        console.log('text', e.target.value);
        console.log('Persons', persons);
    }

    render() {
        const formMaxStep = 2;

        const { formStep } = this.state;
        const { doc } = this.state;
        const { origin, _id } = this.state.doc;
        console.log("step: ", formStep);

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

                                                {formStep === 1 && <IdeasStepOne onChangeForm={this.onChangeDoc} data={doc} onChangeSearchPerson={this.onChangeSearchPerson} />}
                                                {formStep === 2 && <IdeasStepTwo onChangeForm={this.onChangeDoc} data={doc} />}

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
                                                        </Button>
                                                        ||
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

                                                    <Button onClick={(e) => e.preventDefault()} type="button" bsStyle="default" className="btn btn-trans btn-sm pull-right"><i className="fa fa-times"></i>Cancelar</Button>
                                                </div>
                                            </form>
                                            {/* <div className="row">
                                                <div className="col-xs-12 col-sm-offset-4 col-sm-6 control-bottom">
                                                    <Button type="submit" className="reset-icon" bsStyle="success">
                                                        <i className="fa fa-plus"></i>{_id ? ' Guardar' : ' Crear'}
                                                    </Button>
                                                </div>
                                            </div> */}

                                        </CSSTransitionGroup>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>


                {/* 

                    <FormGroup>
                        <div className="col-sm-4">
                            <ControlLabel>Origin</ControlLabel>
                        </div>
                        <div className="col-sm-6">
                            <FormControl
                                type="text"
                                name="origin"
                                value={origin}
                                onChange={this.onChangeDoc}
                                placeholder="Origen"
                            />
                        </div>
                    </FormGroup>

                   

               */}
            </div>
        )
    }
}

IdeaEditor.propTypes = {
    doc: PropTypes.object,
};
