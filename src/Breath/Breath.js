import '../App.css';
import 'bulma/css/bulma.css'
import BreathProgress from './BreathProgress';
import { useState, useEffect, useRef } from 'react';
import { timerFunction } from '../defaults'
import { getPercentage, getScale } from '../util'

function Breath(props) {
    const [scale, setScale] = useState(0)
    const [stage, setStage] = useState('')
    const [percentage, setPercentage] = useState(0)
    const [loopCounter, setLoopCounter] = useState(0)

    const timeStampRef = useRef(performance.now())

    const requestRef = useRef()

    let totalTime = 0
    for (const state of props.selectedExercise.exercise) {
        totalTime += state.duration
        state.endTime = totalTime
    }

    const draw = (t) => {
        const timeSinceBeginning = (t - timeStampRef.current) / 1000
        const time = timeSinceBeginning % totalTime
        const loopCount = Math.floor(timeSinceBeginning / totalTime)
        setLoopCounter(props.selectedExercise.loops - loopCount)

        const state = props.selectedExercise.exercise.find(s => time < s.endTime)
        setStage(state.id)

        const startTime = state.endTime - state.duration

        let f = timerFunction(state.f)
        const scaled = getScale(f, time, startTime, state.duration)
        setScale(scaled)

        const newPercentage = getPercentage(time, startTime, state.duration)
        setPercentage(newPercentage)

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
            {loopCounter > 0 ?
                <>
                    <div onClick={resetTimer}>

                        <svg viewBox="-1 -1 2 2" preserveAspectRatio="xMidYMid meet" style={{ transform: `scale(${scale})` }} onClick={resetTimer}>
                            <circle r="1"></circle>
                        </svg>

                        <BreathProgress selectedExercise={props.selectedExercise.exercise} stage={stage} />
                    </div>
                    <span className="breathLoopRemaining">
                        {props.selectedExercise.loops === Number.POSITIVE_INFINITY ? '' : `x${loopCounter}`
                        }
                    </span>

                    <progress className="progress is-small is-info fixedBottomBar" value={percentage} max="100"></progress>
                </> :
                <button className="button is-success restartButton" onClick={resetTimer}>
                    <span className="icon">
                        <i className="fa fa-repeat"></i>
                    </span>
                    <span>Restart</span>
                </button>

            }

        </>
    );
}

export default Breath;