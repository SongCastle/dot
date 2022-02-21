import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { FC } from 'react';

import { CategoryChips } from '../Category/CategoryChips';
import { dispatchPath, useAppObjectSelector, roomStateSelector } from '../../store';

type RoomBoxProp = {
  id: string;
};

export const RoomBox: FC<RoomBoxProp> = ({ id }) => {
  const room = useAppObjectSelector((state) => roomStateSelector(state)(id));

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
            dispatchPath(`/rooms/${id}`);
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
