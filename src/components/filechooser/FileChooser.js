import { Button } from '@material-ui/core';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import PropTypes from 'prop-types';
import React from 'react';
import { SUPPORTED_FILE_TYPES } from '../../config';
import Tone from 'tone';
import { makeStyles } from '@material-ui/styles';
import { sharedStyles } from '../common/Container';

const useStyles = makeStyles({
  fileChooser: {
    textAlign: 'center',
    ...sharedStyles
  },
  input: {
    display: 'none',
  },
})

const startPlaying = event => {
  let files = Array.from(event.target.files);
  let player = new Tone.Player(URL.createObjectURL(files[0])).toMaster();
  player.autostart = true;
}

const FileChooser = props => {
  const classes = useStyles();
  return (
    <div className={classes.fileChooser}>
      <input
        id="button-file"
        className={classes.input}
        type="file"
        accept={SUPPORTED_FILE_TYPES}
        onChange={event => startPlaying(event)}
      />
      <label htmlFor="button-file">
        <Button
          variant="contained"
          size="large"
          component="span"
          endIcon={<InsertDriveFileIcon />}
        >
          Choose MP3 file
        </Button>
      </label>
    </div>
  );
}

FileChooser.propTypes = {
  onChoose: PropTypes.func.isRequired,
}

export default FileChooser;