import { Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const Container = props =>
  <Paper>
    {props.children}
  </Paper>;

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object
  ])
}

export default Container;
