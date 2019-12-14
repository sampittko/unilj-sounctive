import ChooseFileButton from './components/ChooseFileButton'
import ChooseModification from './components/choosemodification/ChooseModification';
import ChosenFileText from './components/common/ChosenFileText';
import Container from './components/common/Container'
import React from 'react'
import Stepper from './components/Stepper';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  centered: {
    height: '100vh',
    width: '100vw',
    textAlign: 'center',
    display: 'table-cell',
    verticalAlign: 'middle',
  },
})

const App = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [file, setFile] = React.useState(null);
  const [modification, setModification] = React.useState(null);
  const classes = useStyles();

  const getMainComponent = () => {
    let component;
    switch (activeStep) {
      case 1: component = (
          <ChooseModification
            activeModification={modification}
            onChoose={handleChosenModification}
          />
        );
        break;
      case 2: console.log("Not yet implemented"); break;
      default: component = <ChooseFileButton onChoose={handleChosenFile}/>; break;
    }
    return (
      <div className={classes.centered}>
        {component}
      </div>
    );
  }

  const handleCanceledEdit = () => {
    setActiveStep(0);
    setFile(null);
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
      <ChosenFileText fileName={file ? file.name : ""} />
      {getMainComponent()}
      <Stepper activeStep={activeStep}/>
    </Container>
  );
}
  
export default App
