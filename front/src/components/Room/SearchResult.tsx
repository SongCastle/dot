import { Box, Typography } from '@mui/material';
import { useState, FC } from 'react';

import { RoomBoxes } from './RoomBoxes';
import { BasicPaper } from '../Common/BasicPaper';
import { Progress } from '../Progress/Progress';

import {
  dispatch,
  upsertRooms,
  searchRoomsAPI,
  useAppSelector,
  myUIStateSelector,
  useQueryString,
} from '../../store';

const myChannel = 'SearchResult';

export const SearchResult: FC = () => {
  const { q } = useQueryString();
  const [ids, setRoomIds] = useState<string[]>([]);
  const status = useAppSelector((state) => myUIStateSelector(state)(myChannel));

  // TODO: 条件の多様化
  // TODO: 一致するキーワードの色分けをしたい
  return (
    <Box my={4}>
      <BasicPaper>
        <Typography gutterBottom>検索結果: {typeof q === 'string' ? q : q?.join(' ')}</Typography>
        <Progress
          status={status}
          callback={() => {
            dispatch(
              searchRoomsAPI(myChannel, q || '', (hitRooms) => {
                // ORM State へヒットしたルームを保存する
                dispatch(upsertRooms(hitRooms));
                // Component の State としてヒットした id をセットする
                setRoomIds(hitRooms.map(({ id }) => id));
              }),
            );
          }}
        >
          <RoomBoxes ids={ids} />
        </Progress>
      </BasicPaper>
    </Box>
  );
};
