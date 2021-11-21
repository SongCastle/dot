import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { replace } from 'connected-react-router';
import React from 'react';
import isEqual from 'react-fast-compare';
import { useSelector } from 'react-redux';

import { dispatch, roomStateSelector } from '../../store';

type RoomBoxProp = {
  id: string;
};

export const RoomBox: React.FC<RoomBoxProp> = ({ id }) => {
  const room = useSelector((state) => roomStateSelector(state)(id), isEqual);

  return (
    <Card>
      <CardContent>
        <Typography>{room ? room.name : '存在しないルーム'}</Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            dispatch(replace(`/rooms/${id}`));
          }}
        >
          表示
        </Button>
      </CardActions>
    </Card>
  );
};
