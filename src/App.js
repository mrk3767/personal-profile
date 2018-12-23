import React from 'react'
import { Root, Routes } from 'react-static'
import { Link } from '@reach/router'
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";

import NavBar from "./components/NavBar";
import bgImage from '../public/background.jpg';

document.body.style.height = '100vh';
document.body.style.backgroundImage = `url(${bgImage})`;
document.body.style.backgroundPosition = 'center';
document.body.style.backgroundRepeat = 'no-repeat';
document.body.style.backgroundSize = '100% 100%';

function App(props) {
  const { classes } = props;
  return (
    <Root>
      {/*<NavBar />*/}
        {/*<Link to="/">Home</Link>*/}
        {/*<Link to="/about">About</Link>*/}
        {/*<Link to="/blog">Blog</Link>*/}
      {/*</NavBar>*/}
      <div className="content">
        <Routes />
      </div>
    </Root>
  )
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default App;
