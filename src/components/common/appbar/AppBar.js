import { AppBar, Toolbar } from "@material-ui/core"

import ActionButton from "./ActionButton";
import PropTypes from 'prop-types';
import React from 'react';
import Title from "./Title";

const AppBarComponent = props => {
  return (
    <AppBar>
      <Toolbar>
        <Title/>
        <ActionButton
          activeStep={props.activeStep}
          onClick={props.onButtonClick}
        />
      </Toolbar>
    </AppBar>
  );
}

AppBarComponent.propTypes = {
  activeStep: PropTypes.number.isRequired,
  onButtonClick: PropTypes.func.isRequired,
}

export default AppBarComponent;
