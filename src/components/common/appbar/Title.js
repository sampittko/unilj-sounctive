import { APP_NAME } from '../../../config';
import React from 'react';
import { Typography } from "@material-ui/core"

const Title = () =>
  <Typography variant="h6">
    {APP_NAME}
  </Typography>;

export default Title;
