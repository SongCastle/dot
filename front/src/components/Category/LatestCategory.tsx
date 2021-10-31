import React, { useEffect } from 'react';
import isEqual from 'react-fast-compare';
import { useSelector } from 'react-redux';
import type { DefaultRootState } from 'react-redux';

import { dispatch, getCategoryRooms, categoryRoomsSelector, StatusState } from '../../store';
import type { Channel } from '../../store';

type LatestCategoryProp = {
  id: string;
  name: string;
};

const myCategoryRoomsSelector =
  (state: DefaultRootState) => (category_id: string, channel: Channel) => {
    const { rooms, status } = categoryRoomsSelector(state)(category_id, channel);
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

  useEffect(() => {
    dispatch(getCategoryRooms(id, myChannel));
  }, []);

  return (
    <div className='border my-2'>
      <p>{name}</p>
      <ul className='pl-2'>
        {status === StatusState.LOAD ? (
          <li>ローディング中...</li>
        ) : (
          rooms.map(({ id, name }) => <li key={id}>{name}</li>)
        )}
      </ul>
    </div>
  );
};
