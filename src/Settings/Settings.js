import '../App.css';
import 'bulma/css/bulma.css'
import Slider from '@material-ui/core/Slider';
import { useState } from 'react';
import uuid from '../util'
import Modal from '../Modal'
import ActionsInAccordionSummary from '../Accordion'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

let getLast = (arr = null, n = null) => { if (arr == null) return void 0; if (n === null) return arr[arr.length - 1]; return arr.slice(Math.max(arr.length - n, 0)); };

const getCurrentPosition = (states) => {
    let mappings = {
        'In': 1,
        'Hold': 0,
        'Out': -1,
    }
    return states.reduce((a, c) => a + mappings[c.name], 0)
}

function LabelAndSlider(props) {
    return (
        <p>
            <span>
                <a className="delete" style={{ float: 'right' }} onClick={props.onDelete}></a>
                <label className="label">{props.name}</label>
            </span>
            <Slider value={props.value} onChange={props.onChange} aria-labelledby="discrete-slider-always" valueLabelDisplay="on" step={1} min={0} max={10} />
        </p>
    )
}

function BreathingStageDropDown(props) {
    let last = getLast(props.states)

    let breathingPos = getCurrentPosition(props.states)

    if (last === undefined)
        return (
            <DropdownMenu>
                <DropdownItem onClick={e => props.addStage('In')}>In</DropdownItem>
                <DropdownItem disabled onClick={e => props.addStage('Out')}>Out</DropdownItem>
                <DropdownItem onClick={e => props.addStage('Hold')}>Hold</DropdownItem>
            </DropdownMenu>)

    if (breathingPos === 1)
        return (
            <DropdownMenu>
                <DropdownItem disabled onClick={e => props.addStage('In')}>In</DropdownItem>
                <DropdownItem onClick={e => props.addStage('Out')}>Out</DropdownItem>
                <DropdownItem disabled={last.name === 'Hold'} onClick={e => props.addStage('Hold')}>Hold</DropdownItem>
            </DropdownMenu>
        )

    if (breathingPos === 0)
        return (
            <DropdownMenu>
                <DropdownItem onClick={e => props.addStage('In')}>In</DropdownItem>
                <DropdownItem disabled onClick={e => props.addStage('Out')}>Out</DropdownItem>
                <DropdownItem disabled={last.name === 'Hold'} onClick={e => props.addStage('Hold')}>Hold</DropdownItem>
            </DropdownMenu>
        )

    return (
        <DropdownMenu>
            <DropdownItem onClick={e => props.addStage('In')}>In</DropdownItem>
            <DropdownItem onClick={e => props.addStage('Out')}>Out</DropdownItem>
            <DropdownItem disabled onClick={e => props.addStage('Hold')}>Hold</DropdownItem>
        </DropdownMenu>
    )
}

function createDefaultExercise() {
    return {
        name: 'Custom',
        id: uuid(),
        exercise: [
            {
                name: 'In',
                f: t => t,
                duration: 1,
                idx: 0,
                id: uuid()
            },
            {
                name: 'Out',
                f: t => (1 - t) < 0.01 ? 0.01 : 1 - t,
                duration: 2,
                idx: 2,
                id: uuid()
            }
        ]
    }
}

function Settings(props) {
    const updateState = props.updateState

    const [newExercise, updateNewExercise] = useState(createDefaultExercise())

    const updateExerciseName = (name) => updateNewExercise({ ...newExercise, name })

    const getDuration = (id) => newExercise.exercise.find(s => s.id === id)?.duration || 0

    const handleChange = (id, newValue) => updateNewExercise(
        {
            ...newExercise,
            exercise: newExercise.exercise.map(s => s.id === id ? { ...s, duration: newValue } : s)
        }
    )

    const handleDelete = (id, newValue) => updateNewExercise(
        {
            ...newExercise,
            exercise: newExercise.exercise.filter(s => s.id !== id)
        }
    )

    const deleteExercise = (id) => {
        props.updateExercises(props.exercises.filter(s => s.id !== id))
    }

    const [exercises, setExercises] = useState(props.exercises)
    const [dropdownOpen, setOpen] = useState(false);
    const [isModalVisible, setModalVisibility] = useState(false)

    const handleClick = () => {
        setModalVisibility(false);
        props.updateExercises(props.exercises.concat(newExercise))
        updateNewExercise(createDefaultExercise())
    }

    const [states, setStates] = useState(props.states)

    const toggle = () => setOpen(!dropdownOpen);

    const addStage = (name) => {
        let breathingPos = getCurrentPosition(newExercise.exercise)

        const getTimerFn = (name, pos) => {
            if (name === 'In')
                return t => t
            if (name === 'Out')
                return t => (1 - t) < 0.01 ? 0.01 : 1 - t
            if (name === 'Hold') {
                if (pos === 0)
                    return t => 0.01
                if (pos === 1)
                    return t => 1
            }
        }

        updateNewExercise(
            {
                ...newExercise,
                exercise: newExercise.exercise.concat({
                    name,
                    f: getTimerFn(name, breathingPos),
                    duration: 1,
                    idx: newExercise.exercise.reduce((a, c) => c.idx > a ? c.idx : a, 0) + 1,
                    id: uuid()
                })
            }
        )
    }

    return (
        <div>
            <h2 className="title is-2">Breathing</h2>

            <Modal isActive={isModalVisible} close={e => setModalVisibility(false)}>
                <div className="box">
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input className="input" type="text" value={newExercise.name} onChange={(e) => updateExerciseName(e.target.value)} placeholder="Breathing exercise name" />
                        </div>
                    </div>

                    {newExercise.exercise.map(s =>
                        <LabelAndSlider
                            name={s.name}
                            value={getDuration(s.id)}
                            onChange={(event, newValue) => handleChange(s.id, newValue)}
                            onDelete={event => handleDelete(s.id)}
                            key={s.id}
                        />
                    )}

                    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} style={{ float: 'right' }}>
                        <DropdownToggle caret>
                            Add
                            </DropdownToggle>
                        <BreathingStageDropDown states={states} addStage={addStage} />
                    </ButtonDropdown>

                    <button disabled={newExercise.exercise.length === 0 || getCurrentPosition(newExercise.exercise) !== 0 || newExercise.name.length === 0} className="button is-dark" onClick={handleClick}>Save</button>
                </div>
            </Modal>

            <ActionsInAccordionSummary exercises={props.exercises} onSelect={updateState} onDelete={deleteExercise} />

            <a href="#" className="float" onClick={e => setModalVisibility(true)} >
                <i className="fa fa-plus my-float"></i>
                <div className="label-container">
                    <div className="label-text">New exercise</div>
                    <i className="fa fa-play label-arrow"></i>
                </div>
            </a>

        </div>);
}

export default Settings;