import { Button } from '@material-ui/core';
import React from 'react';

const FileUpload = () =>
  <div>
    <input
      id="button-file"
      type="file"
      accept="audio/mp3"
    />
    <label htmlFor="button-file">
      <Button
        variant="contained"
        component="span"
      >
        Upload
      </Button>
    </label>
  </div>;

export default FileUpload;