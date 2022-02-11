import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import { Progress } from '../Progress/Progress';
import { dispatch, dispatchPath, getRoom, useAppObjectSelector, roomSelector } from '../../store';
import type { Channel } from '../../store';

type RoomParams = { roomId: string };

export const RoomDetail: FC = () => {
  const { roomId } = useParams<RoomParams>();
  const myChannel: Channel = `RoomDetail-${roomId}`;
  const { room, status } = useAppObjectSelector((state) => roomSelector(state)(roomId, myChannel));

  // TODO: カテゴリの表示
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom>ルーム</Typography>
        <Progress
          status={status}
          callback={() => {
            dispatch(getRoom(myChannel, roomId));
          }}
          deps={[roomId]}
        >
          {room ? (
            <>
              <Typography>名前: {room.name}</Typography>
              <Typography>説明: {room.description}</Typography>
              <Typography>作成日: {room.created_at}</Typography>
            </>
          ) : (
            <Typography>存在しません...</Typography>
          )}
        </Progress>
      </CardContent>
      <CardActions>
        <Button
          // TODO: connected-react-router による再レンダリングを制限したい
          onClick={() => {
            dispatchPath('/latest');
          }}
        >
          最新のルーム一覧
        </Button>
      </CardActions>
    </Card>
  );
};
