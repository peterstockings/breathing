import '../App.css';
import 'bulma/css/bulma.css'

function BreathProgress(props) {
    const states = props.states

    const nameToIconMapping = name => {
        let mappings = {
            'In': 'fa fa-arrow-left',
            'Hold': 'fa fa-pause',
            'Out': 'fa fa-arrow-right',
        }
        let defaultIcon = 'fa fa-spinner'

        return mappings[name] || defaultIcon
    }

    return (
        <ul className="steps is-narrow is-medium is-centered has-content-centered">
            {states.map(s =>
                <li className={`steps-segment ${props.stage === s.id ? 'is-active' : ''}`} key={s.id}>
                    <span className="steps-marker">
                        <span className="icon">
                            <i className={nameToIconMapping(s.name)}></i>
                        </span>
                    </span>
                    <div className="steps-content">
                        <p className="heading">{s.name}</p>
                    </div>
                </li>
            )}
        </ul>
    );
}

export default BreathProgress;