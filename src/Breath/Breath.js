import '../App.css';
import 'bulma/css/bulma.css'
import BreathProgress from './BreathProgress';
import { useState, useEffect, useRef } from 'react';


function Breath(props) {
    const states = props.states

    const [scale, setScale] = useState(0)
    const [stage, setStage] = useState(0)

    const requestRef = useRef()

    let totalTime = 0
    for (const state of states) {
        totalTime += state.duration
        state.endTime = totalTime
    }

    const draw = (t) => {
        const time = t / 1000 % totalTime

        const state = states.find(s => time < s.endTime)

        const startTime = state.endTime - state.duration
        const radius = state.f((time - startTime) / state.duration)
        const scaled = Math.sin(Math.sin(radius * Math.PI / 2))

        setScale(scaled.toFixed(4))
        setStage(state.idx)

        requestAnimationFrame(draw)
    }

    useEffect(() => {
        requestRef.current = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    return (
        <div>
            <svg viewBox="-1 -1 2 2" preserveAspectRatio="xMidYMid meet" style={{ transform: `scale(${scale})` }}>
                <circle r="1"></circle>
            </svg>

            <BreathProgress stage={stage} />
        </div >);
}

export default Breath;