import Appbar from './appbar/AppBar'
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/styles';

export const sharedStyles = {
  minWidth: '642px',
  margin: '0 auto',
}

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
          cancelableEdit={props.cancelableEdit}
          onEditCanceled={props.onEditCanceled}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          {React.Children.map(props.children, child => (
            <Grid item xs={12}>
              {React.cloneElement(child)}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object
  ]).isRequired,
  cancelableEdit: PropTypes.bool.isRequired,
  onEditCanceled: PropTypes.func.isRequired,
}

export default Container;
