import { IconButton } from '@material-ui/core';
import Pause from '@material-ui/icons/Pause';
import PlayArrow from '@material-ui/icons/PlayArrow';
import PropTypes from 'prop-types';
import React from 'react';
import Stop from '@material-ui/icons/Stop';
import Tone from 'tone';
import { useState } from 'react';

const STATES = {
  LOADING: 0,
  PLAYING: 1,
  PAUSED: 2,
  STOPPED: 3,
}

const Player = props => {
  const [playerState, setPlayerState] = useState(STATES.LOADING);
  const [savedContextTime, setSavedContextTime] = useState(0);

  const player = new Tone.Player(props.audioBuffer, () => setPlayerState(STATES.STOPPED)).toMaster();

  const play = () => {
    if (playerState !== STATES.PLAYING) {
      if (savedContextTime !== 0) {
        player.start(savedContextTime);
        setSavedContextTime(0);
      }
      else {
        player.start();
      }
      setPlayerState(STATES.PLAYING);
    }
  }

  const pause = () => {
    if (playerState !== STATES.PAUSED) {
      setSavedContextTime(player.context.getOutputTimestamp().savedContextTime);
      player.stop();
      setPlayerState(STATES.PAUSED);
    }
  }

  const stop = () => {
    if (playerState !== STATES.PAUSED) {
      player.stop();
      setPlayerState(STATES.STOPPED);
    }
  }

  return (
    <div style={{display: 'none'}}>
      <IconButton
        onClick={play}
        disabled={playerState === STATES.LOADING || playerState === STATES.PLAYING}
      >
        <PlayArrow />
      </IconButton>
      <IconButton
        onClick={pause}
        disabled={playerState !== STATES.PLAYING}
      >
        <Pause />
      </IconButton>
      <IconButton
        onClick={stop}
        disabled={playerState === STATES.LOADING || playerState === STATES.STOPPED}
      >
        <Stop />
      </IconButton>
    </div>
  );
}

Player.propTypes = {
  audioBuffer: PropTypes.instanceOf(AudioBuffer).isRequired,
}

export default Player;