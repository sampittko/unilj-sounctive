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
            audioBuffer.duration,
            audioBuffer.sampleRate
          ).rawContext;
        let source = offlineContext.createBufferSource();
        
        source.buffer = audioBuffer;

        let compressor = offlineContext.createDynamicsCompressor();

        compressor.threshold.setValueAtTime(-20, offlineContext.currentTime);
        compressor.knee.setValueAtTime(30, offlineContext.currentTime);
        compressor.ratio.setValueAtTime(5, offlineContext.currentTime);
        compressor.attack.setValueAtTime(.05, offlineContext.currentTime);
        compressor.release.setValueAtTime(.25, offlineContext.currentTime);

        source.connect(compressor);
        compressor.connect(offlineContext.destination);

        offlineContext
          .startRendering()
          .then(renderedBuffer => {
            console.log('Rendering completed successfully');
            props.onSuccess({
              audioBuffer: renderedBuffer,
              contextLength: offlineContext.length,
            });
          })
          .catch(function (err) {
            console.log('Rendering failed: ' + err);
          });
      });
    })
  }

  return (
    <Typography
      className={classes[FULL_CENTERING_CLASS_NAME]}
      onClick={performMagic}
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