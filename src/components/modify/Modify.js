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

  const applyModification = () => {
    let fr = new FileReader();
    fr.readAsArrayBuffer(props.file);
    fr.addEventListener('load', () => {
      let arrayBuffer = fr.result;
      let audioContext = new AudioContext();
      
      audioContext.decodeAudioData(arrayBuffer)
        .then(audioBuffer => {
        let offlineContext = new OfflineAudioContext(
            audioBuffer.numberOfChannels,
            audioBuffer.duration * audioBuffer.sampleRate,
            audioBuffer.sampleRate
          );
        let source = offlineContext.createBufferSource();
        
        source.buffer = audioBuffer;

        // let compressor = offlineContext.createDynamicsCompressor();

        // compressor.threshold.setValueAtTime(-20, offlineContext.currentTime);
        // compressor.knee.setValueAtTime(30, offlineContext.currentTime);
        // compressor.ratio.setValueAtTime(1, offlineContext.currentTime);
        // compressor.attack.setValueAtTime(.05, offlineContext.currentTime);
        // compressor.release.setValueAtTime(.25, offlineContext.currentTime);

        // let gainNode = offlineContext.createGain();
        // gainNode.gain.setValueAtTime(1, offlineContext.currentTime);

        // source.connect(compressor);
        // compressor.connect(offlineContext.destination);

        // source.connect(compressor);
        // compressor.connect(gainNode);
        // gainNode.connect(offlineContext.destination);

        source.connect(offlineContext.destination);

        source.start();

        offlineContext
          .startRendering()
          .then(renderedBuffer => {
            props.onSuccess({
              audioBuffer: renderedBuffer,
              contextLength: offlineContext.length,
            });
          })
          .catch(function (err) {
            console.error('Rendering failed: ' + err);
          });
      });
    })
  }

  return (
    <Typography
      className={classes[FULL_CENTERING_CLASS_NAME]}
      onClick={applyModification}
    >
      Modify.js
    </Typography>
  );
};

Modify.propTypes = {
  file: PropTypes.instanceOf(File).isRequired,
  modification: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
}

export default Modify;