import { createReducer, ORM } from 'redux-orm';

import { Category } from './categories';
import { Room } from './rooms';

// Model
const indexedModels = {
  [Category.modelName]: Category,
  [Room.modelName]: Room,
};
const models = Object.values(indexedModels).map((data) => data);

// ORM
export const orm = new ORM<typeof indexedModels>({ stateSelector: (state) => state.orm });
orm.register(...models);

// Reducer
export const reducer = createReducer(orm);
