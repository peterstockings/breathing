import './App.css';
import 'bulma/css/bulma.css'
import Home from './Home/Home';
import Breath from './Breath/Breath'
import Navbar from './Navbar'
import { useState } from 'react';
import { loadState, saveState } from './localStorage'
import { getDefaultExerciseList, createDefaultExercise } from './defaults'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  const [exercises, setExercises] = useState(loadState() || getDefaultExerciseList())
  const [selectedExercise, setSelectedExercise] = useState(exercises.find(e => e.selected) || createDefaultExercise())

  const saveUpdatedExercises = (updatedExercises) => {
    setExercises(updatedExercises)
    setSelectedExercise(updatedExercises.find(exercise => exercise.selected))
    saveState(updatedExercises)
  }

  return (
    <div>
      <Navbar />

      <BrowserRouter>
        <Switch>
          <Route path="/breath">
            <Breath selectedExercise={selectedExercise} />
          </Route>
          <Route path="/">
            <Home exercises={exercises} updateExercises={saveUpdatedExercises} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
