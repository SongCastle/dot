import { attr, fk, many, Model } from 'redux-orm';
import type { ModelType, Ref, SessionBoundModel } from 'redux-orm';

import type { RoomActionType } from './actions';
import { RoomActionLabel } from './constants';

import type { Category } from '../categories';

export interface RoomFields {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  creator_id?: string; // TODO: User
  main_category?: string;
  sub_categories?: string[];
  mainCategoryM?: SessionBoundModel<Category>;
  subCategoriesM?: ModelType<Category>;
}
export type RoomState = Ref<Category> &
  Readonly<Pick<RoomFields, 'main_category' | 'sub_categories'>>;

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
    created_at: attr(),
    main_category: fk({ to: 'Category', as: 'mainCategoryM', relatedName: 'main_room' }),
    sub_categories: many({ to: 'Category', as: 'subCategoriesM', relatedName: 'sub_rooms' }),
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
    case RoomActionLabel.SEARCH_ROOMS:
      break;
    default:
  }
};
