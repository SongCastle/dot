import { createSelector } from '@reduxjs/toolkit';

import { selectLogo } from './logo';
import { newCatgeorySession, newPostSession, newRoomSession } from './orm';
import type { PostState } from './orm';
import type { Channel } from './ui';
import type { RootState } from './reducers';

const idComparator = Intl.Collator(undefined, { numeric: true }).compare;

// Root Selector
const selectSelf = (state: RootState) => state;

// Logo Selector
const logoSelector = createSelector(selectSelf, (state) => state.logo);
export const logoStateSelector = createSelector(logoSelector, (state) => selectLogo(state.num));

// ORM Selector
const ormSelector = createSelector(selectSelf, (state) => state.orm);

export const categoryStateSelector = createSelector(
  ormSelector,
  (state) => (categoryId: string) => {
    const category = newCatgeorySession(state).withId(categoryId);
    return category?.ref;
  },
);

export const categoriesStateSelector = createSelector(
  ormSelector,
  (state) => (categoryIds: string[]) =>
    newCatgeorySession(state)
      .sortBy(({ id }, category) => idComparator(id, category.id), false)
      .filter(({ id }) => categoryIds.includes(id))
      .toRefArray(),
);

export const categoriesStateChecker = createSelector(
  ormSelector,
  (state) => (categoryIds?: string[]) =>
    !categoryIds?.length ||
    categoryIds.every((categoryId) => newCatgeorySession(state).idExists(categoryId)),
);

export const roomMainCategoryStateSelector = createSelector(
  ormSelector,
  (state) => (roomId: string) => {
    const room = newRoomSession(state).withId(roomId);
    return room?.mainCategoryM?.ref;
  },
);
export const roomSubCategoriesStateSelector = createSelector(
  ormSelector,
  (state) => (roomId: string) => {
    const room = newRoomSession(state).withId(roomId);
    return room?.subCategoriesM?.all().toRefArray() || [];
  },
);

export const postsStateSelector = createSelector(
  ormSelector,
  (state) => (filter: (post: PostState) => boolean, offset?: string) => {
    const filterWithOffset = offset
      ? (post: PostState) => idComparator(post.id, offset) < 0 && filter(post)
      : filter;
    return newPostSession(state)
      .sortBy(({ id }, post) => idComparator(id, post.id), false)
      .filter(filterWithOffset)
      .toRefArray();
  },
);

export const roomStateSelector = createSelector(
  ormSelector,
  (state) => (roomId: string) => newRoomSession(state).withId(roomId)?.ref,
);

export const roomsStateSelector = createSelector(
  ormSelector,
  (state) => (roomIds: string[]) =>
    newRoomSession(state)
      .filter(({ id }) => roomIds.includes(id))
      .sortBy(({ id }, room) => idComparator(id, room.id), false)
      .toRefArray(),
);

export const roomsStateChecker = createSelector(
  ormSelector,
  (state) => (roomIds?: string[]) =>
    !roomIds?.length || roomIds.every((roomId) => newRoomSession(state).idExists(roomId)),
);

// UI Selector
const uiStateSelector = createSelector(selectSelf, (state) => state.ui);
export const myUIStateSelector = createSelector(
  uiStateSelector,
  (progress) => (channel: Channel) => progress[channel],
);
