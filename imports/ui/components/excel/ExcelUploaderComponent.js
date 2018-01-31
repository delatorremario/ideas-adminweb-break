import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert2';
import _ from 'lodash';

class ExcelUploaderComponent extends Component {

    load = e => {
        document.getElementById('file').click()
    }

    render() {
        const { status, onLoad, icon, index, total } = this.props;
        let fa = '';
        let btn = '';
        switch (status) {
            case 'idle':
                fa = icon;
                btn = 'btn-success';
                break;

            case 'uploading':
                fa = 'fa fa-spinner fa-pulse';
                btn = 'btn-info';
                break;

            default:
                break;
        }
        return (
            <div>
                <div to="#" className={`btn ${btn} btn-trans btn-action ideas-button`} onClick={e => this.load(e)}>
                    <i className={fa}></i>
                    <input id="file"
                        type="file"
                        onChange={e => onLoad(e)}
                        style={{ display: 'none' }}
                        multiple="false"
                        accept=".xls,.xlsx"
                        disabled={status === 'uploading' ? true : false} />
                </div>
                {
                    index !== total &&
                    <div to="#" className="btn btn-info ideas-button">
                        <div style={{ zoom: '0.5 !importants' }}>{((index / total) * 100).toFixed(0)}%</div>
                    </div>
                }
            </div>
        )
    }
}

export default ExcelUploaderComponent;
