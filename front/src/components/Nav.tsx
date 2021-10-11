import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { dispatch, RootState } from '../store';
import { StatusState } from '../common';
import { getCaregories } from '../categories';
import type { CategoriesState } from '../categories';

export const Nav : React.FC = () => {
  const { categories, status } = useSelector<RootState, CategoriesState>(state => state.categories);

  useEffect(() => {
    dispatch(getCaregories())
  }, []);

  return (
    <nav className="border flex-none min-w-min w-1/5">
        <p>カテゴリ一覧</p>
        <ul>
          {
            status == StatusState.LOAD ? (
              <div>ローディング中...</div>
            ) : (
              categories.length > 0 ? (
                categories.map(category =>
                  <li key={category.id}>{category.name}</li>
                )
              ) : (
                <li>存在しません...</li>
              )
            )
          }
        </ul>
    </nav>
  );
};
