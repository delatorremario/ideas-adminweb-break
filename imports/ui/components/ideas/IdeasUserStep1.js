import React from 'react';
import _ from 'lodash';
import PersonCard from '../persons/PersonCard';
import PersonSearch from '../persons/PersonSearch';
import StatesSelect from './StatesSelect';
import StateCard from './StateCard';
import AreasSearch from '../../containers/areas/AreasSearch';

const IdeasUserStep1 = ({ selectArea, areaSelected }) =>

    (
        <div className="row panel-body panel-body-mobile form-steps step-two">
            <div className="col-xs-12">
                <h2 className="stepH2">Selección de Área de Destino</h2>
                <AreasSearch {...this.props} selectArea={selectArea} areaSelected={areaSelected} />
            </div>
        </div>
    );

export default IdeasUserStep1;
