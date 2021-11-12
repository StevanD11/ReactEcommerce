import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ViewProducts() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState('asc');


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
    function handleDelete(id) {

        axios.delete(`/api/delete-product/${id}`).then(res => {
            if (res.data.status === 200) {
                alert(res.data.message);
            }
            else {
                alert('Error while trying to delete product!');
            }
        });

    }
    prod = products.map((product) => {
        return (
            <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td className="text-center"><img src={`http://localhost:8000/${product.image}`} height="130px" width="130px" alt="pic" /></td>
                <td>{product.price}</td>
                <td className="col-md-2">
                    <Link to={`edit-product/${product.id}`} className="btn btn-warning" >Edit</Link>
                    <button type="button" onClick={() => handleDelete(product.id)} className="btn btn-danger">Delete</button>
                </td>
            </tr>
        )
    })


    const sorting = (column) => {

        var sorted = "";
        if (order === 'asc') {
            if (column !== 'price' && column !== 'id') {
                sorted = [...products].sort((a, b) =>
                    a[column].toLowerCase() > b[column].toLowerCase() ? 1 : -1
                );
            }
            else {
                sorted = [...products].sort((a, b) =>
                    a[column] > b[column] ? 1 : -1
                );
            }
            setProducts(sorted);
            setOrder('desc');
        }
        if (order === 'desc') {
            if (column !== 'price' && column !== 'id') {
                sorted = [...products].sort((a, b) =>
                    a[column].toLowerCase() < b[column].toLowerCase() ? 1 : -1
                );
            }
            else {
                sorted = [...products].sort((a, b) =>
                    a[column] < b[column] ? 1 : -1
                );
            }
            setProducts(sorted);
            setOrder('asc');
        }
    }



    return (

        <div className="view-product-container">

            <table className="table table-bordered table-striped mt-3 mx-3">
                <thead>
                    <tr>
                        <th onClick={() => sorting('id')}>ID</th>
                        <th onClick={() => sorting('name')}>Name</th>
                        <th onClick={() => sorting('description')}>Description</th>
                        <th>Image</th>
                        <th onClick={() => sorting('price')}>Price €</th>
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