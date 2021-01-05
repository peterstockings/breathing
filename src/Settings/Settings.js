import '../App.css';
import 'bulma/css/bulma.css'
import { useState } from 'react';
import { uuid, getCurrentPosition, getTimerFn } from '../util'
import Modal from '../Modal'
import ActionsInAccordionSummary from '../Accordion'
import { ButtonDropdown, DropdownToggle } from 'reactstrap';
import { createDefaultExercise } from '../defaults'
import BreathingStageDropDown from './BreathingStageDropDown'
import LabelAndSlider from './LabelAndSlider'

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

    const handleDelete = (id) => updateNewExercise(
        {
            ...newExercise,
            exercise: newExercise.exercise.filter(s => s.id !== id)
        }
    )

    const deleteExercise = (id) => {
        props.updateExercises(props.exercises.filter(s => s.id !== id))
    }

    const editExercise = (exercise) => {
        updateNewExercise({ ...exercise })
        setModalVisibility(true);
    }

    const [dropdownOpen, setOpen] = useState(false);
    const [isModalVisible, setModalVisibility] = useState(false)

    const handleClick = () => {
        let newExercises = props.exercises.filter(s => s.id !== newExercise.id).concat(newExercise).sort((a, b) => a.idx - b.idx)
        setModalVisibility(false);
        props.updateExercises(newExercises)
        updateNewExercise(createDefaultExercise())
    }

    const toggle = () => setOpen(!dropdownOpen);

    const addStage = (name) => {
        updateNewExercise(
            {
                ...newExercise,
                exercise: newExercise.exercise.concat({
                    name,
                    f: getTimerFn(name, newExercise.exercise),
                    duration: 1,
                    idx: newExercise.exercise.reduce((a, c) => c.idx > a ? c.idx : a, 0) + 1,
                    id: uuid()
                })
            }
        )
    }

    const closeModal = () => {
        setModalVisibility(false)
        updateNewExercise(createDefaultExercise())
    }

    return (
        <div>
            <h2 className="title is-2">Breathing</h2>

            <Modal isActive={isModalVisible} close={closeModal}>
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
                        <BreathingStageDropDown states={newExercise.exercise} addStage={addStage} />
                    </ButtonDropdown>

                    <button disabled={newExercise.exercise.length === 0 || getCurrentPosition(newExercise.exercise) !== 0 || newExercise.name.length === 0} className="button is-dark" onClick={handleClick}>Save</button>
                </div>
            </Modal>

            <ActionsInAccordionSummary exercises={props.exercises} onSelect={updateState} onDelete={deleteExercise} onEdit={editExercise} />

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