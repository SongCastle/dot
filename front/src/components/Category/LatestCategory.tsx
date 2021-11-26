import React from 'react';
import isEqual from 'react-fast-compare';
import { useSelector } from 'react-redux';
import type { DefaultRootState } from 'react-redux';

import { Progress } from '../Progress/Progress';
import { NavRoomButton } from '../Room/NavRoomButton';
import { dispatch, getCategoryRooms, categoryRoomsSelector } from '../../store';
import type { Channel } from '../../store';

type LatestCategoryProp = {
  id: string;
  name: string;
};

const myCategoryRoomsSelector =
  (state: DefaultRootState) => (categoryId: string, channel: Channel) => {
    const { rooms, status } = categoryRoomsSelector(state)(categoryId, channel);
    return {
      rooms: rooms.map(({ id, name }) => ({ id, name })),
      status,
    };
  };

export const LatestCategory: React.FC<LatestCategoryProp> = ({ id, name }) => {
  const myChannel: Channel = `LatestCategory-${id}`;
  const { rooms, status } = useSelector(
    (state) => myCategoryRoomsSelector(state)(id, myChannel),
    isEqual,
  );

  const effectCallback = () => {
    dispatch(getCategoryRooms(id, myChannel));
  };

  return (
    <div className='border my-2'>
      <p>{name}</p>
      <Progress status={status} callback={effectCallback}>
        <ul className='pl-2'>
          {rooms.map((room) => (
            <li key={room.id}>
              <NavRoomButton id={room.id} name={room.name} />
            </li>
          ))}
        </ul>
      </Progress>
    </div>
  );
};
