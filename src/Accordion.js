import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './App.css';
import 'bulma/css/bulma.css'

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
});

export default function ActionsInAccordionSummary(props) {
    const classes = useStyles();

    const handleClick = (event, exercise) => {
        event.stopPropagation()
        props.onSelect(exercise.exercise)
    }

    const handleDelete = (event, exercise) => {
        event.stopPropagation()
        props.onDelete(exercise.id)
    }

    return (
        <div className={classes.root}>
            {props.exercises.map(exercise =>
                <Accordion key={exercise.id}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-label="Expand"
                        aria-controls="additional-actions1-content"
                        id="additional-actions1-header"
                    >
                        <FormControlLabel
                            aria-label="Acknowledge"
                            onClick={(event) => handleClick(event, exercise)}
                            onFocus={(event) => event.stopPropagation()}
                            control={
                                <button className="button is-white">
                                    <span class="icon">
                                        <i class="fa fa-play"></i>
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
                        <button className="button is-white" onClick={(event) => handleDelete(event, exercise)}>
                            <span class="icon">
                                <i class="fa fa-trash-o"></i>
                            </span>
                        </button>
                    </AccordionDetails>
                </Accordion>
            )}
        </div>
    );
}
