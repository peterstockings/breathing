import './App.css';
import 'bulma/css/bulma.css'
import './Settings/Settings'
import Settings from './Settings/Settings';
import Breath from './Breath/Breath'
import { useState } from 'react';

function App() {

  let breathStates = [
    {
      name: 'In',
      f: t => t,
      duration: 4,
      idx: 0
    },
    {
      name: 'Hold empty',
      f: t => 1,
      duration: 7,
      idx: 1
    },
    {
      name: 'Out',
      f: t => (1 - t) < 0.01 ? 0.01 : 1 - t,
      duration: 8,
      idx: 2
    },
    {
      name: 'Hold full',
      f: t => 0.01,
      duration: 7,
      idx: 3
    }
  ]

  const [states, setStates] = useState(breathStates)

  const [breath, setBreath] = useState(false)

  const startBreath = (newStates) => {
    setStates(newStates)
    setBreath(!breath)
  }

  const displaySettings = () => setBreath(false)

  return (
    <div className="container">
      {breath ? <Breath states={states} displaySettings={displaySettings} /> : <Settings states={states} updateState={startBreath} />}
    </div>
  );
}

export default App;
