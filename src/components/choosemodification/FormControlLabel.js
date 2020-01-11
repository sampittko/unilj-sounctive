import { FormControlLabel, Radio } from '@material-ui/core';

import PropTypes from 'prop-types';
import React from 'react';
import { getValueFromLabel } from '../../utils/chooseModificationUtils';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  formControlLabel: {
    marginRight: 0,
  },
})

const FormControlLabelComponent = props => {
  const classes = useStyles();
  return (
      <FormControlLabel
        value={getValueFromLabel(props.label)}
        control={<Radio />}
        label={props.label}
        className={classes.formControlLabel}
        disabled={props.disabled}
      />
  );
}

FormControlLabelComponent.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
}

export default FormControlLabelComponent;