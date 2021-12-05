import { Chip } from '@mui/material';
import React from 'react';

type CategoryChipProp = {
  name: string;
  isMain?: boolean;
  size?: 'small' | 'medium';
};

const defaultSize = 'small';
// TODO: カテゴリ名を選択したら、フィルタリングしたい
export const CategoryChip: React.FC<CategoryChipProp> = ({ name, isMain, size }) =>
  isMain ? <Chip label={name} size={size} /> : <Chip label={name} variant='outlined' size={size} />;

CategoryChip.defaultProps = {
  isMain: false,
  size: 'small',
};
