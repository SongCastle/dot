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
const orm = new ORM<typeof indexedModels>({ stateSelector: (state) => state.orm });
orm.register(...models);

// Selector
type ORMRootState = ReturnType<typeof orm.getEmptyState>;

export const latestCategoriesORMSelector = (state: ORMRootState) => {
  const categories = orm.session(state).Category.all().toRefArray();
  return categories.filter((category) => category.latest);
};
export const categoryRoomsORMSelector = (state: ORMRootState, category_id: string) => {
  const category = orm.session(state).Category.withId(category_id);
  return category?.roomsM?.all().toRefArray() || [];
};
export const latestRoomsORMSelector = (state: ORMRootState) => {
  const rooms = orm.session(state).Room.all().toRefArray();
  return rooms.filter((room) => room.latest);
};

// Reducer
export const reducer = createReducer(orm);
