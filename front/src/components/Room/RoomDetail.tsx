import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { replace } from 'connected-react-router';
import React from 'react';
import isEqual from 'react-fast-compare';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Progress } from '../Progress/Progress';
import { dispatch, getRoom, roomSelector } from '../../store';
import type { Channel } from '../../store';

type RoomParams = { roomId: string };

export const RoomDetail: React.FC = () => {
  const { roomId } = useParams<RoomParams>();
  const myChnnel: Channel = `RoomDetail-${roomId}`;
  const { room, status } = useSelector((state) => roomSelector(state)(roomId, myChnnel), isEqual);

  // TODO: カテゴリの表示
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom>ルーム</Typography>
        <Progress
          status={status}
          callback={() => {
            // TODO: room の存在判定を saga に含めたい
            if (!room) dispatch(getRoom(roomId, myChnnel));
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
            dispatch(replace('/rooms'));
          }}
        >
          最新のルーム一覧
        </Button>
      </CardActions>
    </Card>
  );
};