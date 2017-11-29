import React from 'react';
import _ from 'lodash';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';

import PersonCard from './PersonCard';
import PersonSearch from './PersonSearch';

const IdeasStep1 = ({ onChangeForm, data, handleChangeDate, onChangeSearchPerson, persons, selectPerson, origins, selectOrigin }) => (

    <div className="row panel-body form-steps step-one">
        <div className="col-md-6 datePicker">
            <FormGroup>
                <ControlLabel>Fecha de Creación</ControlLabel>
                <i className="fa fa-calendar"></i>
                <DatePicker
                    id="date"
                    value={data.date}
                    onChange={handleChangeDate}
                    dateFormat={'DD MM YYYY'}
                    dayLabels={['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']}
                    monthLabels={['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']}
                    showTodayButton={true}
                    todayButtonLabel={'Hoy'}
                />
            </FormGroup>
        </div>

        <div className="col-xs-12 labelPicker">
            <div className="form-group">
                <ControlLabel>Medio de Captura la Idea</ControlLabel>
                <div>
                    {_.map(origins, (origin, index) =>
                        <button key={index}
                            onClick={selectOrigin(origin).bind(this)}
                            className={"btn btn-sm " + (origin === data.origin ? 'btn-success' : 'btn-trans btn-default')}>{origin}
                        </button>
                    )}
                </div>
            </div>
        </div>


        {
            data && data.person && <PersonCard className="personCard" person={data.person} removePerson={selectPerson} />
        }
        {
            data && !data.person && <PersonSearch className="personSearch" persons={persons} onChangeSearchPerson={onChangeSearchPerson} selectPerson={selectPerson} />
        }


    </div>
);

export default IdeasStep1;
