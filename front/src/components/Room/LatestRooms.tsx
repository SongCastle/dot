import { Typography } from '@mui/material';
import { useState, FC } from 'react';

import { RoomBoxes } from './RoomBoxes';
import { BasicPaper } from '../Common';
import { Progress } from '../Progress/Progress';

import {
  dispatch,
  upsertRooms,
  getLatestRoomsAPI,
  useAppSelector,
  myUIStateSelector,
} from '../../store';
import type { Channel } from '../../store';

const myChannel: Channel = 'LatestRooms';

export const LatestRooms: FC = () => {
  const [ids, setRoomIds] = useState<string[]>([]);
  const status = useAppSelector((state) => myUIStateSelector(state)(myChannel));

  // TODO: ユーザに紐づく最新のルームにしたい ...
  return (
    <BasicPaper>
      <Typography gutterBottom>最新のルーム</Typography>
      <Progress
        status={status}
        callback={() => {
          dispatch(
            getLatestRoomsAPI(myChannel, (rooms) => {
              setRoomIds(rooms.map(({ id }) => id));
              dispatch(upsertRooms(rooms));
            }),
          );
        }}
      >
        <RoomBoxes ids={ids} />
      </Progress>
    </BasicPaper>
  );
};
