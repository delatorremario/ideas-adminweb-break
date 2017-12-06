import React from 'react';
import IdeaUserEditor from '../../components/ideas/IdeaUserEditor';
import { Link } from 'react-router-dom';
import NotFound from '../NotFound';

const EditIdeaUser = (props) => {
    const doc = props.doc;
    return doc ? (
        <div className="pageWrapper">
            <div className="pageheader">
                <h1>{doc && doc.origin}</h1>

                <div className="breadcrumb-wrapper hidden-xs">
                    <span className="label">Estás aquí:</span>
                    <ol className="breadcrumb">
                        <li>
                            <Link to="/">Area</Link>
                        </li>
                        <li>Editar</li>
                        <li className="active">{doc && doc.origin}</li>
                    </ol>
                </div>
            </div>
            <section id="main-content">
                <div className="row">
                    <div className="col-md-12 col-lg-12">
                        <div className="panel">
                            <div className="panel-body ng-binding">

                                <IdeaUserEditor {...props}/>

                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    ) : <NotFound />
};

EditIdeaUser.propTypes = {
    doc: React.PropTypes.object
};

export default EditIdeaUser
