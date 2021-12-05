import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

import { orm } from './orm';
import type { AppOrmState } from './orm';
import type { Channel, ProgressState } from './progress';
import type { RouterState } from './router';

// State
export type RootState = {
  orm: AppOrmState;
  progress: ProgressState;
  router: RouterState;
};
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Root Selector
const selectSelf = (state: RootState) => state;

// ORM Selector
const ormSelector = createSelector(selectSelf, (state) => state.orm);
export const categoryStateSelector = createSelector(
  ormSelector,
  (state) => (categoryId: string) => {
    const category = orm.session(state).Category.withId(categoryId);
    return category?.ref;
  },
);
const latestCategoriesStateSelector = createSelector(ormSelector, (state) => {
  const categories = orm.session(state).Category.all().toRefArray();
  return categories.filter((category) => category.latest);
});
export const roomMainCategoryStateSelector = createSelector(
  ormSelector,
  (state) => (roomId: string) => {
    const room = orm.session(state).Room.withId(roomId);
    return room?.mainCategoryM?.ref;
  },
);
export const roomSubCategoriesStateSelector = createSelector(
  ormSelector,
  (state) => (roomId: string) => {
    const room = orm.session(state).Room.withId(roomId);
    return room?.subCategoriesM?.all().toRefArray() || [];
  },
);
export const roomStateSelector = createSelector(
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

export const categoriesStateChecker = createSelector(
  ormSelector,
  (state) => (categoryIds?: string[]) =>
    !categoryIds?.length ||
    categoryIds.every((categoryId) => orm.session(state).Category.idExists(categoryId)),
);

export const roomsStateChecker = createSelector(
  ormSelector,
  (state) => (roomIds?: string[]) =>
    !roomIds?.length || roomIds.every((roomId) => orm.session(state).Room.idExists(roomId)),
);

// Progress Selector
const progressStateSelector = createSelector(selectSelf, (state) => state.progress);
export const myProgressStateSelector = createSelector(
  progressStateSelector,
  (progress) => (channel: Channel) => progress[channel],
);

// ORM and Progress Selector (Combined)
// TODO: Combined やめるべきかも ... ?
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const latestRoomsSelector = createSelector(
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
