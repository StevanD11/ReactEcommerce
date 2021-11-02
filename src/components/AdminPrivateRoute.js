import axios from 'axios';
import { Route, Redirect, useHistory } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import { useEffect, useState } from 'react';

function AdminPrivateRoute({ ...rest }) {

    const [Authenticated, setAuthenticated] = useState(false);
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        axios.get(`/api/checkingAuthenticated`).then(res => {
            if (res.status === 200) {
                setAuthenticated(true);
            }
            setLoading(false);
        });

        return () => {
            setAuthenticated(false);
        };
    }, []);



    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
        if (err.response.status === 401) {
            alert(err.response.data.message);
            history.push('/login');
        }
        return Promise.reject(err);
    });


    axios.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if (error.response.status === 403) {
            alert(error.response.data.message);
            history.push('/');
        }
        return Promise.reject(error);
    });


    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <Route {...rest}
            render={({ props, location }) =>
                Authenticated ?
                    (<AdminLayout />) :
                    (<Redirect to={{ pathname: "/login", state: { from: location } }} />)

            }
        />
    );

}

export default AdminPrivateRoute;