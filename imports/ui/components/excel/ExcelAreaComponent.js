import ExcelUploaderComponent from './ExcelUploaderComponent';
import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert2';
import XLSX from 'xlsx';
import _ from 'lodash';

class ExcelAreasComponent extends Component {

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
                this.xlsxParser(e, (areas, error) => {
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
                            total: areas.length,
                            index: 0
                        }))
                        let count = 0;
                        _.each(areas, (area, index) => {
                            Meteor.call('areas.update', [area], (err, resp) => {
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
                                    if (count === areas.length) {
                                        Bert.alert(areas.length === 1 ? '1 persona cargada.' : areas.length + ' personas cargadas.', 'success');
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
                header[0] !== 'code' &&
                header[1] !== 'name' &&
                header[2] !== 'type' &&
                header[3] !== 'parent' &&
                header[4] !== 'functional'
            ) {
                callback(undefined, 'Formato incorrecto.');
            } else {
                let areas = [];
                data = _.remove(data, d => !_.isEqual(d, header))
                _.each(data, (d, index) => {
                    const person = {
                        code: d[0] || '',
                        name: d[1] || '',
                        type: d[2] || '',
                        parent: d[3] || '',
                        functional: d[4] || ''
                    };
                    areas = _.concat(areas, person);
                })
                callback(areas, undefined);
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

export default ExcelAreasComponent;
