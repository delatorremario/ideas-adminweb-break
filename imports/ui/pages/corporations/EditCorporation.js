import React from 'react'
import CorporationEditor from '../../components/corporations/CorporationEditor'
import { Link } from 'react-router-dom'
import NotFound from '../NotFound'

const EditCorporation = (props) => {
    const doc = props.doc;
    return doc ? (
        <div className="pageWrapper">
            <div className="pageheader">
                <h1>{doc && doc.name}</h1>

                <div className="breadcrumb-wrapper hidden-xs">
                    <span className="label">Estás aquí:</span>
                    <ol className="breadcrumb">
                        <li>
                            <Link to="/">Corporación</Link>
                        </li>
                        <li>Editar</li>
                        <li className="active">{doc && doc.name}</li>
                    </ol>
                </div>
            </div>
            <section id="main-content">
                <div className="row">
                    <div className="col-md-12 col-lg-12">
                        <div className="panel">
                            <div className="panel-body ng-binding">

                                <CorporationEditor {...props}/>

                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    ) : <NotFound />
};

EditCorporation.propTypes = {
    doc: React.PropTypes.object
};

export default EditCorporation
