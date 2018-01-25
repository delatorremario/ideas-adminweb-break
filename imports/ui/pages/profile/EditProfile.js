import React from 'react';
import ProfileEditor from '../../components/profile/ProfileEditor';
import { Link } from 'react-router-dom';
import NotFound from '../NotFound';

const EditProfile = (props) => {
    const user = props.user;
    return user ? (
        <div className="pageWrapper">
            <div className="pageheader">
                <h1>{user && user.origin}</h1>
                <p className="description">Profile</p>
                <div className="breadcrumb-wrapper hidden-xs">
                    <span className="label">Estás aquí:</span>
                    <ol className="breadcrumb">
                        <li>
                            <Link to="/">Profile</Link>
                        </li>
                        <li>Editar</li>
                        <li className="active">{user && user.emails && user.emails[0].address}</li>
                    </ol>
                </div>
            </div>
            <section id="main-content">
                <div className="row">
                    <div className="col-md-12 col-lg-12">
                        <div className="panel">
                            <div className="panel-body ng-binding">

                                <ProfileEditor {...props} />

                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    ) : <NotFound />
};

export default EditProfile
