import { FULL_CENTERING_CLASS_NAME, fullCenteringClass } from '../commonStyles';

import { Button } from '@material-ui/core';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  input: {
    display: 'none',
  },
  ...fullCenteringClass
})

const ChooseFileButton = props => {
  const classes = useStyles();

  const handleChange = event => {
    let files = Array.from(event.target.files);
    let file = files[0];
    props.onSuccess(file);
  }

  return (
    <div className={classes[FULL_CENTERING_CLASS_NAME]}>
      <input
        id="button-file"
        className={classes.input}
        type="file"
        accept="audio/wav"
        onChange={handleChange}
      />
      <label htmlFor="button-file">
        <Button
          variant="contained"
          size="large"
          component="span"
          endIcon={<InsertDriveFileIcon />}
        >
          Choose WAV file
        </Button>
      </label>
    </div>
  );
}

ChooseFileButton.propTypes = {
  onSuccess: PropTypes.func.isRequired,
}

export default ChooseFileButton;