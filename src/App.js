import './App.css';
import 'bulma/css/bulma.css'
import './Settings/Settings'
import Settings from './Settings/Settings';
import Breath from './Breath/Breath'
import { useState } from 'react';
import { loadState, saveState } from './localStorage'
import { getDefaultExerciseList, createDefaultExercise } from './defaults'


function App() {
  const [exercises, setExercises] = useState(loadState() || getDefaultExerciseList())
  const [states, setStates] = useState(createDefaultExercise())

  const saveUpdatedExercises = (updatedExercises) => {
    setExercises(updatedExercises)
    saveState(updatedExercises)
  }

  const [breath, setBreath] = useState(false)

  const startBreath = (newStates) => {
    setStates(newStates)
    setBreath(!breath)
  }

  const displaySettings = () => setBreath(false)

  return (
    <div className="container">
      {breath ? <Breath states={states} displaySettings={displaySettings} /> : <Settings states={states} updateState={startBreath} exercises={exercises} updateExercises={saveUpdatedExercises} />}
    </div>
  );
}

export default App;
