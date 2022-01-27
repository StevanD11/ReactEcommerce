import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import ViewProducts from "../components/ViewProducts";

const AdminLayout = () => {
    return (

        <div className="admin-layout">
            <Navbar />
            <h1 className="text-center mt-3"> Admin dashboard </h1>
            <Link to="/admin/addproduct"><button type="button" id="dugmence" className="btn btn-primary btn-lg">Novi proizvod</button></Link>
            <ViewProducts />
        </div>

    );
}

export default AdminLayout;