import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import Loading from '../../components/Loading.js';

import ManagePage from '../../pages/manage/ManagePage';

const listStates = [
      { title: 'Ideas Nuevas (2)' },
      { title: 'Ideas Pendientes de Respuesta (2)' },
      { title: 'Ideas Pendientes en Plan de Acción (2)' },
      { title: 'Ideas en Stand By (3)' },
];

const composer = ({ match }, onData) => {

      onData(null, { listStates });

};

export default composeWithTracker(composer, Loading)(ManagePage);
