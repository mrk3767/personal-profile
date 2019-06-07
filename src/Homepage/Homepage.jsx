import React from 'react'
import {Route} from 'react-router-dom'

export const Homepage = () => (
  <div>
    <div>[Picture of me]</div>
    <div>Michael R. Kenworthy</div>
    <div>Software Engineer & ...</div>
    <div>Bio</div>
    <div>
      <div>Schedule a meeting</div>
      <div>Check out my resume</div>
      <div>Send me an email</div>
    </div>
    <div>
      <div>Facebook</div>
      <div>Insta</div>
      <div>...</div>
    </div>
  </div>

)

Homepage.Route = props => (
  <Route
    path="/"
    component={Homepage}
    {...props}
  />
)
Homepage.Route.displayName = '//Homepage'