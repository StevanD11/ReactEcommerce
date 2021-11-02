import Navbar from "../components/Navbar";
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


function Login() {

    const history = useHistory();

    const [loginInput, setLoginInput] = useState({
        email: '',
        password: '',
        error_list: []
    });


    const handleInput = (e) => {
        e.persist();
        setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: loginInput.email,
            password: loginInput.password
        }


        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`api/login`, data).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    if (res.data.role === 'admin') {
                        alert("You are logged in!");
                        history.push('/admin/dashboard');
                    }
                    else {
                        alert("You are logged in!");
                        history.push('/');
                    }
                }
                else if (res.data.status === 401) {
                    alert('Greska', res.data.message);
                }
                else {
                    setLoginInput({ ...loginInput, error_list: res.data.validation_errors });
                }
            });
        });
    }


    return (

        <div>
            <Navbar />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-7 text-center">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label>Email: </label>
                                <input type="text" name="email" onChange={handleInput} value={loginInput.email} className="form-control" />
                                <label>{loginInput.error_list.email}</label>
                            </div>
                            <div className="form-group mb-3">
                                <label>Password: </label>
                                <input type="password" name="password" onChange={handleInput} value={loginInput.password} className="form-control" />
                                <label>{loginInput.error_list.password}</label>
                            </div>
                            <div className="form-group mb-3">
                                <button type="submit" className="btn btn-success btn-lg">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Login;