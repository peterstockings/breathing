import '../App.css';
import 'bulma/css/bulma.css'
import Slider from '@material-ui/core/Slider';
import { useState } from 'react';
import uuid from '../util'

function LabelAndSlider(props) {
    return (
        <p>
            <span>
                <a className="delete" style={{ position: 'absolute', right: 0 }} onClick={props.onDelete}></a>
                <label className="label">{props.name}</label>
            </span>
            <Slider value={props.value} onChange={props.onChange} aria-labelledby="discrete-slider-always" valueLabelDisplay="on" step={1} min={0} max={10} />
        </p>
    )
}

function Settings(props) {
    const updateState = props.updateState

    const [states, setStates] = useState(props.states)

    const getDuration = (id) => states.find(s => s.id === id).duration

    const handleChange = (id, newValue) => setStates(states.map(s => s.id === id ? { ...s, duration: newValue } : s))

    const handleDelete = (id) => setStates(states.filter(s => s.id !== id))

    const handleClick = () => updateState(states)

    return (
        <div>
            <h2 className="title is-2">Breathing</h2>

            {states.map(s =>
                <LabelAndSlider
                    name={s.name}
                    value={getDuration(s.id)}
                    onChange={(event, newValue) => handleChange(s.id, newValue)}
                    onDelete={event => handleDelete(s.id)}
                    key={s.id}
                />
            )}

            <button className="button is-dark" onClick={handleClick}>Start</button>

        </div>);
}

export default Settings;