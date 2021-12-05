import React from 'react';
import isEqual from 'react-fast-compare';
import { Grid } from '@mui/material';

import { Progress } from '../Progress/Progress';
import { CategoryChip } from './CategoryChip';

import {
  dispatch,
  useAppSelector,
  getRoomCategories,
  roomMainCategoryStateSelector,
  roomSubCategoriesStateSelector,
  myProgressStateSelector,
} from '../../store';
import type { Channel } from '../../store';

type CategoryChipsProp = {
  roomId: string;
};

export const CategoryChips: React.FC<CategoryChipsProp> = ({ roomId }) => {
  const myChannel: Channel = `CategoryChips-${roomId}`;

  // TODO: トップページのカテゴリーの分類について ...
  const status = useAppSelector((state) => myProgressStateSelector(state)(myChannel), isEqual);

  const mainCategory = useAppSelector(
    (state) => roomMainCategoryStateSelector(state)(roomId),
    isEqual,
  );

  const subCategories = useAppSelector(
    (state) => roomSubCategoriesStateSelector(state)(roomId),
    isEqual,
  );

  return (
    <Progress
      status={status}
      callback={() => {
        dispatch(getRoomCategories(roomId, myChannel));
      }}
    >
      <Grid container spacing={0.5}>
        {mainCategory && (
          <Grid item key={mainCategory.id}>
            <CategoryChip name={mainCategory.name} isMain />
          </Grid>
        )}
        {subCategories.length > 0 &&
          subCategories.map(({ id, name }) => (
            <Grid item key={id}>
              <CategoryChip name={name} />
            </Grid>
          ))}
      </Grid>
    </Progress>
  );
};
