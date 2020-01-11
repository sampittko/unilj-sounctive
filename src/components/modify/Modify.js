import { FULL_CENTERING_CLASS_NAME, fullCenteringClass } from '../../commonStyles';
import { Fade, LinearProgress, Slider, Typography, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';

import { MODIFICATIONS_VALUES } from '../../utils/chooseModificationUtils';
import PropTypes from 'prop-types';
import Tone from 'tone';

const useStyles = makeStyles({
  grayText: {
    color: '#bdbdbd',
  },
  captionGrayText: {
    color: '#bdbdbd',
    fontStyle: 'italic',
  },
  progress: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: '100',
  },
  ...fullCenteringClass
})

const Modify = props => {
  const classes = useStyles();
  
  const [value, setValue] = useState(0);
  const [applyingModification, setApplyingModification] = useState(false);

  const applyModification = () => {
    if (value === 0) {
      return;
    }
    setApplyingModification(true);

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

        appendModificationValueToGraph(source);

        source.start();

        Tone.context.rawContext
          .startRendering()
          .then(renderedBuffer => {
            props.onSuccess({
              audioBuffer: renderedBuffer,
              contextLength: Tone.context.rawContext.length,
            });
          })
          .catch(err => {
            console.error('Rendering failed: ' + err);
          });
      });
    })
  }

  const appendModificationValueToGraph = source => {
    let component;
    
    switch (props.modification) {
      case MODIFICATIONS_VALUES.NO_1:
        console.error("Unsupported operation");
        return;
      case MODIFICATIONS_VALUES.NO_2:
        component = new Tone.PitchShift(value);
        break;
      case MODIFICATIONS_VALUES.NO_3:
        component = new Tone.Volume(value);
        break;
      case MODIFICATIONS_VALUES.NO_4:
        console.error("Unsupported operation");
        return;
      case MODIFICATIONS_VALUES.NO_5:
        console.error("Unsupported operation");
        return;
      case MODIFICATIONS_VALUES.NO_6:
        console.error("Unsupported operation");
        return;
      case MODIFICATIONS_VALUES.NO_7:
        console.error("Unsupported operation");
        return;
      default:
        console.error("Invalid modification value");
        return;
    }

    Tone.connect(source, component);
    component.connect(Tone.context.rawContext.destination);
  }

  const getTextValue = () => {
    if (value > 0) {
      return `+${value}`;
    }
    return value;
  }

  return (
    <div className={classes[FULL_CENTERING_CLASS_NAME]}>
      <Typography
        gutterBottom
        variant="h3"
        className={applyingModification ? classes.grayText : ""}
      >
        {getTextValue()}
      </Typography>
      {applyingModification && (
        <LinearProgress
          variant="query"
          className={classes.progress}
        />
      )}
      <Slider
        defaultValue={0}
        step={1}
        marks
        min={-5}
        max={5}
        track={false}
        onChange={(event, value) => setValue(value)}
        onChangeCommitted={applyModification}
        disabled={applyingModification}
      />
      {applyingModification && (
        <Fade in timeout={1500}>
          <Typography
            variant="body2"
            className={classes.captionGrayText}
          >
            Please wait, processing changes..
          </Typography>
        </Fade>
      )}
    </div>
  );
};

Modify.propTypes = {
  file: PropTypes.instanceOf(File).isRequired,
  modification: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
}

export default Modify;