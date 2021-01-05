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
  const [selectedExercise, setSelectedExercise] = useState(createDefaultExercise().exercise)

  const saveUpdatedExercises = (updatedExercises) => {
    setExercises(updatedExercises)
    saveState(updatedExercises)
  }

  return (
    <div>
      <Navbar />

      <div className="container" style={{ paddingTop: '2em' }}>
        <BrowserRouter>
          <Switch>
            <Route path="/breath">
              <Breath selectedExercise={selectedExercise} />
            </Route>
            <Route path="/">
              <Home updateState={setSelectedExercise} exercises={exercises} updateExercises={saveUpdatedExercises} />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
