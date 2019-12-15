import PropTypes from 'prop-types';
import React from 'react';
import { Typography } from '@material-ui/core';

const Download = () => {
  return (
    <Typography>
      Modify.js
    </Typography>);
};

Download.propTypes = {
  file: PropTypes.instanceOf(File).isRequired,
  onSuccess: PropTypes.func.isRequired,
}

export default Download;