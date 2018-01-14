import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import _ from 'lodash';
import Files from '../../../api/files/files';
import IdeaCard from './IdeaCard';
import Loading from '../../components/Loading';
import Vieweds from '../../../api/vieweds/vieweds';

const composer = ({ idea, lap, handleRemove, showEdit, showNext }, onData) => {
    const subVieweds = Meteor.subscribe('vieweds.quantityNonByUser&Idea', idea._id);
    if (subVieweds.ready) {
        const vieweds = Vieweds.find({ userId: Meteor.userId(), ideaId: idea._id }).fetch();
        const nonViewed = vieweds.length;
        const subsFiles = Meteor.subscribe('files.list', idea.images || [''])
        if (subsFiles.ready()) {
            Meteor.call('area.get', idea.chief.areaId, (err, area) => {
                if (err) { console.log('err', err); return; }
                idea.area = area;
                const imagesCursor = Files.find({ _id: { $in: idea.images || [] } }).each();

                if (showNext) {
                    const lastState = _.last(idea.states);
                    _.each(Meteor.user().roles, myrol => {
                        const staterol = _.find(lastState.roles, { role: myrol })
                        console.log('staterol', staterol)
                        if (staterol) {
                            showNext = !staterol.onlyView;
                            return;
                        }
                    })
                }
                onData(null, { idea, imagesCursor, lap, handleRemove, showEdit, showNext, nonViewed });
            });
        }
    }
};

export default composeWithTracker(composer, Loading)(IdeaCard);
