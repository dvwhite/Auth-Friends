import React from 'react';
import { Route, Switch } from "react-router-dom";

// Component imports
import PrivateRoute from './PrivateRoute';
import Login from './Login';
import Friends from './Friends';

const MasterRouter = () => {
  return (
    <Switch>
      <PrivateRoute path='/friends' component={Friends} />
      <Route exact path='/login' component={Login} />
      <Route path='/' component={Login} />} />
    </Switch>
  );
}

export default MasterRouter;
