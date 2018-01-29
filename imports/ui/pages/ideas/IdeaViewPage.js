import React from 'react';
import { Link } from 'react-router-dom';
import NotFound from '../NotFound';
import IdeaCardContainer from '../../components/ideas/IdeaCardContainer';

const IdeaViewPage = (props) => {
    const { doc } = props;
    return doc ? (
        <div className="pageWrapper">
            <div className="pageheader">
                <h2>{doc && doc.opportunity}</h2>
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
                            <div className="panel-body ng-binding idea-view" style={{ display: 'flex', justifyContent: 'center' }}>
                                <IdeaCardContainer {...props} idea={doc} showNext={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    ) : <NotFound />
};

IdeaViewPage.propTypes = {
    doc: React.PropTypes.object
};

export default IdeaViewPage