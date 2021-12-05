import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { replace } from 'connected-react-router';
import React from 'react';
import isEqual from 'react-fast-compare';

import { CategoryChips } from '../Category/CategoryChips';

import { dispatch, useAppSelector, roomStateSelector } from '../../store';

type RoomBoxProp = {
  id: string;
};

export const RoomBox: React.FC<RoomBoxProp> = ({ id }) => {
  const room = useAppSelector((state) => roomStateSelector(state)(id), isEqual);

  return room ? (
    <Card>
      <CardContent>
        <Typography gutterBottom>{room.name}</Typography>
        {/* TODO: 閲覧しているユーザ数を表示したい */}
        <CategoryChips roomId={id} />
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
  ) : (
    <Card>
      <CardContent>
        <Typography gutterBottom>存在しないルーム</Typography>
      </CardContent>
    </Card>
  );
};
