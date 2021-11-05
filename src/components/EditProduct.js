import Navbar from "./Navbar";
import { useEffect, useState } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";

function EditProduct(props) {

    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: ''
    });

    const [image, setImage] = useState([]);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const history = useHistory();

    const handleInput = (e) => {
        e.persist();
        setProduct({ ...product, [e.target.name]: e.target.value })
    }
    const handleImage = (e) => {
        setImage({ image: e.target.files[0] });
    }



    const updateProduct = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image.image);
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('price', product.price);

        const id = props.match.params.id;

        axios.post(`/api/update-product/${id}`, formData).then(res => {
            if (res.data.status === 200) {
                alert(res.data.message);
                setErrors([]);
            }
            else if (res.data.status === 404) {
                alert(res.data.message);
                history.push('admin/dashboard');
            }
            else {
                setErrors(res.data.validation_errors);
            }
        })

    }


    useEffect(() => {

        const id = props.match.params.id;

        axios.get(`/api/edit-product/${id}`).then(res => {
            if (res.data.status === 200) {
                setProduct(res.data.product);
            }
            else if (res.data.status === 404) {
                alert(res.data.message);
                history.push('/admin/dashboard');
            }
            setLoading(false);
        });



    }, [props.match.params.id, history]);



    if (loading) {
        return <h1>Loading...</h1>
    }

    return (

        <div className="add-product">

            <Navbar />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-7 text-center">
                        <form onSubmit={updateProduct} encType="multipart/form-data">
                            <div className="form-group mb-1">
                                <label>Name: </label>
                                <input type="text" name="name" onChange={handleInput} value={product.name} className="form-control" />
                                <label className="text-danger">{errors.name}</label>
                            </div>
                            <div className="form-group mb-1">
                                <label>Description: </label>
                                <textarea name="description" onChange={handleInput} value={product.description} className="form-control" />
                                <label className="text-danger">{errors.description}</label>
                            </div>

                            <div className="form-group mb-1">
                                <label>Image: </label>
                                <input type="file" name="image" onChange={handleImage} className="form-control" />
                                <label className="text-danger">{errors.image}</label>
                            </div>

                            <div className="form-group mb-1">
                                <label>Price: </label>
                                <input type="number" name="price" onChange={handleInput} value={product.price} className="form-control" />
                                <label className="text-danger">{errors.price}</label>
                            </div>

                            <div className="form-group mb-1">
                                <button type="submit" className="btn btn-success btn-lg">Update product</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>



    );


}

export default EditProduct;