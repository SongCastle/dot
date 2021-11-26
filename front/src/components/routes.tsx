import React from 'react';
import { ConnectedRouter as Router } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';

import { Top } from './Top';
import { history } from '../store';

export const Routes: React.FC = () => (
  <Router history={history}>
    <Switch>
      <Route path='/' component={Top} />
    </Switch>
  </Router>
);
