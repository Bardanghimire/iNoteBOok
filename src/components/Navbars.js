import React from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom';
export default function Navbars(props) {
    let location = useLocation()
    React.useEffect(() => {

    }, [location])
    let history = useHistory()
    const handleLogout = () => {
        localStorage.removeItem("token");
        history.push("/login");
    }
    const firstname = (name) => {
        let string = name.split(" ");
        let first = string[0]
        return (first.charAt(0).toUpperCase() + first.slice(1));
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand font-nothing" to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/Home' || location.pathname === "/" ? 'active' : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/About' ? 'active' : ""}`} to="/About">About</Link>
                            </li>
                        </ul>
                        {!(localStorage.getItem("token")) ? <form className="d-flex">
                            <Link className="btn btn-outline-light mx-1" to="/login" role="button">Login</Link>
                            <Link className="btn btn-outline-light mx-1" to="/signup" role="button">Signup</Link>
                        </form> : <><button className="logo-user"><small className="username mx-2">Hello, {firstname(localStorage.getItem("name"))}</small><i className="fas fa-user-circle"></i></button><button className="btn btn-outline-light mx-1" onClick={handleLogout}>Sign out</button></>}
                    </div>
                </div>
            </nav>
        </div>
    )
}
