import ActiveStepText from './components/common/ActiveStepText';
import ChooseFileButton from './components/ChooseFileButton'
import ChooseModification from './components/choosemodification/ChooseModification';
import Container from './components/common/Container'
import DownloadFile from './components/DownloadFile';
import Modify from './components/modify/Modify';
import React from 'react'
import Stepper from './components/common/stepper/Stepper';

const App = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [file, setFile] = React.useState(null);
  const [modification, setModification] = React.useState(null);

  const getMainComponent = () => {
    switch (activeStep) {
      case 1:
        return (
          <ChooseModification
            activeModification={modification}
            onChoose={handleChosenModification}
          />
        );
      case 2:
        return <Modify/>;
      case 3:
        return <DownloadFile/>;
      default:
        return <ChooseFileButton onChoose={handleChosenFile}/>;
    }
  }

  const handleCanceledEdit = () => {
    setActiveStep(0);
    setFile(null);
    setModification(null);
  }

  const handleChosenFile = chosenFile => {
    setActiveStep(1);
    setFile(chosenFile);
    // let player = new Tone.Player(URL.createObjectURL(chosenFile)).toMaster();
    // player.autostart = true;
  }

  const handleChosenModification = chosenModification => {
    setActiveStep(2);
    setModification(chosenModification);
  }

  return (
    <Container
      cancelableEdit={activeStep !== 0}
      onEditCanceled={handleCanceledEdit}
    >
      <ActiveStepText activeStep={activeStep}/>
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
