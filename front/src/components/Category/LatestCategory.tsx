import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

import { RoomBoxes } from '../Room/RoomBoxes';

type LatestCategoryProp = {
  id: string;
  name: string;
};

export const LatestCategory: React.FC<LatestCategoryProp> = ({ id, name }) => (
  <Card>
    <CardContent>
      <Typography gutterBottom>{name}</Typography>
      <RoomBoxes categoryId={id} />
    </CardContent>
  </Card>
);
