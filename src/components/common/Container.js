import Appbar from './appbar/AppBar'
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  container: {
    height: '100vh',
  },
});

const Container = props => {
  const classes = useStyles();
  return (
    <Grid container className={classes.container}>
      <Grid item xs={12}>
        <Appbar
          activeStep={props.activeStep}
          onButtonClick={props.onButtonClick}
        />
        {props.children}
      </Grid>
    </Grid>
  );
};

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object
  ]).isRequired,
  activeStep: PropTypes.number.isRequired,
  onButtonClick: PropTypes.func.isRequired,
}

export default Container;
