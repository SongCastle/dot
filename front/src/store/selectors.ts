import { createSelector } from '@reduxjs/toolkit';

import { orm } from './orm';
import type { Channel } from './progresses';
import { store } from './store';

// ORM Selector
const ormSelector = createSelector(store.getState, (state) => state.orm);
const latestCategoriesStateSelector = createSelector(ormSelector, (state) => {
  const categories = orm.session(state).Category.all().toRefArray();
  return categories.filter((category) => category.latest);
});
const roomStateSelector = createSelector(
  ormSelector,
  (state) => (roomId: string) => orm.session(state).Room.withId(roomId)?.ref,
);
const latestRoomsStateSelector = createSelector(ormSelector, (state) => {
  const rooms = orm.session(state).Room.all().toRefArray();
  return rooms.filter((room) => room.latest);
});
const categoryRoomsStateSelector = createSelector(ormSelector, (state) => (categoryId: string) => {
  const category = orm.session(state).Category.withId(categoryId);
  return category?.roomsM?.all().toRefArray() || [];
});

// Progress Selector
const progressStateSelector = createSelector(store.getState, (state) => state.progress);
const myProgressStateSelector = createSelector(
  progressStateSelector,
  (progress) => (channel: Channel) => progress[channel],
);

// ORM and Progress Selector (Combined)
export const latestCategoriesSelector = createSelector(
  latestCategoriesStateSelector,
  myProgressStateSelector,
  (s1, s2) => (channel: Channel) => ({
    categories: s1,
    status: s2(channel),
  }),
);
export const roomSelector = createSelector(
  roomStateSelector,
  myProgressStateSelector,
  (s1, s2) => (roomId: string, channel: Channel) => ({
    room: s1(roomId),
    status: s2(channel),
  }),
);
export const latestRoomsSelector = createSelector(
  latestRoomsStateSelector,
  myProgressStateSelector,
  (s1, s2) => (channel: Channel) => ({
    rooms: s1,
    status: s2(channel),
  }),
);
export const categoryRoomsSelector = createSelector(
  categoryRoomsStateSelector,
  myProgressStateSelector,
  (s1, s2) => (categoryId: string, channel: Channel) => ({
    rooms: s1(categoryId),
    status: s2(channel),
  }),
);
