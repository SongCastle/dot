import { css } from '@emotion/react';
import { Avatar, Box, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { useLayoutEffect, useRef, useState, FC } from 'react';
import type { RefObject } from 'react';

import { Progress } from '../Progress/Progress';

import { formatDate } from '../../services';

import {
  dispatch,
  useAppSelector,
  useAppObjectSelector,
  myUIStateSelector,
  postsStateSelector,
  getRoomPosts,
  ProgressStatus,
} from '../../store';
import type { Channel } from '../../store';

type PartPostListProps<ET extends HTMLElement = HTMLDivElement> = {
  readonly roomId: string;
  readonly offset?: string;
  readonly limit: number;
  readonly outerRef: RefObject<ET>;
  readonly onLoaded?: () => void;
};

const monitorInterval = 250;

const postStyle = css`
  margin: 0;
`;

export const PartPostList: FC<PartPostListProps> = ({
  roomId,
  offset,
  limit,
  outerRef,
  onLoaded,
}) => {
  const myChannel: Channel = `PartPostList-${roomId}-${offset}-${limit}`;
  let counter = 0;
  let moniorTimer: NodeJS.Timer;

  // TODO: useStatus のような hook があっても良いかも ...
  const status = useAppSelector((state) => myUIStateSelector(state)(myChannel));
  const posts = useAppObjectSelector((state) =>
    // eslint-disable-next-line no-return-assign
    postsStateSelector(state)(({ room }) => room === roomId && (counter += 1) < limit, offset),
  );

  const [loadNext, setLoadNext] = useState<boolean>(false);
  const topRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    clearInterval(moniorTimer);
    moniorTimer = setInterval(() => {
      const y = topRef.current?.getBoundingClientRect().y;
      const oy = outerRef.current?.getBoundingClientRect().y;
      if (y && oy && y + 100 > oy && posts.length > 0) {
        setLoadNext(true);
        clearInterval(moniorTimer);
      }
    }, monitorInterval);

    onLoaded?.();
  }, [status === ProgressStatus.SUCCESS]);

  return (
    <Progress
      status={status}
      callback={() => {
        dispatch(getRoomPosts(myChannel, roomId, limit, offset));
      }}
      deps={[]}
    >
      {posts.length === 0 ? (
        !offset && (
          <ListItem divider>
            <ListItemText
              primary='メッセージは存在しません...'
              primaryTypographyProps={{ sx: { py: '1rem', color: 'gray' } }}
            />
          </ListItem>
        )
      ) : (
        <>
          <Box ref={topRef} />
          {loadNext && (
            <PartPostList
              roomId={roomId}
              limit={limit}
              offset={posts[posts.length - 1].id}
              outerRef={outerRef}
            />
          )}
          {posts
            .map(({ id, message, created_at }) => (
              <ListItem key={id} divider sx={{ py: '6px' }}>
                <ListItemAvatar>
                  <Avatar sx={{ width: 32, height: 32 }} />
                </ListItemAvatar>
                <ListItemText
                  secondary={formatDate(created_at)}
                  secondaryTypographyProps={{ sx: { fontSize: '0.75rem' } }}
                >
                  <pre css={postStyle}>{message}</pre>
                </ListItemText>
              </ListItem>
            ))
            .reverse()}
        </>
      )}
    </Progress>
  );
};

PartPostList.defaultProps = {
  offset: undefined,
  onLoaded: undefined,
};
