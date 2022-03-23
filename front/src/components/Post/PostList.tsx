import { Box, List, ListItem } from '@mui/material';
import type { ListProps } from '@mui/material';
import { useRef, FC } from 'react';

import { PartPostList } from './PartPostList';
import { SendPostForm } from './SendPostForm';

type PostListProps = {
  roomId: string;
  sx?: ListProps['sx'];
};

const postsLimit = 15;

export const PostList: FC<PostListProps> = ({ roomId, sx }) => {
  const ref = useRef<HTMLDivElement>(null);
  // TODO: 画面が縦長の場合、
  const scrollPostsToBottom = (behavior?: ScrollOptions['behavior']) => {
    if (ref?.current) ref.current.scrollTo({ top: ref.current.scrollHeight, behavior });
  };

  return (
    <List sx={sx}>
      <Box maxHeight='60vh' sx={{ overflowY: 'auto' }} ref={ref}>
        <PartPostList
          roomId={roomId}
          limit={postsLimit}
          outerRef={ref}
          onLoaded={() => {
            scrollPostsToBottom();
          }}
        />
      </Box>
      <ListItem sx={{ m: '1.5rem 0' }}>
        <SendPostForm
          roomId={roomId}
          onSent={() => {
            scrollPostsToBottom('smooth');
          }}
        />
      </ListItem>
    </List>
  );
};

PostList.defaultProps = {
  sx: {},
};
