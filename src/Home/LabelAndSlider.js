import Slider from '@material-ui/core/Slider';

function LabelAndSlider(props) {
    const { step = 1, min = 0, max = 10 } = props
    return (
        <p>
            <span>
                {props.onDelete &&
                    <a className="delete" style={{ float: 'right' }} onClick={props.onDelete}></a>
                }
                <label className="label">{props.name}</label>
            </span>
            <span className="sliderPadding">
                <Slider
                    value={props.value}
                    onChange={props.onChange}
                    aria-labelledby="discrete-slider-always"
                    valueLabelDisplay="on"
                    step={step}
                    min={min}
                    max={max}
                    marks={props.marks}
                    getAriaValueText={props.getAriaValueText}
                    valueLabelFormat={props.valueLabelFormat}
                    scale={props.scale}
                />
            </span>
        </p>
    )
}

export default LabelAndSlider