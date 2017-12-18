import React from 'react';
import _ from 'lodash';
import { Grid, Row, Col, Thumbnail } from 'react-bootstrap';


import PersonCard from './PersonCard';
import PersonSearch from './PersonSearch';
import StatesSelect from './StatesSelect';
import StateCard from './StateCard';
import AreasSearch from '../../containers/areas/AreasSearch';
import FileUpload from '../files/FileUpload';


const IdeasUserStep3 = ({ images, attachImage, removeImage }) =>
    <div>
        <div className="row panel-body panel-body-mobile form-steps step-two">
            <div className="col-xs-12">
                <h2 className="stepH2">Adjuntar Archivo</h2>
                <div className="files">
                    <div className="file attachFile">
                        <FileUpload saveData={attachImage} />
                    </div>
                    <div className="file addPhoto"><i className="fa fa-camera" /></div>

                </div>
            </div>


        </div>
        <div className="images-list">

            {_.map(images, (imagePath, index) =>
                <div key={index} className="image-container" style={{ backgroundImage: `url(${imagePath})` }}>
                    <div className='image-remove' onClick={removeImage(imagePath).bind(this)}>
                        <div className='fa fa-trash'></div>
                    </div>
                </div>
            )}

        </div>
    </div>

export default IdeasUserStep3;
