import { Step, StepLabel, Stepper } from '@material-ui/core';

import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { sharedStyles } from './common/Container';

const useStyles = makeStyles({
  stepper: {
    position: 'absolute',
    bottom: '10vh',
    width: '50%',
    left: 0,
    right: 0,
    ...sharedStyles
  }
});

const getSteps = () =>
  ['Choose MP3 file', 'Choose modification', 'Modify song', 'Download new song'];

const StepperComponent = props => {
  const classes = useStyles();
  const steps = getSteps();
  return (
    <Stepper
      alternativeLabel
      activeStep={props.activeStep}
      className={classes.stepper}
    >
      {steps.map(label => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

StepperComponent.propTypes = {
  activeStep: PropTypes.number.isRequired,
}

export default StepperComponent;