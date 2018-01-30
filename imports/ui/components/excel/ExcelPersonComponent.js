import React, { Component, PropTypes } from 'react';
import ExcelUploaderComponent from './ExcelUploaderComponent';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert2';
import XLSX from 'xlsx';
import _ from 'lodash';

class ExcelPersonComponent extends Component {

    state = {
        isLoading: true
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        })
    }

    xlsxParser = bstr => {
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
                error = false;
                if (error) {
                    Bert.alert('Error', 'danger')
                } else {
                    Bert.alert('Datos cargados', 'success')
                }
            }, (dismiss) => {
                console.log(dismiss)
            })
        }
    }

    changeLoading = e => {
        this.setState(prev => {
            isLoading: !prev.isLoading
        })
    }

    render() {
        const { isLoading, onLoad, icon } = this.state;
        return (
            <ExcelUploaderComponent isLoading={isLoading} onLoad={onLoad} icon={icon} />
        )
    }
}

export default ExcelPersonComponent;
