import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 200,
    height: 200,
    justify: 'center',
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    background: 'rgba(255, 255, 255, 0.7)',
  },
});

function Profile(props) {
  const { classes } = props;
  return (
    <Grid container justify="center">
      <Grid item xs={4}>
        <Paper className={classes.root} elevation={1}>
          <Grid container justify="center" alignItems="center">
            <Avatar alt="Michael Kenworthy" src="ME.jpg" className={classes.bigAvatar}/>
          </Grid>
          <Typography variant="title">
            Michael Kenworthy
          </Typography>
          <Typography variant="caption">Software Engineer @ Amazon.com</Typography>
          <Grid container xs={12} alignItems="center" justify="center">
            {/*<Grid item>*/}
              {/*<Button>About me</Button>*/}
            {/*</Grid>*/}
            <Grid item>
              <Button href="http://resume.kenworthy.io" target="_blank">Resume</Button>
            </Grid>
            <Grid item>
              <Button href="mailto:mike@kenworthy.io?Subject=Hello%20Mike" target="_blank">Send an email</Button>
            </Grid>
            <Grid item>
              <Button href="http://schedule.kenworthy.io" target="_blank">Schedule a meeting</Button>
            </Grid>
          </Grid>
          {/*<Divider variant="middle"/>*/}
          {/*<Typography variant="body1">*/}
            {/*This is a test of the content*/}
          {/*</Typography>*/}
        </Paper>
      </Grid>
    </Grid>
  );
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);