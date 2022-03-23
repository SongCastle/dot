import { createReducer, ORM } from 'redux-orm';

import { Category } from './categories';
import { Post } from './posts';
import { Room } from './rooms';

// Model
const indexedModels = {
  [Category.modelName]: Category,
  [Post.modelName]: Post,
  [Room.modelName]: Room,
};
const models = Object.values(indexedModels).map((data) => data);

// ORM
const orm = new ORM<typeof indexedModels>({ stateSelector: (state) => state.orm });
orm.register(...models);

// Session
type RootORMState = ReturnType<typeof orm.getEmptyState>;
const newSession = (state?: RootORMState) => orm.session(state || orm.getEmptyState());
export const newCatgeorySession = (state?: RootORMState) => newSession(state).Category;
export const newPostSession = (state?: RootORMState) => newSession(state).Post;
export const newRoomSession = (state?: RootORMState) => newSession(state).Room;

// Reducer
export const reducer = createReducer(orm);
