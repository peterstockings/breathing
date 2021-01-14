import LabelAndSlider from './LabelAndSlider'
import { sliderSettings } from '../defaults'

function LoopLabelAndSlider(props) {
    const { step = 1, min = sliderSettings.loops.min + 1, max = sliderSettings.loops.max + 1 } = props
    const updateExerciseLoops = loops => {
        let newLoops = loops < max ? loops : Number.POSITIVE_INFINITY
        props.onChange(newLoops)
    }

    return (
        <LabelAndSlider
            name={'Loops'}
            value={props.value}
            onChange={(_, newValue) => updateExerciseLoops(newValue)}
            marks={[{
                value: max,
                label: 'Inf',
            }]}
            max={max}
            valueLabelFormat={value => value === max ? `Inf` : value}
        />
    )
}

export default LoopLabelAndSlider

