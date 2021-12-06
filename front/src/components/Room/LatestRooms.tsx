import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react';

import { RoomBox } from './RoomBox';
import { Progress } from '../Progress/Progress';

import { dispatch, useAppObjectSelector, latestRoomsSelector, getLatestRooms } from '../../store';
import type { Channel } from '../../store';

const myChannel: Channel = 'LatestRooms';

export const LatestRooms: React.FC = () => {
  const { rooms, status } = useAppObjectSelector((state) => latestRoomsSelector(state)(myChannel));

  // TODO: ユーザに紐づく最新のルームにしたい ...
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom>最新のルーム</Typography>
        <Progress
          status={status}
          callback={() => {
            dispatch(getLatestRooms(myChannel));
          }}
        >
          <Box my={2}>
            {rooms.length > 0 ? (
              <Grid container spacing={5}>
                {rooms.map(({ id }) => (
                  <Grid item key={id} xs={4}>
                    <RoomBox id={id} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography>存在しません ...</Typography>
            )}
          </Box>
        </Progress>
      </CardContent>
    </Card>
  );
};
