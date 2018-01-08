import { Meteor } from 'meteor/meteor';
import _ from 'lodash';

import { check } from 'meteor/check';

import Ideas from '../ideas';
import Areas from '../../areas/areas';

Meteor.publish('ideas.list', (
  textSearch,
  statesCodesFilter,
  areasIdsFilter,
  limit) => {

  check(textSearch, String);
  check(statesCodesFilter, [String]);
  check(areasIdsFilter, [String]);
  check(limit, Number);

  const self = this.Meteor;
  const user = self.user();

  if (user) {

    const filters = {
      corporationId: (user.profile && user.profile.corporationId) || '',
    };

    if (!Roles.userIsInRole(user._id, ['SuperAdminHolos'])) {
      _.extend(filters, { 'person._id': user && user.profile._id })
    }
    if (Roles.userIsInRole(user._id, ['Leader'])) {
      const area = Areas.findOne({ _id: user.profile.leaderAreaId })
      _.extend(filters, {
        $or: [
          { 'person._id': user && user.profile._id },
          { 'chief.areaId': { $in: area.family } }
        ]
      })
    }
    console.log(' --- publis areas filters --- ', filters)
    if (textSearch) _.extend(filters, { $text: { $search: textSearch } });
    if (statesCodesFilter.length > 0) _.extend(filters, { 'states.code': { $in: statesCodesFilter } });
    if (areasIdsFilter.length > 0) _.extend(filters, { 'chief.areaId': { $in: areasIdsFilter } });

    // console.log('areasIdsFilter', areasIdsFilter);
    // console.log('FILTERS', filters);

    return Ideas.find(
      filters,
      { sort: { date: 1 }, limit });

  } else return;
});

Meteor.publish('ideas.view', (_id) => {
  console.log('publish ideas.view');
  check(_id, String);
  return Ideas.find(_id);
});


Meteor.publish('ideas.state.list', (filters, limit) => {
  check(filters, Object);
  check(limit, Number);

  const self = this.Meteor;
  const user = self.user();

  if (user) {

    _.extend(filters, { corporationId: (user.profile && user.profile.corporationId) || '' });
    if (Roles.userIsInRole(user._id, ['Leader'])) {
      const area = Areas.findOne({ _id: user.profile.leaderAreaId })
      _.extend(filters, {
        $or: [
          { 'person._id': user && user.profile._id },
          { 'chief.areaId': { $in: area.family } }
        ]
      })
    }
    return Ideas.find(filters, { sort: { date: 1 }, limit });

  } else return;
});