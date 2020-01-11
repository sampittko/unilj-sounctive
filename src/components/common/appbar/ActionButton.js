import { IconButton, Tooltip } from "@material-ui/core"

import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  iconButton: props => ({
    display: props.activeStep !== 0 ? 'initial' : 'none',
    position: 'absolute',
    right: '24px',
  }),
})

const ActionButton = props => {
  const classes = useStyles(props);
  return (
    <Tooltip
      placement="left"
      title={props.activeStep !== 3 ? "Cancel edit" : "Start new edit"}
    >
      <IconButton
        className={classes.iconButton}
        color="inherit"
        onClick={props.onClick}
      >
        {props.activeStep !== 3 ? <CancelIcon /> : <AddCircleIcon />}
      </IconButton>
    </Tooltip>
  );
}

ActionButton.propTypes = {
  activeStep: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default ActionButton;
