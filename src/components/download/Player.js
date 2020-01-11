import { Button, Card, CardActions, CardContent, IconButton, Typography, makeStyles } from '@material-ui/core';
import { FULL_CENTERING_CLASS_NAME, fullCenteringClass, horizontalCenteringProps } from '../../commonStyles';
import React, { useState } from 'react';

import GetAppIcon from '@material-ui/icons/GetApp';
import PlayArrow from '@material-ui/icons/PlayArrow';
import PropTypes from 'prop-types';
import Stop from '@material-ui/icons/Stop';
import Tone from 'tone';
import { removeFileExtension } from '../../utils/fileUtils';

const PLAYER_STATES = {
  PLAYING: 'started',
  STOPPED: 'stopped',
}

const useStyles = makeStyles({
  download: {
    position: 'absolute',
    right: 0,
    marginRight: '8px',
  },
  card: {
    width: '300px !important',
    position: 'relative',
    ...horizontalCenteringProps,
  },
  ...fullCenteringClass
})

const Player = props => {
  const [player, setPlayer] = useState(new Tone.Player(props.audioBuffer).toMaster());
  const [playerState, setPlayerState] = useState(PLAYER_STATES.STOPPED);

  const classes = useStyles();

  const play = () => {
    player.start();
    setPlayerState(PLAYER_STATES.PLAYING);
  }

  const stop = () => {
    player.disconnect();
    setPlayer(new Tone.Player(props.audioBuffer).toMaster());
    setPlayerState(PLAYER_STATES.STOPPED);
  }

  // TODO verify
  // useEffect(() => () => {
  //   if (player) {
  //     player.disconnect();
  //   }
  // }, [player]);

  return (
    <div className={classes[FULL_CENTERING_CLASS_NAME]}>
      <Card className={classes.card}>
        <CardContent>
          <Typography component="h5" variant="h5">
            {removeFileExtension(props.file.name)}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            from Sounctive
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            onClick={play}
            disabled={playerState === PLAYER_STATES.PLAYING}
          >
            <PlayArrow />
          </IconButton>
          <IconButton
            onClick={stop}
            disabled={playerState === PLAYER_STATES.STOPPED}
          >
            <Stop />
          </IconButton>
          <Button
            className={classes.download}
            size="large"
            variant="contained"
            color="secondary"
            startIcon={<GetAppIcon />}
            onClick={props.onDownloadClick}
            disabled={props.downloadDisabled}
          >
            Download
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

Player.propTypes = {
  file: PropTypes.instanceOf(File).isRequired,
  audioBuffer: PropTypes.instanceOf(AudioBuffer).isRequired,
  onDownloadClick: PropTypes.func.isRequired,
  downloadDisabled: PropTypes.bool.isRequired,
}

export default Player;