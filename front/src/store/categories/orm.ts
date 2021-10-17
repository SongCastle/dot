import { attr, fk, many, Model } from 'redux-orm';
import type { ModelType, Ref } from 'redux-orm';

import type { GategoryActionType } from './actions';
import { CategoryActionLabel } from './constants';

import type { Room } from '../rooms';

interface CategoryFields {
  id: number
  name: string
  latest?: boolean
  creator_id?: number // TODO: User
  room_ids?: number[]
  rooms?: ModelType<Room>
};
export type CategoryState = Ref<Category> & Readonly<Pick<CategoryFields, 'room_ids'>>

export class Category extends Model<typeof Category, CategoryFields> {
  static override modelName = 'Category' as const;

  constructor(props: CategoryFields) {
    super(props);
  };

  static override fields = {
    id: attr(),
    name: attr(),
    latest: attr(),
    room_ids: many({to: 'Room', as: 'rooms'})
    // TODO: User
    // creator_id: fk({
    //   to: 'User',
    //   as: 'user',
    //   relatedName: 'category'
    // })
  };
};

Category.reducer = (action: GategoryActionType, modelType: ModelType<Category>, session) => {
  switch (action.type) {
    case CategoryActionLabel.CREATE_CATEGORY:
      modelType.create(action.payload);
      break;
    case CategoryActionLabel.UPSERT_CATEGORY:
      // TODO: 同じ値を update した場合、レンダリングについて確認する
      modelType.upsert(action.payload);
      break;
    case CategoryActionLabel.GET_LATEST_CATEGORIES:
      break; // 何もしない
    case CategoryActionLabel.UPSERT_LATEST_CATEGORIES:
      action.payload.forEach(category => {
        category.latest = true;
        modelType.upsert(category);
      });
      break;
    default:
      null;
  };
};
