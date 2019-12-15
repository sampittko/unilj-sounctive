import PropTypes from 'prop-types';
import React from 'react';
import { Typography } from "@material-ui/core"
import { getLabelFromValue } from '../../utils/chooseModificationUtils';
import { horizontalCenteringProps } from '../../commonStyles';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  text: {
    position: 'absolute',
    textAlign: 'center',
    top: '15vh',
    left: 0,
    right: 0,
    fontWeight: 'bolder',
    textTransform: 'uppercase',
    ...horizontalCenteringProps
  }
});

const ActiveStepText = props => {
  const classes = useStyles();

  const getContent = () => {
    switch (props.activeStep) {
      case 0: return "MP3 file selection";
      case 1: return "Modification selection";
      case 2: return getLabelFromValue(props.modification);
      case 3: return "Download";
      default: return "Unknown";
    }
  }

  return (
    <Typography className={classes.text} variant="h5">
      {getContent()}
    </Typography>
  );
}

ActiveStepText.propTypes = {
  activeStep: PropTypes.number.isRequired,
  modification: PropTypes.string,
}

export default ActiveStepText;
