import React, { useState } from 'react';
import { getSounctiveFileName, removeFileExtension } from '../../utils/fileUtils';

import Player from './Player';
import PropTypes from 'prop-types';

const Download = props => {
  const [downloaded, setDownloaded] = useState(false);
  
  const downloadFile = (function () {
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return () => {
      let url = window.URL.createObjectURL(getFileFromAudioBuffer());
      a.href = url;
      a.download = getSounctiveFileName(props.file.name);
      a.click();
      window.URL.revokeObjectURL(url);
      setDownloaded(true);
    };
  }());

  const getFileFromAudioBuffer = () => {
    let sampleRate = props.data.audioBuffer.sampleRate;
    let numberOfChannels = props.data.audioBuffer.numberOfChannels;
    let length = props.data.contextLength * numberOfChannels * 2 + 44;
    let buffer = new ArrayBuffer(length);
    let view = new DataView(buffer);
    let channels = [], i, sample;
    let offset = 0;
    let position = 0;

    // write WAVE header
    setUint32(0x46464952);                          // "RIFF"
    setUint32(length - 8);                          // file length - 8
    setUint32(0x45564157);                          // "WAVE"

    setUint32(0x20746d66);                          // "fmt " chunk
    setUint32(16);                                  // length = 16
    setUint16(1);                                   // PCM (uncompressed)
    setUint16(numberOfChannels);
    setUint32(sampleRate);
    setUint32(sampleRate * 2 * numberOfChannels);   // avg. bytes/sec
    setUint16(numberOfChannels * 2);                // block-align
    setUint16(16);                                  // 16-bit (hardcoded in this demo)

    setUint32(0x61746164);                          // "data" - chunk
    setUint32(length - position - 4);               // chunk length

    // write interleaved data
    for (i = 0; i < numberOfChannels; i++) {
      channels.push(props.data.audioBuffer.getChannelData(i));
    }

    while (position < length) {
      for (i = 0; i < numberOfChannels; i++) {                              // interleave channels
        sample = Math.max(-1, Math.min(1, channels[i][offset]));            // clamp
        sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0;  // scale to 16-bit signed int
        view.setInt16(position, sample, true);                              // write 16-bit sample
        position += 2;
      }
      offset++;                                                             // next source sample
    }

    // create Blob
    return new Blob([buffer], { type: "audio/wav" });

    function setUint16(data) {
      view.setUint16(position, data, true);
      position += 2;
    }

    function setUint32(data) {
      view.setUint32(position, data, true);
      position += 4;
    }
  }

  return (
      <Player
        audioBuffer={props.data.audioBuffer}
        onDownloadClick={downloadFile}
        downloadDisabled={downloaded}
        file={props.file}
      />
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