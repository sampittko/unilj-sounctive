import Appbar from './common/Appbar'
import Container from './common/Container'
import FileUpload from './FileUpload'
import React from 'react';

const App = () => {
  return (
    <Container>
      <Appbar />
      <FileUpload />
    </Container>
  );
}

export default App;
