import './App.css';
import 'bulma/css/bulma.css'
import './Settings/Settings'
import Settings from './Settings/Settings';
import Breath from './Breath/Breath'
import { useState } from 'react';
import { loadState, saveState } from './localStorage'


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

  let exerciseList = [
    {
      name: '4-7-8',
      id: 'dc26837f-fa69-4273-9a80-40272d8ec722',
      exercise: [
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
    },
    {
      name: 'Box',
      id: 'bb980cc6-5470-48e9-8ae1-67208b75bf8b',
      exercise: [
        {
          name: 'In',
          f: t => t,
          duration: 4,
          idx: 0,
          id: '55cdb85f-32a9-46fe-8ec9-c94e5134c668'
        },
        {
          name: 'Hold',
          f: t => 1,
          duration: 4,
          idx: 1,
          id: '29f255bd-9c19-45b5-8104-f075abbc9053'
        },
        {
          name: 'Out',
          f: t => (1 - t) < 0.01 ? 0.01 : 1 - t,
          duration: 4,
          idx: 2,
          id: 'ab7b9dee-279e-446a-a9ec-b2ce8f4d8bb7'
        },
        {
          name: 'Hold',
          f: t => 0.01,
          duration: 4,
          idx: 3,
          id: 'e7d244fc-cc10-4d35-8d0f-74147338ab24'
        }
      ]
    }
  ]

  const [exercises, setExercises] = useState(loadState() || exerciseList)

  const saveUpdatedExercises = (updatedExercises) => {
    setExercises(updatedExercises)
    saveState(updatedExercises)
  }

  const [states, setStates] = useState(breathStates)

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
