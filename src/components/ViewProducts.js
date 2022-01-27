import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ViewProducts() {

    const [products, setProducts] = useState([]);
    const [order, setOrder] = useState('asc');

    useEffect(() => {
        axios.get(`/api/get_products_admin`).then(res => {
            if (res.data.status === 200) {
                setProducts(res.data.products);
            }
        });
    }, []);

    var prod = "";

    function handleDelete(id) {

        axios.delete(`/api/deleteproduct/${id}`).then(res => {
            if (res.data.status === 200) {
                alert(res.data.message);
                window.location.reload();
            }
            else {
                alert('Greška pri brisanju proizvoda!');
            }
        });

    }
    prod = products.map((p) => {
        return (
            <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.product_id}</td>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td className="text-center"><img src={`http://localhost:8000/${p.image}`} height="130px" width="130px" alt="pic" /></td>
                <td>{p.boja}</td>
                <td>{p.velicina}</td>
                <td>{p.price}</td>
                <td>{p.pol}</td>
                <td>{p.stanje}</td>
                <td className="col-md-2">
                    <Link to={`edit-product/${p.id}`} className="btn btn-warning mx-1">Edit</Link>
                    <button type="button" onClick={() => handleDelete(p.id)} className="btn btn-danger">Delete</button>
                </td>
            </tr>
        )
    })


    const sorting = (column) => {

        var sorted = "";

        if (order === 'asc') {
            if (column !== 'id' && column !== 'product_id' && column !== 'velicina' && column !== 'price' && column !== 'stanje') {
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
            if (column !== 'id' && column !== 'product_id' && column !== 'velicina' && column !== 'price' && column !== 'stanje') {
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

        <div className="view-product-container" id="tabela-admin">

            <table className="table table-bordered table-striped mt-3 mx-3">
                <thead>
                    <tr className="text-center">

                        <th onClick={() => sorting('id')}>ID</th>
                        <th onClick={() => sorting('product_id')}>Product ID</th>
                        <th onClick={() => sorting('name')}>Model</th>
                        <th onClick={() => sorting('description')}>Opis</th>
                        <th>Slika</th>
                        <th onClick={() => sorting('boja')}>Boja</th>
                        <th onClick={() => sorting('velicina')}>Veličina</th>
                        <th onClick={() => sorting('price')}>Cena €</th>
                        <th onClick={() => sorting('pol')}>Pol</th>
                        <th onClick={() => sorting('stanje')}>Na stanju</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {prod}
                </tbody>
            </table>
        </div >
    );
}

export default ViewProducts;