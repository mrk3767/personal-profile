import {Route} from 'react-router-dom'
import React from 'react'

export const TopNav = () => (
  <div className="navigation navigation-top">
    This is the top navbar
  </div>
)

TopNav.Route = props => (
  <Route
    path="*"
    component={TopNav}
    {...props}
  />
)
TopNav.Route.displayName = '*/TopNav'
