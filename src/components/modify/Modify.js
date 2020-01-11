import { FULL_CENTERING_CLASS_NAME, fullCenteringClass } from '../../commonStyles';
import { LinearProgress, Slider, Typography, makeStyles } from '@material-ui/core';
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
    let component1, component2;
    
    switch (props.modification) {
      case MODIFICATIONS_VALUES.NO_1:
        let sliderValue = getSliderValue(true);
        component1 = new Tone.Filter(200 - sliderValue * 20, "lowshelf");
        component2 = new Tone.Gain(sliderValue * 0.5);
        break;
      case MODIFICATIONS_VALUES.NO_2:
        component1 = new Tone.PitchShift(value);
        break;
      case MODIFICATIONS_VALUES.NO_3:
        component1 = new Tone.Volume(value);
        break;
      case MODIFICATIONS_VALUES.NO_4:
        source.playbackRate.value = value;
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

    Tone.connect(source, component1);

    if (component2) {
      component1.connect(component2);
      component2.connect(Tone.context.rawContext.destination);
      return;
    }

    if (component1) {
      component1.connect(Tone.context.rawContext.destination);
    }
  }

  const getTextValue = () => {
    if (value > 0) {
      return `+${value}`;
    }
    return value;
  }

  const getSliderValue = max => {
    switch (props.modification) {
      case MODIFICATIONS_VALUES.NO_1:
        return max ? 5 : 0;
      case MODIFICATIONS_VALUES.NO_2:
        return max ? 24 : -24;
      case MODIFICATIONS_VALUES.NO_3:
        return max ? 20 : -20;
      case MODIFICATIONS_VALUES.NO_4:
        return max ? 2.0 : 0.5;
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
        console.error("Invalid modification maxValue");
        return;
    }
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
        defaultValue={props.modification === MODIFICATIONS_VALUES.NO_4 ? 1.0 : 0}
        step={props.modification === MODIFICATIONS_VALUES.NO_4 ? 0.1 : 1}
        marks
        min={getSliderValue(false)}
        max={getSliderValue(true)}
        track={false}
        onChange={(event, value) => setValue(value)}
        onChangeCommitted={applyModification}
        disabled={applyingModification}
      />
      <Typography
        style={!applyingModification ? {visibility: 'hidden'} : {visibility: 'visible'}}
        variant="body2"
        className={classes.captionGrayText}
      >
        Please wait, processing changes..
      </Typography>
    </div>
  );
};

Modify.propTypes = {
  file: PropTypes.instanceOf(File).isRequired,
  modification: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
}

export default Modify;