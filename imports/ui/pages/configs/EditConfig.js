import React from 'react';
import { Link } from 'react-router-dom';
import NotFound from '../NotFound';

import ConfigEditor from '../../components/configs/ConfigEditor';

const EditConfig = (props) => {
    const doc = props.doc;
    return doc ? (
        <div className="pageWrapper">
            <div className="pageheader">
                {/* <h1>{doc && doc.step} {doc && doc.state}</h1> */}
                <h1>Editar Configuración</h1>

                <div className="breadcrumb-wrapper hidden-xs">
                    <span className="label">Estás aquí:</span>
                    <ol className="breadcrumb">
                        <li>
                            <Link to="/config">Config</Link>
                        </li>
                        <li>Editar</li>
                        <li className="active">{doc && doc.step} {doc && doc.state}</li>
                    </ol>
                </div>
            </div>
            <section id="main-content">
                <div className="row">
                    <div className="col-md-12 col-lg-12">
                        <div className="panel">
                            <div className="panel-body ng-binding">

                                <ConfigEditor {...props}/>

                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    ) : <NotFound />
};

EditConfig.propTypes = {
    doc: React.PropTypes.object
};

export default EditConfig
