import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import isEqual from 'react-fast-compare';
import { useSelector } from 'react-redux';

import { RoomBox } from './RoomBox';
import { Progress } from '../Progress/Progress';
import { dispatch, categoryRoomsSelector, getCategoryRooms } from '../../store';
import type { Channel } from '../../store';

type RoomBoxesProp = {
  categoryId: string;
};

export const RoomBoxes: React.FC<RoomBoxesProp> = ({ categoryId }) => {
  const myChannel: Channel = `RoomBoxes-${categoryId}`;
  const { rooms, status } = useSelector(
    (state) => categoryRoomsSelector(state)(categoryId, myChannel),
    isEqual,
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
