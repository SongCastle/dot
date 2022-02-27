import { Box, Grid, Typography } from '@mui/material';
import { FC } from 'react';

import { RoomBox } from './RoomBox';
import { useAppObjectSelector, roomsStateSelector } from '../../store';

type RoomBoxesProp = {
  ids: string[];
};

export const RoomBoxes: FC<RoomBoxesProp> = ({ ids }) => {
  const rooms = useAppObjectSelector((state) => roomsStateSelector(state)(ids));

  return (
    <Box my={2}>
      {rooms.length > 0 ? (
        <Grid container spacing={5}>
          {rooms.map(({ id }) => (
            <Grid item key={id} xs={12} sm={12} md={6} lg={6} sx={{ display: 'flex' }}>
              <RoomBox id={id} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>存在しません ...</Typography>
      )}
    </Box>
  );
};
