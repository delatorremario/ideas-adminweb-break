import { Meteor } from 'meteor/meteor'
import { composeWithTracker } from 'react-komposer'
import Corporations from '../../../api/corporations/corporations.js'
import ViewCorporation from '../../pages/corporations/ViewCorporation.js'
import Loading from '../../components/Loading.js'

const composer = ({ match }, onData) => {
  const corporationId = match.params._id
  const subscription = Meteor.subscribe('corporation.view', corporationId)

  if (subscription.ready()) {
    const doc = Corporations.findOne(corporationId)
    onData(null, { doc })
  }
}

export default composeWithTracker(composer, Loading)(ViewCorporation)