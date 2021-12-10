import { Card, CardContent, List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';

import { CategoryChip } from './CategoryChip';
import { Progress } from '../Progress/Progress';

import {
  dispatch,
  useAppObjectSelector,
  getLatestCategories,
  latestCategoriesSelector,
} from '../../store';
import type { Channel } from '../../store';

const myChannel: Channel = 'LatestCategoryList';

export const LatestCategoryList: React.FC = () => {
  const { categories, status } = useAppObjectSelector((state) =>
    latestCategoriesSelector(state)(myChannel),
  );

  // TODO: ユーザに紐づくカテゴリ一覧にしたい ...
  return (
    <Card>
      <CardContent>
        <Typography>カテゴリ一覧</Typography>
        <Progress
          status={status}
          callback={() => {
            dispatch(getLatestCategories(myChannel));
          }}
        >
          <List>
            {categories.length > 0 ? (
              categories.map(({ id, name }) => (
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
      </CardContent>
    </Card>
  );
};
