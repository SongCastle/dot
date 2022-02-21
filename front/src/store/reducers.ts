import { combineReducers } from '@reduxjs/toolkit';

import { reducer as logoReducer } from './logo';
import { reducer as ormReducer } from './orm';
import { reducer as uiReducer } from './ui';
import { reducer as routerReducer } from './router';

// Root Reducer
export const rootReducer = combineReducers({
  logo: logoReducer,
  orm: ormReducer,
  ui: uiReducer,
  router: routerReducer,
});

// Root State
export type RootState = ReturnType<typeof rootReducer>;
