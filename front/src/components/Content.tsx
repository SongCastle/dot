import React, { useEffect } from 'react';
import isEqual from 'react-fast-compare';
import { useSelector } from 'react-redux';
import type { DefaultRootState } from 'react-redux';

import { dispatch, getLatestRooms, latestRoomsSelector, StatusState } from '../store';

import type { Channel } from '../store';

const myChnnel: Channel = 'Content';
const myLatestRoomsSelector = (state: DefaultRootState) => (channel: Channel) => {
  const { rooms, status } = latestRoomsSelector(state)(channel);
  return {
    rooms: rooms.map(({ id, name }) => ({ id, name })),
    status,
  };
};

export const Content: React.FC = () => {
  const { rooms, status } = useSelector((state) => myLatestRoomsSelector(state)(myChnnel), isEqual);

  useEffect(() => {
    dispatch(getLatestRooms(myChnnel));
  }, []);

  return (
    <section className='border flex-grow'>
      <h3>最新のルーム一覧</h3>
      {(() => {
        if (status === StatusState.LOAD) {
          return <p>ローディング中...</p>;
        }
        if (rooms.length > 0) {
          return rooms.map((room) => <article key={room.id}>{room.name}</article>);
        }
        return <div>存在しません...</div>;
      })()}
    </section>
  );
};
