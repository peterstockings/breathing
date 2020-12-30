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
      idx: 0,
      id: '574a2367-decc-424f-aead-72ff66ea0b07'
    },
    {
      name: 'Hold',
      f: t => 1,
      duration: 7,
      idx: 1,
      id: '1dc9883d-03fa-47bf-866c-980f6b2c59e2'
    },
    {
      name: 'Out',
      f: t => (1 - t) < 0.01 ? 0.01 : 1 - t,
      duration: 8,
      idx: 2,
      id: 'fcb25b76-4db0-4902-82e3-293513a333d6'
    },
    {
      name: 'Hold',
      f: t => 0.01,
      duration: 7,
      idx: 3,
      id: 'e154f772-4636-4bf7-8212-8477cfc59729'
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
