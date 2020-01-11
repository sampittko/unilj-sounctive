import ActiveStepText from './components/common/ActiveStepText';
import ChooseFileButton from './components/ChooseFileButton'
import ChooseModification from './components/choosemodification/ChooseModification';
import Container from './components/common/Container'
import Download from './components/download/Download';
import Modify from './components/modify/Modify';
import React from 'react'
import Stepper from './components/common/stepper/Stepper';

const ACTIONS = {
  CHOOSE_MODIFICATION: 'choose-modification',
  MODIFY: 'modify',
  DOWNLOAD_FILE: 'download-file',
  CHOOSE_FILE: 'choose-file',
}

const App = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [file, setFile] = React.useState(null);
  const [modification, setModification] = React.useState(null);
  const [data, setData] = React.useState(null);

  const getMainComponent = () => {
    switch (activeStep) {
      case 1:
        return (
          <ChooseModification
            modification={modification}
            onSuccess={modification => handleSuccess(ACTIONS.CHOOSE_MODIFICATION, modification)}
          />
        );
      case 2:
        return (
          <Modify
            modification={modification}
            file={file}
            onSuccess={data => handleSuccess(ACTIONS.MODIFY, data)}
          />
        );
      case 3:
        return (
          <Download
            file={file}
            data={data}
            onSuccess={() => handleSuccess(ACTIONS.DOWNLOAD_FILE)}
          />
        );
      default:
        return <ChooseFileButton onSuccess={file => handleSuccess(ACTIONS.CHOOSE_FILE, file)}/>;
    }
  }

  const handleSuccess = (action, value) => {
    switch (action) {
      case ACTIONS.CHOOSE_FILE:
        setFile(value);
        break;
      case ACTIONS.CHOOSE_MODIFICATION:
        setModification(value);
        break;
      case ACTIONS.MODIFY:
        setData(value);
        break;
      default:
        resetAppState();
        return;
    }
    incrementStep();
  }

  const incrementStep = () => {
    setActiveStep(activeStep + 1);
  }

  const resetAppState = () => {
    setActiveStep(0);
    setFile(null);
    setModification(null);
    setData(null);
  }

  return (
    <Container
      activeStep={activeStep}
      onButtonClick={resetAppState}
    >
      <ActiveStepText
        activeStep={activeStep}
        modification={modification}
      />
      {getMainComponent()}
      <Stepper
        activeStep={activeStep}
        fileName={file ? file.name : ""}
        modification={modification}
      />
    </Container>
  );
}
  
export default App
