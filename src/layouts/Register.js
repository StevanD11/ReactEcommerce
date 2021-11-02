import Navbar from "../components/Navbar";
import { useState } from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom';

function Register() {

    const history = useHistory();
    const [register, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        error_list: ''
    });

    const handleInput = (e) => {
        e.persist();
        setRegister({ ...register, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: register.name,
            email: register.email,
            password: register.password
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`http://localhost:8000/api/register`, data).then(res => {
                if (res.data.status === 200) {
                    alert(res.data.message);
                    history.push('/');
                }
                else {
                    setRegister({ ...register, error_list: res.data.validation_errors });
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
                                <label>Name: </label>
                                <input type="text" name="name" onChange={handleInput} value={register.name} className="form-control" />
                                <span>{register.error_list.name}</span>
                            </div>
                            <div className="form-group mb-3">
                                <label>E-mail: </label>
                                <input type="text" name="email" onChange={handleInput} value={register.email} className="form-control" />
                                <span>{register.error_list.email}</span>
                            </div>
                            <div className="form-group mb-3">
                                <label>Password: </label>
                                <input type="password" name="password" onChange={handleInput} value={register.password} className="form-control" />
                                <span>{register.error_list.password}</span>
                            </div>
                            <div className="form-group mb-3">
                                <button type="submit" className="btn btn-success btn-lg">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Register;