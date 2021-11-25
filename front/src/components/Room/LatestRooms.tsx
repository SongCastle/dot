import React from 'react';
import isEqual from 'react-fast-compare';
import { useSelector } from 'react-redux';
import type { DefaultRootState } from 'react-redux';

import { NavRoomButton } from './NavRoomButton';
import { Progress } from '../Progress/Progress';
import { dispatch, getLatestRooms, latestRoomsSelector } from '../../store';
import type { Channel } from '../../store';

const myChannel: Channel = 'LatestRooms';
const myLatestRoomsSelector = (state: DefaultRootState) => (channel: Channel) => {
  const { rooms, status } = latestRoomsSelector(state)(channel);
  return {
    rooms: rooms.map(({ id, name }) => ({ id, name })),
    status,
  };
};

export const LatestRooms: React.FC = () => {
  const { rooms, status } = useSelector(
    (state) => myLatestRoomsSelector(state)(myChannel),
    isEqual,
  );

  const effectCallback = () => {
    dispatch(getLatestRooms(myChannel));
  };

  return (
    <>
      <h3 className='mb-2'>最新のルーム一覧</h3>
      <Progress status={status} callback={effectCallback}>
        {rooms.length > 0 ? (
          <ul>
            {rooms.map(({ id, name }) => (
              <li key={id}>
                <NavRoomButton id={id} name={name} />
              </li>
            ))}
          </ul>
        ) : (
          <p>存在しません...</p>
        )}
      </Progress>
    </>
  );
};
