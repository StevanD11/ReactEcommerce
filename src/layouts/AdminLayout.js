import Navbar from "../components/Navbar";
import {
    Link
} from "react-router-dom";

const AdminLayout = () => {
    return (

        <div className="admin-layout">
            <Navbar />
            <h1> Admin page </h1>
            <Link to="/admin/addproduct"><button type="button" className="btn btn-primary btn-lg">Add new product</button></Link>
        </div>

    );
}

export default AdminLayout;