import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { dispatch, RootState } from '../store';
import { getCaregories } from '../categories';
import type { CategoriesState } from '../categories';

export const Nav : React.FC = () => {
  const { categories } = useSelector<RootState, CategoriesState>(state => state.categories);

  useEffect(() => {
    dispatch(getCaregories())
  }, [0]);

  return (
    <nav className="border flex-none min-w-min w-1/5">
        <p>カテゴリ一覧</p>
        <ul>
            {
              categories.map(category => {
                return (
                  <li key={category.id}>{category.name}</li>
                );
              })
            }
        </ul>
    </nav>
  );
};
