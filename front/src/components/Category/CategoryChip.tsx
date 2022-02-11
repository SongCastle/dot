import { Chip } from '@mui/material';
import React, { FC } from 'react';

type CategoryChipProp = {
  name: string;
  isMain?: boolean;
  size?: 'small' | 'medium';
};

// TODO: カテゴリ名を選択したら、フィルタリングしたい
export const CategoryChip: FC<CategoryChipProp> = ({ name, isMain, size }) => (
  <Chip label={name} variant={isMain ? undefined : 'outlined'} size={size} />
);

CategoryChip.defaultProps = {
  isMain: false,
  size: 'small',
};
