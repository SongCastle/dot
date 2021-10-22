import { attr, fk, many, Model } from 'redux-orm';
import type { ModelType, Ref } from 'redux-orm';

import type { RoomActionType } from './actions';
import { RoomActionLabel } from './constants';

import type { Category } from '../categories';

export interface RoomFields {
  id: number
  name: string
  description?: string
  latest?: boolean
  creator_id?: number // TODO: User
  category_ids?: number[]
  categories?: ModelType<Category> // TODO: main, sub の扱いについて
};
export type RoomState = Ref<Category> & Readonly<Pick<RoomFields, 'category_ids'>>

export class Room extends Model<typeof Room, RoomFields> {
  static override modelName = 'Room' as const;

  constructor(props: RoomFields) {
    super(props);
  };

  static override fields = {
    id: attr(),
    name: attr(),
    latest: attr(),
    category_ids: many({to: 'Category', as: 'categories'})
    // TODO: User
    // creator_id: fk({
    //   to: 'User',
    //   as: 'user',
    //   relatedName: 'room'
    // })
  };
};

Room.reducer = (action: RoomActionType, modelType: ModelType<Room>, session) => {
  switch (action.type) {
    case RoomActionLabel.CREATE_ROOM:
      modelType.create(action.payload);
      break;
    case RoomActionLabel.UPSERT_ROOM:
      modelType.upsert(action.payload);
      break;
    case RoomActionLabel.GET_LATEST_ROOMS:
      break; // 何もしない
    case RoomActionLabel.UPSERT_LATEST_ROOMS:
      action.payload.forEach(room => {
        room.latest = true;
        modelType.upsert(room);
      });
      break;
    default:
      null;
  };
};
