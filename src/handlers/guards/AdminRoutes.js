import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthStore'

const AdminRoute = ({ component: Component, ...rest }) => (
  <AuthContext.Consumer>
    {({ isAdmin }) => (
      <Route render={
        props => isAdmin() 
        ? <Component {...props}/>
        : <Redirect to="/" />
      } {...rest} />
    )}
  </AuthContext.Consumer>
)

export default AdminRoute