import React from 'react';
import _ from 'lodash';
import { FormGroup, FormControl } from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';

import PersonCard from './PersonCard';
import PersonSearch from './PersonSearch';

const IdeasStep1 = ({ onChangeForm, data, handleChangeDate, onChangeSearchPerson, persons, selectPerson, origins, selectOrigin }) =>

    (
        <div className="form-steps step-one">
            <h2>Fecha de Creación</h2>
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

            <h2>Medio de Captura la Idea</h2>
            <div className="form-group">
                <div className="col-md-6">
                    {_.map(origins, (origin, index) =>
                        <button key={index}
                            onClick={selectOrigin(origin).bind(this)}
                            className={origin === data.origin ? 'btn btn-sm btn-success' : 'btn btn-sm btn-trans'}>{origin}</button>
                    )}
                </div>
            </div>

            <h2>Selección de Persona dueña de la Idea</h2>
            {
                data && data.person && <PersonCard person={data.person} removePerson={selectPerson} />
            }

            {
                data && !data.person && <PersonSearch persons={persons} onChangeSearchPerson={onChangeSearchPerson} selectPerson={selectPerson} />
            }

        </div>
    );

export default IdeasStep1;
