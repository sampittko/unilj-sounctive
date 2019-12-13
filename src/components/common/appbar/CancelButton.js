import { IconButton, Tooltip } from "@material-ui/core"

import CancelIcon from '@material-ui/icons/Cancel';
import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(props => ({
  tooltip: {
    display: props.visible ? 'inherit' : 'none',
  },
  iconButton: {
    position: 'absolute',
    right: '24px',
  },
}))

const CancelButton = props => {
  const classes = useStyles(props);
  return (
    <Tooltip
      placement="left"
      title="Cancel editing"
      className={classes.tooltip}
    >
      <IconButton
        className={classes.iconButton}
        color="inherit"
        onClick={props.onClick}
      >
        <CancelIcon />
      </IconButton>
    </Tooltip>
  );
}

CancelButton.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default CancelButton;
