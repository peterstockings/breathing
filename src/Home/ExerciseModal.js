import '../App.css';
import 'bulma/css/bulma.css'
import Modal from '../Modal'
import LabelAndSlider from './LabelAndSlider'
import { ButtonDropdown, DropdownToggle } from 'reactstrap';
import { useState } from 'react';
import { createDefaultExercise } from '../defaults'
import BreathingStageDropDown from './BreathingStageDropDown'
import { uuid, getCurrentPosition, getTimerFn } from '../util'

function ExerciseModal(props) {
    const [dropdownOpen, setOpen] = useState(false);

    const toggle = () => setOpen(!dropdownOpen);

    const updateExerciseName = (name) => props.updateModalExercise({ ...props.modalExercise, name })

    const updateExerciseLoops = (loops) => props.updateModalExercise({ ...props.modalExercise, loops: loops > 10 ? Number.POSITIVE_INFINITY : loops })

    const getDuration = (id) => props.modalExercise.exercise.find(s => s.id === id)?.duration || 0

    const updateDuration = (id, newValue) => props.updateModalExercise(
        {
            ...props.modalExercise,
            exercise: props.modalExercise.exercise.map(s => s.id === id ? { ...s, duration: newValue } : s)
        }
    )

    const handleDelete = (id) => props.updateModalExercise(
        {
            ...props.modalExercise,
            exercise: props.modalExercise.exercise.filter(s => s.id !== id)
        }
    )

    const addStage = (name) => {
        let updatedStages = {
            ...props.modalExercise,
            exercise: props.modalExercise.exercise.concat({
                name,
                f: getTimerFn(name, props.modalExercise.exercise),
                duration: 1,
                idx: props.modalExercise.exercise.reduce((a, c) => c.idx > a ? c.idx : a, 0) + 1,
                id: uuid()
            })
        }
        props.updateModalExercise(updatedStages)
    }

    const onClose = () => {
        props.updateModalExercise(createDefaultExercise())
        props.onClose()
    }

    return (
        <Modal isActive={props.isActive} close={e => onClose()}>
            <div className="box">
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input className="input" type="text" value={props.modalExercise.name} onChange={(e) => updateExerciseName(e.target.value)} placeholder="Breathing exercise name" />
                    </div>
                </div>

                <LabelAndSlider
                    name={'Loops'}
                    value={props.modalExercise.loops}
                    onChange={(_, newValue) => updateExerciseLoops(newValue)}
                    marks={[{
                        value: 11,
                        label: 'Inf',
                    }]}
                    max={11}
                    valueLabelFormat={value => value === 11 ? `Inf` : value}
                />

                <hr />

                {props.modalExercise.exercise.map(s =>
                    <LabelAndSlider
                        name={s.name}
                        value={getDuration(s.id)}
                        onChange={(_, newValue) => updateDuration(s.id, newValue)}
                        onDelete={e => handleDelete(s.id)}
                        key={s.id}
                    />
                )}

                <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} style={{ float: 'right' }}>
                    <DropdownToggle caret>
                        Add
                    </DropdownToggle>
                    <BreathingStageDropDown states={props.modalExercise.exercise} addStage={addStage} />
                </ButtonDropdown>

                <button disabled={props.modalExercise.exercise.length === 0 || getCurrentPosition(props.modalExercise.exercise) !== 0 || props.modalExercise.name.length === 0} className="button is-dark" onClick={props.onSave}>Save</button>
            </div>
        </Modal>
    );
}

export default ExerciseModal;