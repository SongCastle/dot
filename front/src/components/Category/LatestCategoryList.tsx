import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { useState, FC } from 'react';

import { CategoryChip } from './CategoryChip';
import { BasicPaper } from '../Common/BasicPaper';
import { Progress } from '../Progress/Progress';

import {
  dispatch,
  upsertCategories,
  getLatestCategoriesAPI,
  useAppSelector,
  useAppObjectSelector,
  myUIStateSelector,
  categoriesStateSelector,
} from '../../store';
import type { Channel } from '../../store';

const myChannel: Channel = 'LatestCategoryList';

export const LatestCategoryList: FC = () => {
  const [ids, setCategoryIds] = useState<string[]>([]);
  const status = useAppSelector((state) => myUIStateSelector(state)(myChannel));
  const latestCategories = useAppObjectSelector((state) => categoriesStateSelector(state)(ids));

  // TODO: ユーザに紐づくカテゴリ一覧にしたい ...
  return (
    <BasicPaper>
      <Typography>カテゴリ一覧</Typography>
      <Progress
        status={status}
        callback={() => {
          dispatch(
            getLatestCategoriesAPI(myChannel, (categories) => {
              setCategoryIds(categories.map(({ id }) => id));
              dispatch(upsertCategories(categories));
            }),
          );
        }}
      >
        <List>
          {latestCategories.length > 0 ? (
            latestCategories.map(({ id, name }) => (
              <ListItem dense key={id}>
                <CategoryChip name={name} />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary='存在しません...' />
            </ListItem>
          )}
        </List>
      </Progress>
    </BasicPaper>
  );
};
