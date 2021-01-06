import '../App.css';
import 'bulma/css/bulma.css'
import BreathProgress from './BreathProgress';
import { useState, useEffect, useRef } from 'react';
import { timerFunction } from '../defaults'

function Breath(props) {
    const [scale, setScale] = useState(0)
    const [stage, setStage] = useState('')
    const [percentage, setPercentage] = useState(0)

    const timeStampRef = useRef(performance.now())

    const requestRef = useRef()

    let totalTime = 0
    for (const state of props.selectedExercise.exercise) {
        totalTime += state.duration
        state.endTime = totalTime
    }

    const draw = (t) => {
        const time = (t - timeStampRef.current) / 1000 % totalTime

        const state = props.selectedExercise.exercise.find(s => time < s.endTime)

        const startTime = state.endTime - state.duration

        setPercentage(Math.floor(((time - startTime) / state.duration) * 100))

        let f = timerFunction(state.f)
        const radius = f((time - startTime) / state.duration)
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
        <>
            <div onClick={resetTimer}>
                <svg viewBox="-1 -1 2 2" preserveAspectRatio="xMidYMid meet" style={{ transform: `scale(${scale})` }} onClick={resetTimer}>
                    <circle r="1"></circle>
                </svg>

                <BreathProgress selectedExercise={props.selectedExercise.exercise} stage={stage} />

            </div>
            <progress className="progress is-small is-info fixedBottomBar" value={percentage} max="100"></progress>
        </>
    );
}

export default Breath;