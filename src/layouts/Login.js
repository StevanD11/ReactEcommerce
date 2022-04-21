import Navbar from "../components/Navbar";
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


function Login() {

    const history = useHistory();
    const [loginInput, setLoginInput] = useState({
        email: '',
        password: '',
    });


    String.prototype.isEmpty = function () {
        return (this.length === 0 || !this.trim());
    };

    const handleInput = (e) => {
        e.persist();
        setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (loginInput.email.isEmpty() || loginInput.password.isEmpty()) {
            alert('Sva polja moraju biti popunjena!')
            return;
        }

        const data = {
            email: loginInput.email,
            password: loginInput.password
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`api/login`, data).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    localStorage.setItem('role', res.data.role);

                    if (res.data.role === 'admin') {
                        alert("Uspešno ste se ulogovali!");
                        history.push('/admin/dashboard');
                    }
                    else {
                        alert("Uspešno ste se ulogovali!");
                        history.push('/');
                    }
                }
                else if (res.data.status === 401) {
                    alert(res.data.message);
                }
            });
        });
    }


    return (

        <div>
            <Navbar />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 text-center">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label>Email: </label>
                                <input type="email" name="email" onChange={handleInput} value={loginInput.email} className="form-control" />
                            </div>
                            <div className="form-group mb-3">
                                <label>Lozinka: </label>
                                <input type="password" name="password" onChange={handleInput} value={loginInput.password} className="form-control" />
                            </div>
                            <div className="form-group mb-3">
                                <button type="submit" className="btn btn-success btn-lg">Prijava</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;