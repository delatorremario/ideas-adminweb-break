import ExcelUploaderComponent from './ExcelUploaderComponent';
import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert2';
import XLSX from 'xlsx';
import _ from 'lodash';

class ExcelPersonComponent extends Component {

    state = {
        isLoading: '',
        total: undefined,
        index: undefined
    }

    componentDidMount() {
        this.setState({
            status: 'idle',
            onLoad: this.xlsxReceptor,
            icon: 'fa fa-upload'
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
                    e.target.value = '';
                    if (error) {
                        Bert.alert(error, 'danger');
                        this.setState(prev => ({
                            status: 'idle',
                            icon: 'fa fa-times'
                        }))
                        setTimeout(() => {
                            this.setState(prev => ({
                                icon: 'fa fa-upload'
                            }))
                        }, 1000);
                    } else {
                        this.setState(prev => ({
                            total: persons.length,
                            index: 0
                        }))
                        let count = 0;
                        _.each(persons, (person, index) => {
                            Meteor.call('persons.update', [person], (err, resp) => {
                                if (err) {
                                    Bert.alert(err, 'danger');
                                    this.setState(prev => ({
                                        status: 'idle',
                                        icon: 'fa fa-times'
                                    }))
                                    setTimeout(() => {
                                        this.setState(prev => ({
                                            icon: 'fa fa-upload'
                                        }))
                                    }, 1000);
                                } else {
                                    count++;
                                    this.setState(prev => ({
                                        index: count
                                    }))
                                    if (count === persons.length) {
                                        Bert.alert(persons.length === 1 ? '1 persona cargada.' : persons.length + ' personas cargadas.', 'success');
                                        this.setState(prev => ({
                                            status: 'idle',
                                            icon: 'fa fa-check'
                                        }))
                                        setTimeout(() => {
                                            this.setState(prev => ({
                                                icon: 'fa fa-upload'
                                            }))
                                        }, 2000);
                                    }
                                }
                            })
                        })
                    }
                });
            }, (dismiss) => {
                e.target.value = '';
            })
        } else {
            e.target.value = '';
        }
    }

    xlsxParser = (evt, callback) => {
        const target = evt.target;
        const reader = new FileReader();
        reader.onload = function (e) {
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            var data = XLSX.utils.sheet_to_json(ws, { header: 1 });
            const header = data[0];
            if (
                header[0] !== 'masterCode' &&
                header[1] !== 'rut' &&
                header[2] !== 'lastName' &&
                header[3] !== 'secondLastName' &&
                header[4] !== 'firstName' &&
                header[5] !== 'secondName' &&
                header[6] !== 'email' &&
                header[7] !== 'group' &&
                header[8] !== 'managerCode' &&
                header[9] !== 'areaCode'
            ) {
                callback(undefined, 'Formato incorrecto.');
            } else {
                let persons = [];
                data = _.remove(data, d => !_.isEqual(d, header))
                _.each(data, (d, index) => {
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
        const { status, onLoad, icon, index, total } = this.state;
        return (
            <div>
                <ExcelUploaderComponent status={status} onLoad={onLoad} icon={icon} index={index} total={total} />
            </div>
        )
    }
}

export default ExcelPersonComponent;
