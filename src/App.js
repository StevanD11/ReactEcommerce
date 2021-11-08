import axios from 'axios';
import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import HomeLayout from './layouts/HomeLayout';
import Login from './layouts/Login';
import Register from './layouts/Register';
import AdminPrivateRoute from './components/AdminPrivateRoute';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import Convertor from './components/Convertor';
import Search from './components/Search';
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>

          <Route exact path="/" component={HomeLayout} />

          <Route path="/login">
            {localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Login />}
          </Route>

          <Route path="/register">
            {localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Register />}
          </Route>

          <AdminPrivateRoute path="/admin/dashboard" />

          <Route path="/admin/addproduct" component={AddProduct} />
          <Route path="/admin/edit-product/:id" component={EditProduct} />
          <Route path="/convertor" component={Convertor} />
          <Route path="/search" component={Search} />
        </Switch>
      </Router>
    </div>
  );
}


export default App;
