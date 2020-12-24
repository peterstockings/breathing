import '../App.css';
import 'bulma/css/bulma.css'
import Slider from '@material-ui/core/Slider';
import { useState } from 'react';

function Settings(props) {
    const updateState = props.updateState

    const [states, setStates] = useState(props.states)

    const getDuration = (name) => states.find(s => s.name === name).duration

    const handleChange = (name, newValue) => {
        setStates(states.map(s => s.name === name ? { ...s, duration: newValue } : s))
    }

    const handleClick = () => {
        console.log('Saving...')
        console.log('Starting')
        updateState(states)
    }

    return (
        <div>
            <h2 className="title is-2">Breathing</h2>

            <label className="label">In</label>
            <Slider value={getDuration('In')} onChange={(event, newValue) => handleChange('In', newValue)} aria-labelledby="discrete-slider-always" valueLabelDisplay="on" step={1} min={0} max={10} />
            <label className="label">Hold empty</label>
            <Slider value={getDuration('Hold empty')} onChange={(event, newValue) => handleChange('Hold empty', newValue)} aria-labelledby="discrete-slider-always" valueLabelDisplay="on" step={1} min={0} max={10} />
            <label className="label">Out</label>
            <Slider value={getDuration('Out')} onChange={(event, newValue) => handleChange('Out', newValue)} aria-labelledby="discrete-slider-always" valueLabelDisplay="on" step={1} min={0} max={10} />
            <label className="label">Hold full</label>
            <Slider value={getDuration('Hold full')} onChange={(event, newValue) => handleChange('Hold full', newValue)} aria-labelledby="discrete-slider-always" valueLabelDisplay="on" step={1} min={0} max={10} />

            <button className="button is-dark" onClick={handleClick}>Start</button>

        </div>);
}

export default Settings;