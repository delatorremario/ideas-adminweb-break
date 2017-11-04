import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import $ from 'jquery';

// Step components
import StepIndicator from '../../../components/StepIndicator';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import StepFive from './StepFive';

class StartActivities extends Component {

    state = {
        formStep: 1,
        formOne: {
            mandanteRut: '',
            mine: '',
            facility: ''
        },
        formTwo: {
            contratistaRut: '',
            name: '',
            phone: '',
            fax: '',
            email: '',
            web: '',
            region: '',
            province: '',
            commune: '',
            street: '',
            streetNumber: '',
            office: '',
            endowment: ''
        },
        formThree: {
            contractName: '',
            initDate: '',
            endDate: '',
            contractAdmin: '',
            description: ''
        },
        formFour: {
            rutRunExperto: '',
            expertName: '',
            registryNumberSNGM: ''
        },
        formFive: {
            representativeRutRun: '',
            representativeName: '',
            representativePhone: '',
            representativeFax: '',
            representativeEmail: '',
            representativeRegion: '',
            representativeProvince: '',
            representativeCommune: '',
            representativeStreet: '',
            representativeStreetNumber: '',
            representativeOffice: ''
        }
    }

    componentDidMount() {
        this.calculateIndicatorWidth();
        $(window).on("resize", () => {
            this.calculateIndicatorWidth();
        })
    }

    onChangeForm = e => {
        const { formStep, formOne, formTwo, formThree } = this.state;

        switch (formStep) {
            case 1:
            default:
                this.setState({
                    formOne: { ...this.state.formOne, [e.target.name]: e.target.value }
                });
                break;

            case 2:
                this.setState({
                    formTwo: { ...this.state.formTwo, [e.target.name]: e.target.value }
                });
                break;

            case 3:
                this.setState({
                    formThree: { ...this.state.formThree, [e.target.name]: e.target.value }
                });
                break;
            case 4:
                this.setState({
                    formFour: { ...this.state.formFour, [e.target.name]: e.target.value }
                });
                break;
            case 5:
                this.setState({
                    formFive: { ...this.state.formFive, [e.target.name]: e.target.value }
                });
                break;
        }

    }

    toggleStepReady() {
        const { formStep } = this.state;
        const { mandanteRut, mine, facility } = this.state.formOne;
        const { contratistaRut, name, phone, fax, email, web, region, province, commune, street, streetNumber, office, endowment } = this.state.formTwo;
        const { contractName, initDate, endDate, contractAdmin, description } = this.state.formThree;
        const { rutRunExperto, expertName, registryNumberSNGM } = this.state.formFour;
        const { representativeRutRun, representativeName, representativePhone, representativeFax, representativeEmail, representativeRegion, representativeProvince, representativeCommune, representativeStreet, representativeStreetNumber, representativeOffice } = this.state.formFive;

        return  (formStep === 1 && mandanteRut && mine && facility) ||
                (formStep === 2 && contratistaRut && name && phone && fax && email && web && region && province && commune && street && streetNumber && office && endowment) ||
                (formStep === 3 && contractName && initDate && endDate && contractAdmin && description) ||
                (formStep === 4 && rutRunExperto && expertName && registryNumberSNGM) ||
                (formStep === 5 && representativeRutRun && representativeName && representativePhone && representativeFax && representativeEmail && representativeRegion && representativeProvince && representativeCommune && representativeStreet && representativeStreetNumber && representativeOffice);

    }

    changeStep(add, step) {

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

    render() {
        const { formStep } = this.state;
        const { formOne, formTwo, formThree, formFour, formFive } = this.state;
        console.log("step: ", formStep);

        return (
            <div className="pageWrapper">
                <div className="pageheader">
                    <h1>Inicio de actividades</h1>
                    <div className="breadcrumb-wrapper hidden-xs">
                        <span className="label">Estás aquí:</span>
                        <ol className="breadcrumb">
                            <li>Formularios</li>
                            <li>Inicio de actividades</li>
                        </ol>
                    </div>
                </div>

                <section id="main-content">
                    <div className="row">
                        <div className="col-md-12 col-lg-12">
                            <div className="panel">

                                <div className="row">
                                    <div className="col-xs-12">
                                        <StepIndicator changeStep={this.changeStep.bind(this)} formStep={formStep} items={5} />
                                    </div>
                                    <div className="panel-body ng-binding col-xs-10 col-xs-offset-1">

                                        <CSSTransitionGroup
                                            component="div"
                                            className="steps-container"
                                            transitionName="formTransition"
                                            transitionEnterTimeout={1000}
                                            transitionLeaveTimeout={1000}
                                        >


                                            {formStep === 5 && <StepFive onChangeForm={this.onChangeForm.bind(this)} data={formFive} />}
                                            {formStep === 4 && <StepFour onChangeForm={this.onChangeForm.bind(this)} data={formFour} />}
                                            {formStep === 3 && <StepThree onChangeForm={this.onChangeForm.bind(this)} data={formThree} />}
                                            {formStep === 2 && <StepTwo onChangeForm={this.onChangeForm.bind(this)} data={formTwo} />}
                                            {formStep === 1 && <StepOne onChangeForm={this.onChangeForm.bind(this)} data={formOne} />}

                                            <div className="forms-bottom-panel">
                                                <Button onClick={() => this.changeStep(true, 1)} disabled={this.toggleStepReady() ? false : true} type="button" bsStyle="success" className="btn btn-sm pull-right"><i className={"fa " + (formStep === 5 ? "fa-paper-plane" : "fa-arrow-right")}></i>{formStep === 5 ? `Finalizar` : `Siguiente`}</Button>
                                                {formStep !== 1 && <Button onClick={() => this.changeStep(true, -1)} type="button" bsStyle="default" className="btn btn-sm pull-right"><i className="fa fa-arrow-left"></i>{`Anterior`}</Button>}

                                                <Button type="button" bsStyle="default" className="btn btn-trans btn-sm pull-right"><i className="fa fa-times"></i>Cancelar</Button>
                                            </div>

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
};

export default StartActivities;
