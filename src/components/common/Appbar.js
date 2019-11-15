import { AppBar, Toolbar, Typography } from "@material-ui/core"

import { APP_NAME } from '../../config';
import React from 'react';

const AppbarComponent = () =>
  <AppBar>
    <Toolbar>
      <Typography variant="h6">
        {APP_NAME}
      </Typography>
    </Toolbar>
  </AppBar>;

export default AppbarComponent;
