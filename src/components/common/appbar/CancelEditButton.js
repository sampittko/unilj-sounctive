import { IconButton, Tooltip } from "@material-ui/core"

import CancelIcon from '@material-ui/icons/Cancel';
import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  iconButton: props => ({
    display: props.visible ? 'initial' : 'none',
    position: 'absolute',
    right: '24px',
  }),
})

const CancelEditButton = props => {
  const classes = useStyles(props);
  return (
    <Tooltip
      placement="left"
      title="Cancel edit"
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

CancelEditButton.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default CancelEditButton;
