import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import ViewProducts from "../components/ViewProducts";

const AdminLayout = () => {
    return (

        <div className="admin-layout">
            <Navbar />
            <h1 className="text-center mt-3"> Admin page </h1>
            <Link to="/admin/addproduct"><button type="button" className="btn btn-primary btn-lg ms-3">Add new product</button></Link>
            <ViewProducts />
        </div>

    );
}

export default AdminLayout;