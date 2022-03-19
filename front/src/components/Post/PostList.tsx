import { css } from '@emotion/react';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import type { ListProps } from '@mui/material';
import { useRef, useLayoutEffect, FC } from 'react';

import { SendPostForm } from './SendPostForm';
import { Progress } from '../Progress/Progress';

import { formatDate } from '../../services';

import {
  dispatch,
  useAppSelector,
  useAppObjectSelector,
  myUIStateSelector,
  roomPostsStateSelector,
  getRoomPosts,
} from '../../store';
import type { Channel } from '../../store';

type PostListProps = {
  roomId: string;
  sx?: ListProps['sx'];
};

const postStyle = css`
  margin: 0;
`;

export const PostList: FC<PostListProps> = ({ roomId, sx }) => {
  const myChannel: Channel = `PostList-${roomId}`;
  const posts = useAppObjectSelector((state) => roomPostsStateSelector(state)(roomId));
  const status = useAppSelector((state) => myUIStateSelector(state)(myChannel));

  const ref = useRef<HTMLDivElement>(null);
  const scrollPostToBottom = (behavior?: ScrollOptions['behavior']) => {
    if (ref?.current) ref.current.scrollTo({ top: ref.current.scrollHeight, behavior });
  };

  useLayoutEffect(() => {
    scrollPostToBottom();
  }, [status]);

  return (
    <Progress
      status={status}
      callback={() => {
        dispatch(getRoomPosts(myChannel, roomId));
      }}
      deps={[roomId]}
    >
      <List sx={sx}>
        {posts.length === 0 ? (
          <ListItem divider>
            <ListItemText
              primary='メッセージは存在しません...'
              primaryTypographyProps={{ sx: { py: '1rem', color: 'gray' } }}
            />
          </ListItem>
        ) : (
          <Box maxHeight='60vh' sx={{ overflowY: 'scroll' }} ref={ref}>
            {posts.map(({ id, message, created_at }) => (
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
            ))}
          </Box>
        )}
        <ListItem sx={{ m: '1.5rem 0' }}>
          <SendPostForm
            roomId={roomId}
            onSent={() => {
              scrollPostToBottom('smooth');
            }}
          />
        </ListItem>
      </List>
    </Progress>
  );
};

PostList.defaultProps = {
  sx: {},
};
