import React from 'react';
import { BrowserRouter as Route, Switch } from "react-router-dom";

const MasterRouter = () => {
  return (
    <Switch>
      <PrivateRoute exact path='/friends' component={Friends} />
      <Route exact path='/login' component={Login} />
    </Switch>
  )
}

export default MasterRouter;
