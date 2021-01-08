import LabelAndSlider from './LabelAndSlider'

function LoopLabelAndSlider(props) {
    //const { step = 1, min = 0, max = 10 } = props
    const updateExerciseLoops = loops => {
        let newLoops = loops > 10 ? Number.POSITIVE_INFINITY : loops
        props.onChange(newLoops)
    }

    return (
        <LabelAndSlider
            name={'Loops'}
            value={props.value}
            onChange={(_, newValue) => updateExerciseLoops(newValue)}
            marks={[{
                value: 11,
                label: 'Inf',
            }]}
            max={11}
            valueLabelFormat={value => value === 11 ? `Inf` : value}
        />
    )
}

export default LoopLabelAndSlider

