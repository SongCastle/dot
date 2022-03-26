import { Box, CircularProgress, List, ListItem } from '@mui/material';
import type { ListProps } from '@mui/material';
import { useState, useRef, FC } from 'react';

import { PartPostList } from './PartPostList';
import { SendPostForm } from './SendPostForm';

type PostListProps = {
  roomId: string;
  sx?: ListProps['sx'];
};

const postsLimit = 15;

export const PostList: FC<PostListProps> = ({ roomId, sx }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const ref = useRef<HTMLDivElement>(null);
  const postRef = useRef<HTMLDivElement>(null);

  const scrollPostsToBottom = (behavior?: ScrollOptions['behavior']) => {
    if (ref?.current) ref.current.scrollTo({ top: ref.current.scrollHeight, behavior });
  };

  return (
    <List sx={sx}>
      <Box maxHeight='55vh' sx={{ overflowY: isLoading ? 'hidden' : 'auto' }} ref={ref}>
        {isLoading && (
          <Box
            position='absolute'
            display='flex'
            width='100%'
            height='85%'
            alignItems='center'
            justifyContent='center'
          >
            <CircularProgress />
          </Box>
        )}
        <Box visibility={isLoading ? 'hidden' : 'visible'} ref={postRef}>
          <PartPostList
            roomId={roomId}
            limit={postsLimit}
            outerRef={ref}
            onLoaded={(count) => {
              const h = ref.current?.clientHeight;
              const ph = postRef.current?.clientHeight;
              if (h && ph && (ph - 10 > h || count < postsLimit) && isLoading) {
                setIsLoading(false);
                scrollPostsToBottom();
              }
            }}
          />
        </Box>
      </Box>
      {/* FIXME: 送信したものが追加されない ... */}
      <ListItem sx={{ m: '1.5rem 0', visibility: isLoading ? 'hidden' : 'visible' }}>
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
