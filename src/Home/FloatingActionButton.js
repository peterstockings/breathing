import '../App.css';
import 'bulma/css/bulma.css'

function FloatingActionButton(props) {
    return (
        <a className="float" onClick={props.onClick} >
            <i className="fa fa-plus my-float"></i>
            <div className="label-container">
                <div className="label-text">{props.text}</div>
                <i className="fa fa-play label-arrow"></i>
            </div>
        </a>);
}

export default FloatingActionButton;