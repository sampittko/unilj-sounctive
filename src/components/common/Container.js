import Appbar from './Appbar'
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const Container = props =>
  <Grid
    container
    alignItems="center"
    direction="column"
    spacing={0}
  >
    <Grid item xs={12}>
      <Appbar />
    </Grid>
    <Grid item xs={12}>
      {props.children}
    </Grid>
  </Grid>;

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object
  ])
}

export default Container;
