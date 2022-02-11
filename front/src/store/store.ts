import { configureStore } from '@reduxjs/toolkit';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

import { CategoryAPIActionLabel, RoomAPIActionLabel } from './api';
import { push, routerMiddleware } from './router';
import { rootReducer } from './reducers';
import { sagaMiddleware } from './sagas';

// Store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          ...Object.values(CategoryAPIActionLabel),
          ...Object.values(RoomAPIActionLabel),
        ],
      },
      thunk: false,
    }).concat(sagaMiddleware, routerMiddleware),
});

export const { dispatch } = store;
export const dispatchPath = (path: string) => {
  dispatch(push(path));
};
export const useQueryString = () => queryString.parse(useLocation().search);
