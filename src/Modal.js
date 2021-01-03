import './App.css';
import 'bulma/css/bulma.css'

function Modal(props) {

    return (
        <div className={`modal ${props.isActive ? 'is-active' : ''}`}>
            <div className="modal-background"></div>
            <div className="modal-content">
                {props.children}
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={props.close}></button>
        </div>
    );
}

export default Modal;