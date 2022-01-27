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
        })
            .catch(function (error) {
                if (error.response.status === 401) {
                    alert('Morate biti ulogovani da biste pristupili ovoj stranici!');
                    history.push('/login');
                }
                if (error.response.status === 403) {
                    alert('Samo Admin ima pristup ovoj stranici!');
                    setLoading(false);
                }
            });
    }, []);

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