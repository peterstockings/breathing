import '../App.css';
import 'bulma/css/bulma.css'

function BreathProgress(props) {

    return (
        <form>
            <ul className="steps is-narrow is-medium is-centered has-content-centered">
                <li className={`steps-segment ${props.stage === 0 ? 'is-active' : ''}`}>
                    <span className="steps-marker">
                        <span className="icon">
                            <i className="fa fa-arrow-left"></i>
                        </span>
                    </span>
                    <div className="steps-content">
                        <p className="heading">In</p>
                    </div>
                </li>
                <li className={`steps-segment ${props.stage === 1 ? 'is-active' : ''}`}>
                    <span className="steps-marker">
                        <span className="icon">
                            <i className="fa fa-pause"></i>
                        </span>
                    </span>
                    <div className="steps-content">
                        <p className="heading">Hold</p>
                    </div>
                </li>
                <li className={`steps-segment ${props.stage === 2 ? 'is-active' : ''}`}>
                    <span className="steps-marker">
                        <span className="icon">
                            <i className="fa fa-arrow-right"></i>
                        </span>
                    </span>
                    <div className="steps-content">
                        <p className="heading">Out</p>
                    </div>
                </li>
                <li className={`steps-segment ${props.stage === 3 ? 'is-active' : ''}`}>
                    <span className="steps-marker">
                        <span className="icon">
                            <i className="fa fa-pause"></i>
                        </span>
                    </span>
                    <div className="steps-content">
                        <p className="heading">Hold</p>
                    </div>
                </li>
            </ul>
        </form>);
}

export default BreathProgress;