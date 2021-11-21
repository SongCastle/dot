import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import isEqual from 'react-fast-compare';
import { useSelector } from 'react-redux';

import { LatestCategory } from './LatestCategory';
import { Progress } from '../Progress/Progress';

import { dispatch, getLatestCategories, latestCategoriesSelector } from '../../store';
import type { Channel } from '../../store';

const myChannel: Channel = 'LatestCategories';

export const LatestCategories: React.FC = () => {
  const { categories, status } = useSelector(
    (state) => latestCategoriesSelector(state)(myChannel),
    isEqual,
  );

  return (
    <Box>
      <Typography gutterBottom>カテゴリ一覧</Typography>
      <Progress
        status={status}
        callback={() => {
          dispatch(getLatestCategories(myChannel));
        }}
      >
        {categories.length > 0 ? (
          <Grid container spacing={2}>
            {categories.map(({ id, name }) => (
              <Grid item key={id} xs={12}>
                <LatestCategory id={id} name={name} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>存在しません...</Typography>
        )}
      </Progress>
    </Box>
  );
};
