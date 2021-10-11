import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { StatusState } from '../common';
import { getRooms, RoomsState } from '../rooms';
import { dispatch } from '../store';
import type { RootState } from '../store';


export const Content : React.FC = () => {
  const { rooms, status } = useSelector<RootState, RoomsState>((state) => state.rooms);

  useEffect(() => {
    dispatch(getRooms());
  }, []);

  return (
    <section className="border flex-grow">
      <h3>最新のルーム一覧</h3>
      {
        status == StatusState.LOAD ? (
          <div>ローディング中...</div>
        ) : (
          rooms.length > 0 ? (
            rooms.map((room) =>
              <article key={room.id}>{room.name}</article>
            )
          ) : (
            <div>存在しません...</div>
          )
        )
      }
    </section>
  );
};
