import { Link } from 'react-router-dom';
import axios from 'axios';
import App from '../App.css';


function Navbar() {


    const handleLogout = (e) => {
        e.preventDefault();

        axios.post(`/api/logout`).then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                localStorage.removeItem('role');
                alert('Logout uspešan!');
                window.location.href = "/";
            }
        });

    }

    var authVisible = '';
    if (!localStorage.getItem('auth_token')) {
        authVisible = (
            <div className="navbar-list">
                <div className="nav-item mt-1">
                    <Link to="/register">Registracija</Link>
                </div >
                <div className="nav-item mt-1">
                    <Link to="/login">Login</Link>
                </div>
            </div>
        );
    }
    else {

        authVisible = (
            <div>
                <div className="nav-item">
                    <button type="button" onClick={handleLogout} className="btn btn-danger btn-sm">Logout</button>
                </div>

            </div>
        );
    }

    let dashboard = <Link to="/admin/dashboard" className="max-3 mx-3">Dashboard</Link>


    return (

        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">Početna</Link>
                <Link to="/convertor" className="mx-3">Konvertor</Link>
                <Link to="/search" className="max-3">Pretraga</Link>
                {localStorage.getItem('role') === 'admin' && dashboard}
            </div>

            <div className="navbar-list">
                <div className="nav-item mt-1">
                    <Link to="/cart">Korpa</Link>
                </div>
                {authVisible}
            </div>
        </nav>


    );
}

export default Navbar;