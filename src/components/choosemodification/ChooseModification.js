import FormControlLabel from './FormControlLabel';
import PropTypes from 'prop-types';
import { RadioGroup } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { sharedStyles } from '../common/Container';

const useStyles = makeStyles({
  radioGroup: {
    alignContent: 'space-around',
    ...sharedStyles
  },
})

const ChooseModification = props => {
  const classes = useStyles();
  return (
    <RadioGroup
      aria-label="modification"
      name="modification"
      value={props.activeModification}
      onChange={event => props.onChoose(event.target.value)}
      className={classes.radioGroup}
    >
      <FormControlLabel label="Bass booster"/>
      <FormControlLabel label="Pitch shifter"/>
      <FormControlLabel label="Volume changer"/>
      <FormControlLabel label="Speed changer"/>
      <FormControlLabel label="Reverser"/>
      <FormControlLabel label="Trimmer"/>
      <FormControlLabel label="Cutter"/>
    </RadioGroup>
  );
}

ChooseModification.propTypes = {
  onChoose: PropTypes.func.isRequired,
  activeModification: PropTypes.string,
}

export default ChooseModification;