import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from '../views/components';
import {PublicRoutes} from '../handlers/guards'
import { Main as MainLayout, Minimal as MinimalLayout } from '../views/layouts';

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  UserForm as UserFormView,
  GuestList as GuestListView,
  GuestForm as GuestFormView,
  GuestInvite as GuestInviteView,
  Account as AccountView,
  SignUp as SignUpView,
  SignIn as SignInView,
  Invitation as InvitationView,
  NotFound as NotFoundView
} from '../views/pages';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/dashboard"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <RouteWithLayout
        component={UserFormView}
        exact
        layout={MinimalLayout}
        path="/user/add"
      />
      <RouteWithLayout
        component={UserFormView}
        exact
        layout={MinimalLayout}
        path="/user/edit/:id"
      />
      <RouteWithLayout
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/turnos"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout exact path="/guests" component={GuestListView} layout={MainLayout} />
      <RouteWithLayout exact path="/guest/edit/:id" component={GuestFormView} layout={MinimalLayout} />
      <RouteWithLayout exact path="/guest/invite/:id" component={GuestInviteView} layout={MinimalLayout} />
      <RouteWithLayout
        component={GuestFormView}
        exact
        layout={MinimalLayout}
        path="/guest/add"
      />
      <PublicRoutes exact path="/sign-up" component={SignUpView} />
      <PublicRoutes exact path="/sign-in" component={SignInView} />
      <PublicRoutes exact path="/inviteme" component={InvitationView} />

      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
