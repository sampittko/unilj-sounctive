import PropTypes from 'prop-types';
import React from 'react';
import { Typography } from "@material-ui/core"
import { makeStyles } from '@material-ui/styles';
import { sharedStyles } from './Container';

const useStyles = makeStyles({
  text: {
    position: 'absolute',
    textAlign: 'center',
    top: '20vh',
    left: 0,
    right: 0,
    ...sharedStyles
  }
});

const ChosenFileText = props => {
  const classes = useStyles();
  return (
    <Typography className={classes.text} variant="h6">
      {props.fileName === '' ? "No file chosen" : props.fileName}
    </Typography>
  );
}

ChosenFileText.propTypes = {
  fileName: PropTypes.string.isRequired,
}

export default ChosenFileText;
