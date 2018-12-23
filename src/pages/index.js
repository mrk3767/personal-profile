import React from 'react'
import { withSiteData } from 'react-static'
import Profile from '../components/Profile'

export default withSiteData(() => (
  <div style={{ textAlign: 'center' }}>
    <Profile />
  </div>
))
