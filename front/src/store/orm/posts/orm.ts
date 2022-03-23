import { attr, fk, Model } from 'redux-orm';
import type { ModelType, Ref, SessionBoundModel } from 'redux-orm';

import type { PostActionType } from './actions';
import { PostActionLabel } from './constants';

import type { Room } from '../rooms';

export interface PostFields {
  id: string;
  message: string;
  created_at: string;
  user_id?: string; // TODO: User
  room?: string;
  roomM?: SessionBoundModel<Room>;
}
export type PostState = Ref<Post> & Readonly<Pick<PostFields, 'room'>>;

export class Post extends Model<typeof Post, PostFields> {
  static override modelName = 'Post' as const;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: PostFields) {
    super(props);
  }

  static override fields = {
    id: attr(),
    message: attr(),
    created_at: attr(),
    room: fk({ to: 'Room', as: 'roomM' }),
    // TODO: User
    // creator_id: fk({
    //   to: 'User',
    //   as: 'user',
    //   relatedName: 'post'
    // })
  };
}

Post.reducer = (action: PostActionType, modelType: ModelType<Post>, _session) => {
  switch (action.type) {
    case PostActionLabel.UPSERT_POSTS:
      action.payload.forEach?.((post) => modelType.upsert(post));
      break;
    case PostActionLabel.GET_ROOM_POSTS:
    case PostActionLabel.CREATE_POST:
      break;
    default:
  }
};
