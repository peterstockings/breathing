import '../App.css';
import 'bulma/css/bulma.css'
import BreathProgress from './BreathProgress';
import { useState, useEffect, useRef } from 'react';


function Breath(props) {
    const states = props.states
    const displaySettings = props.displaySettings

    const [scale, setScale] = useState(0)
    const [stage, setStage] = useState('')

    const timeStampRef = useRef(performance.now())

    const requestRef = useRef()

    let totalTime = 0
    for (const state of states) {
        totalTime += state.duration
        state.endTime = totalTime
    }

    const draw = (t) => {
        const time = (t - timeStampRef.current) / 1000 % totalTime

        const state = states.find(s => time < s.endTime)

        const startTime = state.endTime - state.duration
        const radius = state.f((time - startTime) / state.duration)
        const scaled = Math.sin(Math.sin(radius * Math.PI / 2))

        setScale(scaled.toFixed(4))
        setStage(state.id)

        requestAnimationFrame(draw)
    }

    useEffect(() => {
        requestRef.current = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    const resetTimer = e => {
        timeStampRef.current = performance.now()
    }

    return (
        <div>
            <button className="button is-info is-light" onClick={displaySettings}>
                <span className="icon is-small">
                    <i className="fa fa-arrow-left"></i>
                </span>
            </button>
            <button className="button is-info is-light" style={{ float: 'right' }} onClick={resetTimer}>
                <span className="icon is-small">
                    <i className="fa fa-refresh"></i>
                </span>
            </button>
            <svg viewBox="-1 -1 2 2" preserveAspectRatio="xMidYMid meet" style={{ transform: `scale(${scale})` }}>
                <circle r="1"></circle>
            </svg>

            <BreathProgress states={states} stage={stage} />
        </div >);
}

export default Breath;