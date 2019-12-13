import Container from './components/common/Container'
import FileChooser from './components/filechooser/FileChooser'
import React from 'react'
import Stepper from './components/Stepper';

const App = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [file, setFile] = React.useState(null);

  const getActiveComponent = () => {
    switch (activeStep) {
      case 1: console.log("Not yet implemented"); break;
      case 2: console.log("Not yet implemented"); break;
      default: return <FileChooser onChoose={file => handleChosenFile(file)}/>;
    }
  }

  const handleCanceledEdit = () => {
    setActiveStep(0);
    setFile(null);
  }

  const handleChosenFile = file => {
    setActiveStep(1);
    setFile(file);
  }

  return (
    <Container
      cancelableEdit={activeStep !== 0}
      onEditCanceled={handleCanceledEdit}
    >
      {getActiveComponent()}
      <Stepper activeStep={activeStep}/>
    </Container>
  );
}
  
export default App
