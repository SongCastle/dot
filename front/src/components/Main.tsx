import React from 'react';

import { Content } from './Content';
import { Nav } from './Nav';

export const Main: React.FC = () => {
  return (
    <main className="border flex w-4/5 rounded-xl m-auto min-h-screen-4/5 my-10">
      <Nav />
      <Content />
    </main>
  );
};
