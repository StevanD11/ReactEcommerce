import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ViewProducts() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        axios.get(`/api/view-products`).then(res => {
            if (res.data.status === 200) {
                setProducts(res.data.products);
                setLoading(false);
            }
        });


    }, []);

    var prod = "";

    if (loading) {
        return <h1>Loading...</h1>
    }
    else {
        prod = products.map((product) => {
            return (
                <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td className="text-center"><img src={`http://localhost:8000/${product.image}`} height="130px" width="130px" alt="pic" /></td>
                    <td>{product.price}</td>
                    <td className="col-md-2"><Link to={`edit-product/${product.id}`} className="btn btn-warning" >Edit</Link>
                        <button type="button" className="btn btn-danger">Delete</button>
                    </td>


                </tr>
            )
        })
    }



    return (

        <div className="view-product-container">

            <table className="table table-bordered table-striped mt-3 mx-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Price €</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {prod}
                </tbody>
            </table>





        </div>



    );

}

export default ViewProducts;