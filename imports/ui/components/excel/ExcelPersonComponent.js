import React, { Component, PropTypes } from 'react';
import ExcelUploaderComponent from './ExcelUploaderComponent';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert2';
import XLSX from 'xlsx';
import _ from 'lodash';

class ExcelPersonComponent extends Component {

    state = {
        isLoading: ''
    }

    componentDidMount() {
        this.setState({
            status: 'idle',
            onLoad: this.xlsxReceptor,
            icon: 'fa fa-file-excel-o'
        })
    }

    xlsxReceptor = bstr => {
        if (bstr && /xls|xlsx|/i.test(bstr.extension)) {
            const name = bstr.name;
            const size = (bstr.size / (1000000)).toFixed(2) + 'MB';
            swal({
                title: 'Cargar Datos',
                text: `Esta acción no se puede revertir. ¿Está seguro que desea cargar "${name} ${size}" al sistema?`,
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Cargar',
                cancelButtonText: 'Cancelar',
            }).then(() => {
                this.setState(prev => ({
                    status: 'uploading'
                }))
                this.xlsxParser(bstr);
                /* Este setTimeout se debe remplazar por el upsert de personas */
                setTimeout(() => {
                    error = true;
                    if (error) {
                        Bert.alert('Error', 'danger');
                        this.setState(prev => ({
                            status: 'idle',
                            icon: 'fa fa-times'
                        }))
                        setTimeout(() => {
                            this.setState(prev => ({
                                icon: 'fa fa-file-excel-o'
                            }))
                        }, 1000);
                    } else {
                        Bert.alert('Datos cargados', 'success');
                        this.setState(prev => ({
                            status: 'idle',
                            icon: 'fa fa-check'
                        }))
                        setTimeout(() => {
                            this.setState(prev => ({
                                icon: 'fa fa-file-excel-o'
                            }))
                        }, 1000);
                    }
                }, 2000);
            }, (dismiss) => {
                console.log(dismiss)
            })
        }
    }

    xlsxParser = (xlsx) => {
        console.log(xlsx);
    }

    render() {
        const { status, onLoad, icon } = this.state;
        return (
            <ExcelUploaderComponent status={status} onLoad={onLoad} icon={icon} />
        )
    }
}

export default ExcelPersonComponent;
