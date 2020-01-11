import { FULL_CENTERING_CLASS_NAME, fullCenteringClass, horizontalCenteringProps } from '../../commonStyles';

import FormControlLabel from './FormControlLabel';
import { MODIFICATIONS_LABELS } from '../../utils/chooseModificationUtils';
import PropTypes from 'prop-types';
import { RadioGroup } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  radioGroup: {
    alignContent: 'space-around',
    ...horizontalCenteringProps
  },
  ...fullCenteringClass
})

const ChooseModification = props => {
  const classes = useStyles();
  return (
    <div className={classes[FULL_CENTERING_CLASS_NAME]}>
      <RadioGroup
        aria-label="modification"
        name="modification"
        value={props.modification}
        onChange={event => props.onSuccess(event.target.value)}
        className={classes.radioGroup}
      >
        <FormControlLabel label={MODIFICATIONS_LABELS.NO_1}/>
        <FormControlLabel label={MODIFICATIONS_LABELS.NO_2}/>
        <FormControlLabel label={MODIFICATIONS_LABELS.NO_3}/>
        <FormControlLabel label={MODIFICATIONS_LABELS.NO_4}/>
        <FormControlLabel label={MODIFICATIONS_LABELS.NO_5} disabled/>
        <FormControlLabel label={MODIFICATIONS_LABELS.NO_6} disabled/>
        <FormControlLabel label={MODIFICATIONS_LABELS.NO_7} disabled/>
      </RadioGroup>
    </div>
  );
}

ChooseModification.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  modification: PropTypes.string,
}

export default ChooseModification;