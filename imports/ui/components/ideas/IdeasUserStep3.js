import React from 'react';
import _ from 'lodash';
import { Grid, Row, Col, Thumbnail } from 'react-bootstrap';


import PersonCard from '../persons/PersonCard';
import PersonSearch from '../persons/PersonSearch';
import StatesSelect from './StatesSelect';
import StateCard from './StateCard';
import AreasSearch from '../../containers/areas/AreasSearch';
import FileUpload from '../files/FileUpload';
import Photo from '../photo/photo';

const IdeasUserStep3 = ({ images, attachImage, removeImage }) =>
    <div>
        <div className="row panel-body panel-body-mobile form-steps step-two">
            <div className="col-xs-12">
                <h2 className="stepH2">Adjuntar Archivo</h2>
                <div className="files">
                    <div className="file attachFile">
                        <FileUpload saveData={attachImage} />
                    </div>
                    <Photo saveData={attachImage} />
                </div>
            </div>
        </div>
        <div className="images-list">

            {_.map(images, (image, index) =>
                <div key={index} className="image-container" style={{backgroundImage: `url(${image.link()}`}} >
                    <div className='image-remove' onClick={removeImage(image).bind(this)}>
                        <div className='fa fa-trash'></div>
                    </div>
                    {/* <img style={{border:"4px solid red"}} src={image.link()} /> */}
                </div>
            )}

        </div>
    </div>

export default IdeasUserStep3;
