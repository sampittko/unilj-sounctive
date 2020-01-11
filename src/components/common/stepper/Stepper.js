import { Paper, Step, StepLabel, Stepper } from '@material-ui/core';

import PropTypes from 'prop-types';
import React from 'react';
import StepLabelOptional from './StepLabelOptional';
import { horizontalCenteringProps } from '../../../commonStyles';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  stepper: {
    width: '50%',
    ...horizontalCenteringProps,
  },
  wrapper: {
    position: 'absolute',
    bottom: 0,
    padding: '5vh 0',
    left: 0,
    right: 0,
  },
});

const getSteps = () =>
  ['Choose WAV file', 'Choose tool', 'Modify audio', 'Download new audio'];

const StepperComponent = props => {
  const classes = useStyles();
  const steps = getSteps();
  return (
    <Paper elevation={4} className={classes.wrapper}>
      <Stepper
        alternativeLabel
        activeStep={props.activeStep}
        className={classes.stepper}
      >
        {steps.map((label, i) => (
          <Step key={label}>
            <StepLabel optional={(
              <StepLabelOptional
                fileName={props.fileName}
                modification={props.modification}
                activeStep={props.activeStep}
                index={i}
              />
            )}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Paper>
  );
}

StepperComponent.propTypes = {
  activeStep: PropTypes.number.isRequired,
  fileName: PropTypes.string,
  modification: PropTypes.string,
}

export default StepperComponent;