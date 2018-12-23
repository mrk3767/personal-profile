import React from 'react'
import { Root, Routes } from 'react-static'
import { Link } from '@reach/router'
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";

import NavBar from "./components/NavBar";
import bgImage from '../public/background.jpg';

const styles = {
  root: {
    height: '100vh',
    backgroundImage: `url(${bgImage})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
  }
}

function App(props) {
  const { classes } = props;
  return (
    <Root className={classes.root}>
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

export default withStyles(styles)(App);
