import { Avatar, Box, Typography } from '@mui/material';
import { FC } from 'react';

import { PostList } from '../Post/PostList';
import { Progress } from '../Progress/Progress';

import {
  dispatch,
  getRoom,
  useAppSelector,
  useAppObjectSelector,
  useRoomIdParams,
  useRoomAvatar,
  roomStateSelector,
  myUIStateSelector,
} from '../../store';
import type { Channel } from '../../store';

// TODO: 最新のルーム一覧への導線, カテゴリなど詳細表示,
export const RoomDetail: FC = () => {
  const { roomId } = useRoomIdParams();
  const myChannel: Channel = `RoomDetail-${roomId}`;

  const room = useAppObjectSelector((state) => roomStateSelector(state)(roomId));
  const status = useAppSelector((state) => myUIStateSelector(state)(myChannel));
  const avatarURL = useRoomAvatar(roomId);

  return (
    <Progress
      status={status}
      callback={() => {
        dispatch(getRoom(myChannel, roomId));
      }}
      deps={[roomId]}
    >
      {room ? (
        <>
          <Box position='relative' textAlign='center' zIndex='2'>
            <Box
              display='inline-flex'
              flexDirection='row'
              alignItems='center'
              p='0.5rem 2rem'
              boxShadow='0 0 3px darkgray'
              gap='1rem'
              sx={{ backgroundColor: 'white' }}
            >
              <Avatar src={avatarURL} sx={{ width: 32, height: 32 }} />
              <Typography>{room.name}</Typography>
            </Box>
          </Box>
          <Box
            position='relative'
            top='-1.35rem'
            p='0 1rem'
            borderRadius='3px'
            border='1px solid lightgray'
            zIndex='1'
          >
            <PostList roomId={roomId} sx={{ pt: '1.25rem', mx: '0.5rem' }} />
          </Box>
        </>
      ) : (
        <Typography>存在しません...</Typography>
      )}
    </Progress>
  );
};
