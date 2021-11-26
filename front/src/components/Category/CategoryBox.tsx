import { Box, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

import { RoomBoxes } from '../Room/RoomBoxes';
import { categoryStateSelector } from '../../store';

type CategoryBoxProp = {
  id: string;
};

export const CategoryBox: React.FC<CategoryBoxProp> = ({ id }) => {
  const name = useSelector((state) => {
    const category = categoryStateSelector(state)(id);
    return category?.name;
  });

  return name ? (
    <Box>
      <Typography>{name}</Typography>
      <RoomBoxes categoryId={id} />
    </Box>
  ) : (
    <Typography>存在しません</Typography>
  );
};
