import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Top } from './Top';

export const Routes: React.FC = () => (
  <Router>
    <Switch>
      <Route path='/' component={Top} />
    </Switch>
  </Router>
);
