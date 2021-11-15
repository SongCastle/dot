import { replace } from 'connected-react-router';
import React from 'react';
import isEqual from 'react-fast-compare';
import { useSelector } from 'react-redux';
import type { DefaultRootState } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Progress } from '../Progress/Progress';
import { dispatch, getRoom, roomSelector } from '../../store';
import type { Channel } from '../../store';

type RoomParams = { roomId: string };

const myRoomsSelector = (state: DefaultRootState) => (roomId: string, channel: Channel) => {
  const { room, status } = roomSelector(state)(roomId, channel);
  return {
    room: room
      ? { id: room.id, name: room.name, description: room.description, createdAt: room.created_at }
      : null,
    status,
  };
};

export const Room: React.FC = () => {
  const { roomId } = useParams<RoomParams>();
  const myChnnel: Channel = `Room-${roomId}`;
  const { room, status } = useSelector(
    (state) => myRoomsSelector(state)(roomId, myChnnel),
    isEqual,
  );

  const effectCallback = () => {
    // TODO: room の存在判定を saga に含めたい
    if (!room) dispatch(getRoom(roomId, myChnnel));
  };

  // TODO: カテゴリの表示
  return (
    <Progress status={status} callback={effectCallback} deps={[roomId]}>
      <h3 className='mb-2'>ルーム</h3>
      {room ? (
        <ul>
          <li>名前: {room.name}</li>
          <li>説明: {room.description}</li>
          <li>作成日: {room.createdAt}</li>
        </ul>
      ) : (
        <p>存在しません...</p>
      )}
      <div className='my-2'>
        <button
          type='button'
          onClick={() => {
            dispatch(replace('/rooms'));
          }}
        >
          &gt; 最新のルーム一覧
        </button>
      </div>
    </Progress>
  );
};
