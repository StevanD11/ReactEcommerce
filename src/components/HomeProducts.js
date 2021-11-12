import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomeProducts() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        let mounted = true;

        axios.get(`/api/view-products`).then(res => {
            if (res.data.status === 200 && mounted) {
                setProducts(res.data.products);
                setLoading(false);
            }
        });

        return () => {
            mounted = false;
        };

    });

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (

        <div className="home-products-container">

            <h1 className="text-center mt-4 mb-4">Welcome to the best sneaker shop! </h1>

            <div className="home-products">
                {
                    products.map((product) => (
                        <div className="product" key={product.id}>
                            <img src={`http://localhost:8000/${product.image}`} height="250px" width="250px" alt="pic" />
                            <br />
                            <label>Name: {product.name}</label>
                            <br />
                            <label>Description: {product.description}</label>
                            <br />
                            <label>Price: {product.price}€</label>
                            <br />
                            <button className="btn btn-danger btn-sm">Add to Cart</button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default HomeProducts;