import { attr, many, Model } from 'redux-orm';
import type { ModelType, Ref } from 'redux-orm';

import type { GategoryActionType } from './actions';
import { CategoryActionLabel } from './constants';

import type { Room } from '../rooms';

interface CategoryFields {
  id: string;
  name: string;
  latest?: boolean;
  creator_id?: number; // TODO: User
  rooms?: string[];
  roomsM?: ModelType<Room>;
}
export type CategoryState = Ref<Category> & Readonly<Pick<CategoryFields, 'rooms'>>;

export class Category extends Model<typeof Category, CategoryFields> {
  static override modelName = 'Category' as const;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: CategoryFields) {
    super(props);
  }

  static override fields = {
    id: attr(),
    name: attr(),
    latest: attr(),
    rooms: many({ to: 'Room', as: 'roomsM' }),
    // TODO: User
    // creator_id: fk({
    //   to: 'User',
    //   as: 'user',
    //   relatedName: 'category'
    // })
  };
}

Category.reducer = (action: GategoryActionType, modelType: ModelType<Category>, _session) => {
  switch (action.type) {
    case CategoryActionLabel.CREATE_CATEGORY:
      modelType.create(action.payload);
      break;
    case CategoryActionLabel.UPSERT_CATEGORY:
      modelType.upsert(action.payload);
      break;
    case CategoryActionLabel.GET_LATEST_CATEGORIES:
      break; // 何もしない
    case CategoryActionLabel.UPSERT_LATEST_CATEGORIES:
      action.payload.forEach?.((category) => {
        category.latest = true;
        modelType.upsert(category);
      });
      break;
    default:
  }
};
