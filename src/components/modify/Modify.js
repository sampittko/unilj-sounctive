import { FULL_CENTERING_CLASS_NAME, fullCenteringClass } from '../../commonStyles';
import { Typography, makeStyles } from '@material-ui/core';

import PropTypes from 'prop-types';
import React from 'react';
import Tone from 'tone';

const useStyles = makeStyles({
  ...fullCenteringClass
})

const Modify = props => {
  const classes = useStyles();

  const performMagic = () => {
    let fr = new FileReader();
    fr.readAsArrayBuffer(props.file);
    fr.addEventListener('load', () => {
      let arrayBuffer = fr.result;
      let audioContext = new Tone.Context().rawContext;
      
      audioContext.decodeAudioData(arrayBuffer)
        .then(audioBuffer => {
        let offlineContext = new Tone.OfflineContext(
            audioBuffer.numberOfChannels,
            audioBuffer.length * audioBuffer.sampleRate,
            audioBuffer.sampleRate
          ).rawContext;
        let source = offlineContext.createBufferSource();
        
        source.buffer = audioBuffer;
        source.connect(offlineContext.destination);
        source.start();
        offlineContext
          .startRendering()
          .then(renderedBuffer => {
            console.log('Rendering completed successfully');
            var song = audioContext.createBufferSource();
            song.buffer = renderedBuffer;
            song.connect(audioContext.destination);
            song.start();
            // let player = new Tone.Player(URL.createObjectURL(props.file)).toMaster();
            // player.autostart = true;
          })
          .catch(function (err) {
            console.log('Rendering failed: ' + err);
            // Note: The promise should reject when startRendering is called a second time on an OfflineAudioContext
          });
      });
    })
    // source.buffer = audioData;
    // source.connect(offlineContext.destination);
    // source.start();
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