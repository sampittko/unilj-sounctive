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

        Tone.setContext(offlineContext);

        let source = Tone.context.rawContext.createBufferSource();
        
        source.buffer = audioBuffer;

        let volume = new Tone.Volume(-4);
        let pitchShift = new Tone.PitchShift(7);

        Tone.connect(source, volume);
        volume.connect(pitchShift);
        pitchShift.connect(Tone.context.rawContext.destination);

        source.start();

        Tone.context.rawContext
          .startRendering()
          .then(renderedBuffer => {
            props.onSuccess({
              audioBuffer: renderedBuffer,
              contextLength: Tone.context.rawContext.length,
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