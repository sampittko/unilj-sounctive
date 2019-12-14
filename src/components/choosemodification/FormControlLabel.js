import { FormControlLabel, Radio } from '@material-ui/core';

import { MODIFICATIONS_LABELS } from '../../config';
import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  formControlLabel: {
    marginRight: 0,
  },
})

const getValue = label => {
  switch (label) {
    case MODIFICATIONS_LABELS.NO_1: return "bass-boost";
    case MODIFICATIONS_LABELS.NO_2: return "pitch-shift";
    case MODIFICATIONS_LABELS.NO_3: return "volume-change";
    case MODIFICATIONS_LABELS.NO_4: return "speed-change";
    case MODIFICATIONS_LABELS.NO_5: return "reverse";
    case MODIFICATIONS_LABELS.NO_6: return "trim";
    case MODIFICATIONS_LABELS.NO_7: return "cut";
    default: return "";
  }
}

const FormControlLabelComponent = props => {
  const classes = useStyles();
  return (
      <FormControlLabel
        value={getValue(props.label)}
        control={<Radio />}
        label={props.label}
        className={classes.formControlLabel}
      />
  );
}

FormControlLabelComponent.propTypes = {
  label: PropTypes.string.isRequired,
}

export default FormControlLabelComponent;