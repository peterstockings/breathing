import '../App.css';
import 'bulma/css/bulma.css'
import Slider from '@material-ui/core/Slider';
import { useState } from 'react';

function Settings() {

    return (
        <div>
            <h2 className="title is-2">Breathing</h2>

            <label className="label">In</label>
            <Slider defaultValue={4} aria-labelledby="discrete-slider-always" valueLabelDisplay="on" step={1} min={0} max={10} />
            <label className="label">Hold</label>
            <Slider defaultValue={7} aria-labelledby="discrete-slider-always" valueLabelDisplay="on" step={1} min={0} max={10} />
            <label className="label">Out</label>
            <Slider defaultValue={8} aria-labelledby="discrete-slider-always" valueLabelDisplay="on" step={1} min={0} max={10} />
            <label className="label">Hold</label>
            <Slider defaultValue={7} aria-labelledby="discrete-slider-always" valueLabelDisplay="on" step={1} min={0} max={10} />

            <button className="button is-dark">Start</button>

        </div>);
}

export default Settings;