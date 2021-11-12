import { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function Search() {

    const [products, setProducts] = useState([]);

    function search(key) {
        axios.get(`/api/search/${key}`).then(res => {
            if (res.data.status === 200) {
                setProducts(res.data.products)
            }
            else if (res.data.status === 404) {
                alert(res.data.message);
                setProducts([]);
            }
        });

    }


    return (
        <div className="search-container">

            <Navbar />

            <div className="search">
                <h3> Search </h3>
                <input type="text" onChange={(e) => search(e.target.value)} className="form-control" placeholder="Enter product name..." />
            </div>


            <div className="products">
                {
                    products.map((product) => (
                        <div className="product" key={product.id}>
                            <img src={`http://localhost:8000/${product.image}`} height="150px" width="150px" alt="pic" />
                            <br />
                            <label>Name: {product.name}</label>
                            <br />
                            <label>Price: {product.price}€</label>
                            <br />
                            <label>Description: {product.description}</label>
                            <br />
                            <button className="btn btn-danger btn-sm">Add to Cart</button>
                        </div>
                    ))
                }
            </div>







        </div>





    );


}

export default Search;