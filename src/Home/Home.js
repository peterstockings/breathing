import '../App.css';
import 'bulma/css/bulma.css'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createDefaultExercise } from '../defaults'
import ExerciseList from './ExerciseList'
import ExerciseModal from './ExerciseModal'
import FloatingActionButton from './FloatingActionButton'

function Home(props) {
    const history = useHistory();

    const [modalExercise, updateModalExercise] = useState(createDefaultExercise())
    const [isModalVisible, setModalVisibility] = useState(false)

    const deleteExercise = (id) => {
        props.updateExercises(props.exercises.filter(s => s.id !== id))
    }

    const editExercise = (exercise) => {
        updateModalExercise({ ...exercise })
        setModalVisibility(true);
    }

    const onSelect = (id) => {
        let selectedExercises = props.exercises.map(s => s.id === id ? { ...s, selected: true } : { ...s, selected: false })
        props.updateExercises(selectedExercises)
        history.push('/breath')
    }

    const onSave = () => {
        if (props.exercises.some(s => s => s.id === modalExercise.id))
            props.updateExercises(props.exercises.map(s => s.id === modalExercise.id ? modalExercise : s))
        else
            props.updateExercises(props.exercises.concat(modalExercise))
        setModalVisibility(false);
    }

    const onModalClose = () => {
        setModalVisibility(false);
        updateModalExercise(createDefaultExercise())
    }

    const openModal = () => setModalVisibility(true)

    return (
        <div className="container" style={{ paddingTop: '2em' }}>
            <ExerciseModal
                modalExercise={modalExercise}
                updateModalExercise={updateModalExercise}
                isActive={isModalVisible}
                onClose={onModalClose}
                onSave={onSave}
            />

            <ExerciseList exercises={props.exercises} onSelect={onSelect} onDelete={deleteExercise} onEdit={editExercise} />

            <FloatingActionButton onClick={openModal} text="New exercise" />
        </div>);
}

export default Home;