import React from 'react';
import isEqual from 'react-fast-compare';
import { useSelector } from 'react-redux';
import type { DefaultRootState } from 'react-redux';

import { LatestCategory } from './Category/LatestCategory';
import { Progress } from './Progress/Progress';

import { dispatch, getLatestCategories, latestCategoriesSelector } from '../store';
import type { Channel } from '../store';

const myChannel: Channel = 'Nav';
const myLatestCategoriesSelector = (state: DefaultRootState) => (channel: Channel) => {
  const { categories, status } = latestCategoriesSelector(state)(channel);
  return {
    categories: categories.map(({ id, name }) => ({ id, name })),
    status,
  };
};

export const Nav: React.FC = () => {
  const { categories, status } = useSelector(
    (state) => myLatestCategoriesSelector(state)(myChannel),
    isEqual,
  );

  const effectCallback = () => {
    dispatch(getLatestCategories(myChannel));
  };

  return (
    <nav className='border flex-none min-w-min p-2 w-1/5'>
      <p>カテゴリ一覧</p>
      <Progress status={status} callback={effectCallback}>
        {categories.length > 0 ? (
          categories.map(({ id, name }) => <LatestCategory key={id} id={id} name={name} />)
        ) : (
          <p>存在しません...</p>
        )}
      </Progress>
    </nav>
  );
};
