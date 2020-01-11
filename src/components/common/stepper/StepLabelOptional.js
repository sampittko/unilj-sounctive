import { Divider, Typography } from '@material-ui/core';

import PropTypes from 'prop-types';
import React from 'react';
import { getLabelFromValue } from '../../../utils/chooseModificationUtils';
import { makeStyles } from '@material-ui/styles';
import { removeFileExtension } from '../../../utils/fileUtils';

const getDefaultText = () =>
  ['Not chosen yet', 'Not chosen yet', 'Not modified yet', 'Not created yet'];

const useStyles = makeStyles({
  optional: {
    color: 'rgba(0, 0, 0, 0.54)',
    textAlign: 'center',
    maxHeight: '40px',
    height: '40px',
    width: 'inherit',
    maxWidth: 'inherit',
    fontStyle: 'italic',
  },
  divider: {
    width: '50%',
    margin: '5px auto',
  },
});

const StepLabelOptional = props => {
  const classes = useStyles();

  const getContent = () => {
    if (props.activeStep > props.index) {
      switch (props.index) {
        case 0: return removeFileExtension(props.fileName);
        case 1: return getLabelFromValue(props.modification);
        case 2: return "Modification applied";
        default: return "Unknown";
      }
    }
    else {
      if (props.activeStep === 3) {
        return "Ready to download";
      }
      return getDefaultText()[props.index];
    }
  }

  return (
    <span>
      <Divider className={classes.divider} />
      <Typography variant="body2" className={classes.optional}>
        {getContent()}
      </Typography>
    </span>
  );
}

StepLabelOptional.propTypes = {
  fileName: PropTypes.string,
  modification: PropTypes.string,
  activeStep: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
}

export default StepLabelOptional;