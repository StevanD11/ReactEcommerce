import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import App from '../App.css';


function Navbar() {

    const history = useHistory();

    const handleLogout = (e) => {
        e.preventDefault();

        axios.post(`/api/logout`).then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                alert('You are logged out!');
                history.push('/');
            }
        });

    }

    var authVisible = '';
    if (!localStorage.getItem('auth_token')) {
        authVisible = (
            <div className="navbar-list">
                <div className="nav-item">
                    <Link to="/register">Register</Link>
                </div >
                <div className="nav-item">
                    <Link to="/login">Login</Link>
                </div>
            </div>
        );
    }
    else {

        authVisible = (
            <div className="nav-item">
                <button type="button" onClick={handleLogout} className="btn btn-warning btn-sm">Logout</button>
            </div>
        );
    }



    return (

        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">Home</Link>
                <Link to="/convertor" className="mx-3">Convertor</Link>
                <Link to="/search" className="max-3">Search</Link>
            </div>

            <div className="navbar-list">
                {authVisible}
            </div>
        </nav>


    );
}

export default Navbar;