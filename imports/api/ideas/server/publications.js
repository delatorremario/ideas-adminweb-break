import { Meteor } from 'meteor/meteor';
import _ from 'lodash';

import { check } from 'meteor/check';

import Ideas from '../ideas';
import Areas from '../../areas/areas';

Meteor.publish('ideas.list', (
  textSearch,
  statesCodesFilter,
  areasIdsFilter,
  filterUser,
  limit) => {

  check(textSearch, String);
  check(statesCodesFilter, [String]);
  check(areasIdsFilter, [String]);
  check(filterUser, Boolean);
  check(limit, Number);

  const self = this.Meteor;
  const user = self.user();
  if (!user) return;
  let filters = { corporationId: (user.profile && user.profile.corporationId) || '', };
  if (
    !Roles.userIsInRole(user._id, ['SuperAdminHolos']) &&
    !textSearch && !statesCodesFilter.length > 0 && !areasIdsFilter.length > 0
  ) {
    // _.extend(filters, { 'person._id': user && user.profile._id })
    _.extend(filters, {
      $or: [
        { 'person._id': user && user.profile._id },
        { 'collaborators._id': user && user.profile._id }
      ]
    })

  }

  if (textSearch) _.extend(filters, { $text: { $search: textSearch } });
  if (statesCodesFilter.length > 0) _.extend(filters, { 'states.code': { $in: statesCodesFilter } });
  if (areasIdsFilter.length > 0) _.extend(filters, { 'chief.areaId': { $in: areasIdsFilter } });
  if (filterUser) {
    const user = Meteor.user();
    _.extend(filters, { 'person._id': user && user.profile && user.profile._id })
  };
  return Ideas.find(
    filters,
    { sort: { date: 1 }, limit });
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
      const areas = Areas.find({ _id: { $in: user.profile.leaderAreasIds } }).fetch();
      let families = [];
      _.each(areas, area => families = _.union(families, area.family))
      _.extend(filters, {
        $or: [
          { 'person._id': user && user.profile._id },
          {
            'chief.areaId': { $in: families }
          }
        ]
      })
    }
    /// console.log('-- filters --', filters);
    return Ideas.find(filters, { sort: { date: 1 }, limit });

  } else return;
});


Meteor.publish('ideas.filters', (filters, limit) => {

  check(filters, Object);
  check(limit, Number);

  const self = this.Meteor;
  const user = self.user();
  if (!user) return;
  _.extend(filters, { corporationId: (user.profile && user.profile.corporationId) || '' });

  return Ideas.find(filters, { sort: { date: 1 }, limit });
})