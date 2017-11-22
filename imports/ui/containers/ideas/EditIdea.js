import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { ReactiveVar } from 'meteor/reactive-var';

import Ideas from '../../../api/ideas/ideas';
import EditIdea from '../../pages/ideas/EditIdea';
import Loading from '../../components/Loading.js';
import Persons from '../../../api/persons/persons';
import States from '../../../api/states/states';

const textSearch = new ReactiveVar('');
const textSearchLimit = new ReactiveVar(10);

const origins = ['Email', 'Yammer', 'Formulario', 'Conversación', 'Otros'];

const driversArray = [
  { driver: 'Seguridad', placeHolder: 'Proporcionar un ambiente más seguro para todos los trabajadores' },
  { driver: 'Personas', placeHolder: 'Desarrollar la organización más productiva y efectiva' },
  { driver: 'Compromiso', placeHolder: 'Crear una cultura aspiracional' },
  { driver: 'Producción', placeHolder: 'Alcanzar utilización, rendimiento y recuperación de clase mundial' },
  { driver: 'Gasto Externo', placeHolder: 'Reducir los costos totales con proveedores externos tornando la operación más eficiente' },
  { driver: 'Mantenimiento', placeHolder: 'Optimizar la disponibilidad con estrategia y ejecución de primera clase' },
];

const composer = ({ match }, onData) => {
  const docId = match.params._id || '';
  const subscription = Meteor.subscribe('ideas.view', docId);

  const subscriptionPersons = Meteor.subscribe('persons.search', textSearch.get(), textSearchLimit.get());
  const statessub = Meteor.subscribe('states.list');
  
  // const subscriptionAreas = Meteor.subscribe('areas.list');

  if (subscription.ready() && subscriptionPersons.ready() && statessub.ready()) {
    const ideasstates = States.find().fetch();
    const persons = Persons.find({}, { sort: { score: -1 }, limit: textSearchLimit.get() }).fetch();
    let doc = Ideas.findOne(docId);

    if (doc) {
      doc.date = (new Date(doc.date)).toISOString();
    } else {
      doc = { date: new Date().toISOString() };
    }

    onData(null, { doc, textSearch, persons, driversArray, origins, ideasstates });
  }
};

export default composeWithTracker(composer, Loading)(EditIdea);
