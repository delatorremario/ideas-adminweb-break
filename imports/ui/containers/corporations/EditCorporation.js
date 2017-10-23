import { Meteor } from 'meteor/meteor'
import { composeWithTracker } from 'react-komposer'
import Corporations from '../../../api/corporations/corporations'
import EditCorporation from '../../pages/corporations/EditCorporation'
import Loading from '../../components/Loading.js'

const composer = ({ match }, onData) => {
  const docId = match.params._id
  const subscription = Meteor.subscribe('corporation.view', docId)

  if (subscription.ready()) {
    const doc = Corporations.findOne(docId)
    onData(null, { doc })
  }
}

export default composeWithTracker(composer, Loading)(EditCorporation)
