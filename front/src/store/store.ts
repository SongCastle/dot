import { configureStore } from '@reduxjs/toolkit';

import { reducer as ormReducer, sagaMiddleware } from './orm';
import { reducer as progressReducer } from './progress';
import { reducer as routerReducer, routerMiddleware } from './router';

// Root Reducer
const rootReducer = {
  orm: ormReducer,
  progress: progressReducer,
  router: routerReducer,
};

// Store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware, routerMiddleware),
});

export const { dispatch } = store;
