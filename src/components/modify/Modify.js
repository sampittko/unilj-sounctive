import { FULL_CENTERING_CLASS_NAME, fullCenteringClass } from '../../commonStyles';
import { Typography, makeStyles } from '@material-ui/core';

import PropTypes from 'prop-types';
import React from 'react';

// import Tone from 'tone';

const useStyles = makeStyles({
  ...fullCenteringClass
})

const Modify = props => {
  const classes = useStyles();

  const performMagic = () => {
    // let player = new Tone.Player(URL.createObjectURL(props.file)).toMaster();
    // player.autostart = true;
    // let offlineContext = new Tone.OfflineContext(2, 20000 * 40, 20000);
    // offlineContext.createBufferSource();
  }

  return (
  <Typography
    className={classes[FULL_CENTERING_CLASS_NAME]}
    onClick={performMagic}
  >
    Modify.js
  </Typography>);
};

Modify.propTypes = {
  file: PropTypes.instanceOf(File).isRequired,
  modification: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
}

export default Modify;