import { attr, many, Model } from 'redux-orm';
import type { ModelType, Ref } from 'redux-orm';

import type { RoomActionType } from './actions';
import { RoomActionLabel } from './constants';

import type { Category } from '../categories';

export interface RoomFields {
  id: string;
  name: string;
  description?: string;
  latest?: boolean;
  created_at: string;
  creator_id?: number; // TODO: User
  categories?: string[];
  categoriesM?: ModelType<Category>; // TODO: main, sub の扱いについて
}
export type RoomState = Ref<Category> & Readonly<Pick<RoomFields, 'categories'>>;

export class Room extends Model<typeof Room, RoomFields> {
  static override modelName = 'Room' as const;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: RoomFields) {
    super(props);
  }

  static override fields = {
    id: attr(),
    name: attr(),
    description: attr(),
    latest: attr(),
    created_at: attr(),
    categories: many({ to: 'Category', as: 'categoriesM' }),
    // TODO: User
    // creator_id: fk({
    //   to: 'User',
    //   as: 'user',
    //   relatedName: 'room'
    // })
  };
}

Room.reducer = (action: RoomActionType, modelType: ModelType<Room>, _session) => {
  switch (action.type) {
    case RoomActionLabel.CREATE_ROOM:
      modelType.create(action.payload);
      break;
    case RoomActionLabel.UPSERT_ROOM:
      modelType.upsert(action.payload);
      break;
    case RoomActionLabel.UPSERT_ROOMS:
      action.payload.forEach?.((room) => modelType.upsert(room));
      break;
    case RoomActionLabel.GET_ROOM:
    case RoomActionLabel.GET_CATEGORY_ROOMS:
    case RoomActionLabel.GET_LATEST_ROOMS:
      break;
    case RoomActionLabel.UPSERT_LATEST_ROOMS:
      action.payload.forEach?.((room) => {
        room.latest = true;
        modelType.upsert(room);
      });
      break;
    default:
  }
};
