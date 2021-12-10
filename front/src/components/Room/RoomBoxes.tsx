import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

import { RoomBox } from './RoomBox';
import { Progress } from '../Progress/Progress';
import {
  dispatch,
  useAppObjectSelector,
  categoryRoomsSelector,
  getCategoryRooms,
} from '../../store';
import type { Channel } from '../../store';

type RoomBoxesProp = {
  categoryId: string;
};

export const RoomBoxes: React.FC<RoomBoxesProp> = ({ categoryId }) => {
  const myChannel: Channel = `RoomBoxes-${categoryId}`;
  const { rooms, status } = useAppObjectSelector((state) =>
    categoryRoomsSelector(state)(categoryId, myChannel),
  );

  return (
    <Box>
      <Progress
        status={status}
        callback={() => {
          dispatch(getCategoryRooms(categoryId, myChannel));
        }}
      >
        {rooms.length > 0 ? (
          <Grid container spacing={2}>
            {rooms.map(({ id }) => (
              <Grid item key={id} xs={4}>
                <RoomBox id={id} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>存在しません ...</Typography>
        )}
      </Progress>
    </Box>
  );
};
