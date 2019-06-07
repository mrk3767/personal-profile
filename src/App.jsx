import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {TopNav} from './TopNav'
import {Homepage} from './Homepage'

export const App = () => (
  <Router>
    <TopNav.Route />
    <Homepage.Route />
  </Router>
)