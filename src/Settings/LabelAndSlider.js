import Slider from '@material-ui/core/Slider';

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

export default LabelAndSlider