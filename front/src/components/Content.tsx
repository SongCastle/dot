import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { LatestRooms } from './Room/LatestRooms';
import { Room } from './Room/Room';

export const Content: React.FC = () => (
  <section className='border flex-grow p-2'>
    <Switch>
      <Route path='/rooms/:roomId' component={Room} />
      <Route component={LatestRooms} />
    </Switch>
  </section>
);
