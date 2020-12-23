import './App.css';
import 'bulma/css/bulma.css'
import './Settings/Settings'
import Settings from './Settings/Settings';
import Breath from './Breath/Breath'


function App() {

  let breathStates = [
    {
      title: 'in',
      f: t => t,
      duration: 4,
      idx: 0
    },
    {
      title: 'hold',
      f: t => 1,
      duration: 7,
      idx: 1
    },
    {
      title: 'out',
      f: t => (1 - t) < 0.01 ? 0.01 : 1 - t,
      duration: 8,
      idx: 2
    },
    {
      title: 'hold',
      f: t => 0.01,
      duration: 7,
      idx: 3
    }
  ]

  return (
    <div className="container ">

      <Settings />
      <Breath states={breathStates} />


    </div>
  );
}

export default App;
