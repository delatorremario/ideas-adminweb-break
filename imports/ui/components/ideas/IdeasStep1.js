import React from 'react';
import _ from 'lodash';

import PersonCard from './PersonCard';
import PersonSearch from './PersonSearch';

const IdeasStep1 = ({ onChangeForm, data, onChangeSearchPerson, persons, selectPerson, origins, selectOrigin }) =>

    (
        <div className="form-steps step-one">
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
