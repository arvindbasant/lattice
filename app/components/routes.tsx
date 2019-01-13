import * as React from 'react';
import { Switch, Route } from 'react-router';
import App from './App';
import Counter from './Counter';
import Login from './login';
import CreateUserForm from './manage/user-form-create';
import FlowBuilder from './flow-builder/index';

export default () => (
  <App>
    <Switch>
      <Route path="/counter" component={Counter} />
      <Route path="/login" component={Login} />
      <Route path="/datasource" component={FlowBuilder} />
      <Route path="/" component={CreateUserForm} />
    </Switch>
  </App>
);
