import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { ReactiveVar } from 'meteor/reactive-var';
import Ideas from '../../../api/ideas/ideas';
import EditIdeaUser from '../../pages/ideas/EditIdeaUser';
import Loading from '../../components/Loading.js';
import Persons from '../../../api/persons/persons';
import States from '../../../api/states/states';

const textSearch = new ReactiveVar('');
const textSearchLimit = new ReactiveVar(10);
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
  const user = Meteor.user();
  const email = user && user.emails && user.emails[0] && user.emails[0].address;
  const subscriptionPersons = Meteor.subscribe('persons.search', textSearch.get(), false, false, false, textSearchLimit.get());
  let subscriptionPerson = Meteor.subscribe('persons.email', email);
  const statessub = Meteor.subscribe('states.list');
  // const subscriptionAreas = Meteor.subscribe('areas.list');
  if (subscription.ready() && subscriptionPerson.ready() && subscriptionPersons.ready() && statessub.ready()) {
    const persons = Persons.find({ email: { $ne: email } }, { sort: { score: -1 }, limit: textSearchLimit.get() }).fetch();
    let doc = Ideas.findOne(docId);
    if (doc) {
      doc.date = (new Date(doc.date)).toISOString();
    } else {
      doc = { date: new Date().toISOString() };
      if (Meteor.isCordova) _.extend(doc, { origin: 'Mobile' })
      else _.extend(doc, { origin: 'Web' })
      const state = States.findOne({}, { sort: { code: 1 } });
      _.extend(state, { createdAt: new Date });
      const person = Persons.findOne({ email });
      _.extend(doc, { person, states: [state] })
    }
    onData(null, { doc, persons, driversArray, textSearch });
  }
};

export default composeWithTracker(composer, Loading)(EditIdeaUser);
