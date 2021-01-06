import './App.css';
import 'bulma/css/bulma.css'

function Navbar() {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <img src="/breath.png" alt="" />
                </a>
            </div>
            <div className="navbar-menu">
                <div className="navbar-end">

                </div>
            </div>
        </nav>
    );
}

export default Navbar;


