import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert2';
import XLSX from 'xlsx';
import _ from 'lodash';

class ExcelUploaderComponent extends Component {

    state = {
        isLoading: false
    }

    componentDidMount() {
        this.setState(state => _.extend(state, { isLoading: true }))
    }

    load = e => {
        document.getElementById('file').click()
    }

    render() {
        const { isLoading, onLoad, icon } = this.props;

        return (
            <div to="#" className="btn btn-success btn-trans btn-action ideas-button" onClick={e => load(e)}>
                <i className="fa fa-file-excel-o"></i>
                <input id="file" type="file" onChange={e => xlsxParser(e.target && e.target.files[0] || undefined)} style={{ display: 'none' }} multiple="false" accept=".xls,.xlsx" />
            </div>
        )
    }
}

export default ExcelUploaderComponent;
