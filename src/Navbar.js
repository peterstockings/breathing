import './App.css';
import 'bulma/css/bulma.css'

function Navbar() {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <img src="https://bulma.io/images/bulma-logo.png" alt="" width="112" height="28" />
                </a>
            </div>
            <div className="navbar-menu">
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <button className="button is-light">
                                <i className="fa fa-bars" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;


