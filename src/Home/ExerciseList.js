import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import '../App.css';
import 'bulma/css/bulma.css'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
}));


export default function ExerciseList(props) {
    const classes = useStyles();

    const handleClick = (event, exercise) => {
        event.stopPropagation()
        props.onSelect(exercise.id)
    }

    const handleDelete = (event, exercise) => {
        event.stopPropagation()
        props.onDelete(exercise.id)
    }

    const handleEdit = (event, exercise) => {
        event.stopPropagation()
        props.onEdit(exercise)
    }

    return (
        <div className={classes.root}>
            {props.exercises.map(exercise =>
                <Accordion key={exercise.id}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-label="Expand"
                        aria-controls="additional-actions1-content"
                    >
                        <FormControlLabel
                            aria-label="Acknowledge"
                            onClick={(event) => handleClick(event, exercise)}
                            onFocus={(event) => event.stopPropagation()}
                            control={
                                <button className="button is-white">
                                    <span className="icon">
                                        <i className="fa fa-play"></i>
                                    </span>
                                </button>
                            }
                            label={exercise.name}
                        />
                    </AccordionSummary>
                    <AccordionDetails>
                        <ul className="steps is-centered has-content-centered is-horizonta" style={{ width: '100%' }}>
                            {exercise.exercise.map(stage =>
                                <li className="steps-segment" key={stage.id}>
                                    <span className="steps-marker"></span>
                                    <div className="steps-content">
                                        <p className="is-size-4">{stage.name}</p>
                                        <p>{stage.duration}s</p>
                                    </div>
                                </li>
                            )}
                        </ul>
                        <span>
                            <p>
                                <button className="button is-white" onClick={(event) => handleEdit(event, exercise)}>
                                    <span className="icon">
                                        <i className="fa fa-pencil-square-o"></i>
                                    </span>
                                </button>
                                <button className="button is-white" onClick={(event) => handleDelete(event, exercise)}>
                                    <span className="icon">
                                        <i className="fa fa-trash-o"></i>
                                    </span>
                                </button>
                            </p>
                        </span>
                    </AccordionDetails>
                </Accordion>
            )}
        </div>
    );
}
