import React, { Component, PropTypes } from 'react'
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import areaEditor from '../../../modules/areas/areas-editor';
import CSSTransitionGroup from 'react-addons-css-transition-group'
import MainList from '../MainList'
import _ from 'lodash'

export default class AreaEditor extends Component {
    state = {
        doc: {
            _id: '',
            code: '',
            name: '',
        }
    }

    componentDidMount() {
        areaEditor({ component: this });
        // setTimeout(() => { document.querySelector('[name="name"]').focus(); }, 0);
        if (this.props.doc) {
            this.setState({
                doc: this.props.doc
            });
        }

    }

    onChangeDoc = e => {
        this.setState({
            doc: { ...this.state.doc, [e.target.name]: e.target.value }
        });
    }
    onChange = e => {
        this.setState(
            { ...this.state, [e.target.name]: e.target.value }
        );
    }

    render() {
        const { name, _id, code } = this.state.doc;

        return (
            <div>
                <form
                    className="label-left"
                    noValidate
                    ref={form => (this.areaEditorForm = form)}
                    onSubmit={event => event.preventDefault()}>


                    <FormGroup>
                        <div className="col-sm-4">
                            <ControlLabel>Código</ControlLabel>
                        </div>
                        <div className="col-sm-6">
                            <FormControl
                                type="text"
                                name="code"
                                value={code}
                                onChange={this.onChangeDoc}
                                placeholder="Código del Area"
                            />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="col-sm-4">
                            <ControlLabel>Nombre</ControlLabel>
                        </div>
                        <div className="col-sm-6">
                            <FormControl
                                type="text"
                                name="name"
                                value={name}
                                onChange={this.onChangeDoc}
                                placeholder="Nombre del Area"
                            />
                        </div>
                    </FormGroup>

                    <div className="row">
                        <div className="col-xs-12 col-sm-offset-4 col-sm-6 control-bottom">
                            <Button type="submit" className="reset-icon" bsStyle="success">
                                <i className="fa fa-plus"></i>{_id ? ' Guardar' : ' Crear'}
                            </Button>
                        </div>
                    </div>

                </form>


            </div>
        )
    }
}

AreaEditor.propTypes = {
    doc: PropTypes.object,
};
