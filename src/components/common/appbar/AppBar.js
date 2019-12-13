import { AppBar, Toolbar } from "@material-ui/core"

import CancelButton from "./CancelButton";
import PropTypes from 'prop-types';
import React from 'react';
import Title from "./Title";

const AppBarComponent = props => {
  return (
    <AppBar>
      <Toolbar>
        <Title/>
        <CancelButton
          visible={props.cancelableEdit}
          onClick={props.onEditCanceled}
        />
      </Toolbar>
    </AppBar>
  );
}

AppBarComponent.propTypes = {
  cancelableEdit: PropTypes.bool.isRequired,
  onEditCanceled: PropTypes.func.isRequired,
}

export default AppBarComponent;