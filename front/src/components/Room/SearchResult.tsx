import { css } from '@emotion/react';
import { Box } from '@mui/material';
import { useState, FC } from 'react';

import { RoomBoxes } from './RoomBoxes';
import { SearchResultInput } from './SearchResultInput';
import { BasicPaper } from '../Common';
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

const paperStyle = css`
  margin-top: 1rem;
`;

const toQueryText = (q?: string | string[] | null) =>
  (typeof q === 'string' ? q : q?.join(' ')) || '';

export const SearchResult: FC = () => {
  const { q } = useQueryString();
  const [ids, setRoomIds] = useState<string[]>([]);
  const status = useAppSelector((state) => myUIStateSelector(state)(myChannel));

  // TODO: 条件の多様化
  // TODO: 一致するキーワードの色分けをしたい
  return (
    <Box my={4}>
      <SearchResultInput q={toQueryText(q)} />
      <BasicPaper customCSS={paperStyle}>
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
          deps={[toQueryText(q)]}
        >
          <RoomBoxes ids={ids} />
        </Progress>
      </BasicPaper>
    </Box>
  );
};
