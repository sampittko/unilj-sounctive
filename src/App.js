import { ACTIONS } from './utils/appUtils';
import ActiveStepText from './components/common/ActiveStepText';
import ChooseFileButton from './components/ChooseFileButton'
import ChooseModification from './components/choosemodification/ChooseModification';
import Container from './components/common/Container'
import Download from './components/Download';
import Modify from './components/modify/Modify';
import React from 'react'
import Stepper from './components/common/stepper/Stepper';

const App = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [file, setFile] = React.useState(null);
  const [modification, setModification] = React.useState(null);
  const [modifiedFile, setModifiedFile] = React.useState(null);

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
            onSuccess={modifiedFile => handleSuccess(ACTIONS.MODIFY, modifiedFile)}
          />
        );
      case 3:
        return (
          <Download
            file={modifiedFile}
            onSuccess={() => handleSuccess(ACTIONS.DOWNLOAD_FILE)}
          />
        );
      default:
        return <ChooseFileButton onSuccess={file => handleSuccess(ACTIONS.CHOOSE_FILE, file)}/>;
    }
  }

  const handleSuccess = (action, x) => {
    switch (action) {
      case ACTIONS.CHOOSE_FILE:
        setFile(x);
        break;
      case ACTIONS.CHOOSE_MODIFICATION:
        setModification(x);
        break;
      case ACTIONS.MODIFY:
        setModifiedFile(x);
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
    setModifiedFile(null);
  }

  return (
    <Container
      cancelableEdit={activeStep !== 0}
      onEditCanceled={resetAppState}
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
