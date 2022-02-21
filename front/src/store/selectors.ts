import { createSelector } from '@reduxjs/toolkit';
import isEqual from 'react-fast-compare';
import { useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

import { selectLogo } from './logo';
import { newCatgeorySession, newRoomSession } from './orm';
import type { Channel } from './ui';
import type { RootState } from './reducers';

type TypedUseAppSelectorHook = TypedUseSelectorHook<RootState>;
export const useAppSelector: TypedUseAppSelectorHook = useSelector;
export const useAppObjectSelector: TypedUseAppSelectorHook = (selector, equalityFn?) =>
  useSelector(selector, equalityFn || isEqual);

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
      .filter((category) => categoryIds.includes(category.id))
      .orderBy((category) => category.id, 'desc')
      .toRefArray(),
);

const categoryRoomsStateSelector = createSelector(ormSelector, (state) => (categoryId: string) => {
  const category = newCatgeorySession(state).withId(categoryId);
  return category?.roomsM?.all().toRefArray() || [];
});

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
export const roomStateSelector = createSelector(
  ormSelector,
  (state) => (roomId: string) => newRoomSession(state).withId(roomId)?.ref,
);

export const roomsStateSelector = createSelector(
  ormSelector,
  (state) => (roomIds: string[]) =>
    newRoomSession(state)
      .filter((room) => roomIds.includes(room.id))
      .orderBy((room) => room.id, 'desc')
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

// ORM and Progress Selector (Combined)
// TODO: Combined やめるべきかも ... ?
export const roomSelector = createSelector(
  roomStateSelector,
  myUIStateSelector,
  (s1, s2) => (roomId: string, channel: Channel) => ({
    room: s1(roomId),
    status: s2(channel),
  }),
);
export const categoryRoomsSelector = createSelector(
  categoryRoomsStateSelector,
  myUIStateSelector,
  (s1, s2) => (categoryId: string, channel: Channel) => ({
    rooms: s1(categoryId),
    status: s2(channel),
  }),
);
