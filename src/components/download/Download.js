import { Button, makeStyles } from '@material-ui/core';
import { FULL_CENTERING_CLASS_NAME, fullCenteringClass } from '../../commonStyles';
import React, { useState } from 'react';

import GetAppIcon from '@material-ui/icons/GetApp';
import Player from './Player';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  ...fullCenteringClass
})

const Download = props => {
  const classes = useStyles();

  const [downloaded, setDownloaded] = useState(false);
  
  const downloadFile = (function () {
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function () {
      let url = window.URL.createObjectURL(bufferToWave());
      a.href = url;
      a.download = generateFileName();
      a.click();
      window.URL.revokeObjectURL(url);
    };
  }());

  const generateFileName = () => {
    var origin_name = props.file.name;
    var pos = origin_name.lastIndexOf('.');
    var no_ext = origin_name.slice(0, pos);

    return no_ext + " from Sounctive.wav";
  }

  const bufferToWave = () => {
    let abuffer = props.data.audioBuffer;
    
    var numOfChan = abuffer.numberOfChannels,
      length = props.data.contextLength * numOfChan * 2 + 44,
      buffer = new ArrayBuffer(length),
      view = new DataView(buffer),
      channels = [], i, sample,
      offset = 0,
      pos = 0;

    // write WAVE header
    setUint32(0x46464952);                         // "RIFF"
    setUint32(length - 8);                         // file length - 8
    setUint32(0x45564157);                         // "WAVE"

    setUint32(0x20746d66);                         // "fmt " chunk
    setUint32(16);                                 // length = 16
    setUint16(1);                                  // PCM (uncompressed)
    setUint16(numOfChan);
    setUint32(abuffer.sampleRate);
    setUint32(abuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
    setUint16(numOfChan * 2);                      // block-align
    setUint16(16);                                 // 16-bit (hardcoded in this demo)

    setUint32(0x61746164);                         // "data" - chunk
    setUint32(length - pos - 4);                   // chunk length

    // write interleaved data
    for (i = 0; i < abuffer.numberOfChannels; i++)
      channels.push(abuffer.getChannelData(i));

    while (pos < length) {
      for (i = 0; i < numOfChan; i++) {             // interleave channels
        sample = Math.max(-1, Math.min(1, channels[i][offset])); // clamp
        sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0; // scale to 16-bit signed int
        view.setInt16(pos, sample, true);          // write 16-bit sample
        pos += 2;
      }
      offset++ // next source sample
    }

    setDownloaded(true);

    // create Blob
    return new Blob([buffer], { type: "audio/wav" });

    function setUint16(data) {
      view.setUint16(pos, data, true);
      pos += 2;
    }

    function setUint32(data) {
      view.setUint32(pos, data, true);
      pos += 4;
    }
  }

  return (
    <div className={classes[FULL_CENTERING_CLASS_NAME]}>
      <Player
        file={props.file}
        audioBuffer={props.data.audioBuffer}
      />
      <Button
        variant="contained"
        color="secondary"
        size="large"
        startIcon={<GetAppIcon />}
        onClick={downloadFile}
        disabled={downloaded}
      >
        Download audio
      </Button>
    </div>
  );
}

Download.propTypes = {
  file: PropTypes.instanceOf(File).isRequired,
  data: PropTypes.shape({
    audioBuffer: PropTypes.instanceOf(AudioBuffer).isRequired,
    contextLength: PropTypes.number.isRequired,
  }),
  onSuccess: PropTypes.func.isRequired,
}

export default Download;