import React, { Component } from 'react';

class IndividualFile extends Component {
    
    render() {
        return <div>
            <div className="row">
                <div className="col-sm-4">
                    <strong>{this.props.fileName}</strong>
                </div>

                <div className="col-sm-2">
                    <a href={this.props.fileUrl} className="btn btn-outline btn-primary btn-sm"
                        target="_blank">View</a>
                </div>

                <div className="col-sm-2">
                    <button onClick={this.removeFile} className="btn btn-outline btn-danger btn-sm">
                        Delete
                     </button>
                </div>

                <div className="col-sm-2">
                    Size: {this.props.fileSize}
                </div>
            </div>
        </div>
    }
};

IndividualFile.propTypes = {
    fileName: React.PropTypes.string.isRequired,
    fileSize: React.PropTypes.number.isRequired,
    fileUrl: React.PropTypes.string,
    fileId: React.PropTypes.string.isRequired
}

export default IndividualFile;
