import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading.js';
import CommentComponent from '../../components/comments/CommentComponent';
import moment from 'moment';

const composer = ({ text, date, userId }, onData) => {
    name = 'Pepe';
    img = 'url("http://localhost:3000/cdn/storage/Files/EqSsJ9pqaAkKwWT5X/original/EqSsJ9pqaAkKwWT5X")';
    onData(null, { text, date, name, img });
};

export default composeWithTracker(composer, Loading)(CommentComponent);