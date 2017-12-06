import React from 'react';
import _ from 'lodash';
import PersonCard from './PersonCard';
import PersonSearch from './PersonSearch';
import StatesSelect from './StatesSelect';
import StateCard from './StateCard';
import AreasSearch from '../../containers/areas/AreasSearch';

const IdeasUserStep3 = ({ selectArea, areaSelected }) =>

    (
        <div className="row panel-body panel-body-mobile form-steps step-two">
            <div className="col-xs-12">
                <h2 className="stepH2">Adjuntar Archivo</h2>
                <div className="files">
                    <div className="file attachFile"><i className="fa fa-paperclip" /></div>
                    <div className="file addPhoto"><i className="fa fa-camera" /></div>
                </div>
            </div>
        </div>
    );

export default IdeasUserStep3;
