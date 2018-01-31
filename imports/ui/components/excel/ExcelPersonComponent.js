import React, { Component, PropTypes } from 'react';
import ExcelUploaderComponent from './ExcelUploaderComponent';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert2';
import XLSX from 'xlsx';
import _ from 'lodash';

class ExcelPersonComponent extends Component {

    state = {
        isLoading: '',
        total: undefined,
        person: undefined
    }

    componentDidMount() {
        this.setState({
            status: 'idle',
            onLoad: this.xlsxReceptor,
            icon: 'fa fa-file-excel-o'
        })
    }

    xlsxReceptor = e => {
        e.persist();
        const file = e.currentTarget.files[0];
        if (file && /xls|xlsx|/i.test(file.extension)) {
            const name = file.name;
            const size = (file.size / (1000000)).toFixed(2) + 'MB';
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
                this.xlsxParser(e, (persons, error) => {
                    console.log('persons', persons);
                    /* Acá habría que poner el upsert */
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
                });
            }, (dismiss) => {
                console.log(dismiss)
            })
        }
    }

    xlsxParser = (evt, callback) => {
        const target = evt.target;
        const reader = new FileReader();
        let setState = this.setState;
        this.nombreArchivo = target.files[0].name;
        reader.onload = function (e) {
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            var data = XLSX.utils.sheet_to_json(ws, { header: 1 });
            const header = data[0];
            if (header !== 10) {
                callback(undefined, 'Formato incorrecto: cantidad de comlumnas incorrecta');
            } else {
                let persons = [];
                data = _.remove(data, d => !_.isEqual(d, header))
                console.log('data', header, data);
                setState(prev => ({
                    total: data.length,
                    person: 0
                }))
                _.each(data, (d, index) => {
                    setState(prev => ({
                        person: index
                    }))
                    const person = {
                        masterCode: d[0] || '',
                        rut: d[1] || '',
                        lastName: d[2] || '',
                        secondLastName: d[3] || '',
                        firstName: d[4] || '',
                        secondName: d[5] || '',
                        email: d[6] || '',
                        group: d[7] || '',
                        managerCode: d[8] || '',
                        areaCode: d[9] || ''
                    };
                    persons = _.concat(persons, person);
                })
                callback(persons, undefined);
            }
        };
        reader.readAsBinaryString(target.files[0]);
    }

    render() {
        const { status, onLoad, icon, person, total } = this.state;
        return (
            <div>
                {total && person && person + '/' + total}
                <ExcelUploaderComponent status={status} onLoad={onLoad} icon={icon} />
            </div>
        )
    }
}

export default ExcelPersonComponent;