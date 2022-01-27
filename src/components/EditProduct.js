import Navbar from "./Navbar";
import { useEffect, useLayoutEffect, useState } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";


function EditProduct(props) {

    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();
    const [image, setImage] = useState([]);
    const [velicina, setVelicina] = useState();
    const [boja, setBoja] = useState();
    const [pol, setPol] = useState();
    const [stanje, setStanje] = useState();
    const history = useHistory();

    String.prototype.isEmpty = function () {
        return (this.length === 0 || !this.trim());
    };

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    const handlePrice = (e) => {
        setPrice(e.target.value);
    }

    const handleImage = (e) => {
        setImage({ image: e.target.files[0] });
    }

    const handleBoja = (e) => {
        setBoja(e.target.value);
    }

    const handleVelicina = (e) => {
        setVelicina(e.target.value);
    }

    const handleChangePol = (e) => {
        setPol(e.target.value);
    }

    const handleStanje = (e) => {
        setStanje(e.target.value);
    }


    const updateProduct = (e) => {

        e.preventDefault();

        if (name.isEmpty() || description.isEmpty() || stanje.isEmpty()) {
            alert('Sva polja moraju biti popunjena!')
            return;
        }

        var file = document.getElementById("image");
        if (file.files.length == 0) {
            alert('Potrebno je da odaberete sliku!')
            return;
        }

        if (boja === undefined) {
            alert('Potrebno je da odaberete boju!')
            return
        }
        if (velicina === undefined) {
            alert('Potrebno je da odaberete veličinu!')
            return
        }
        if (pol === undefined) {
            alert('Potrebno je da odaberete pol!')
            return
        }

        if (price <= 0) {
            alert('Cena mora biti veća od 0!')
            return
        }

        if (stanje < 0) {
            alert('Stanje ne može biti manje od 0!')
            return
        }

        const formData = new FormData();
        formData.append('image', image.image);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('stanje', stanje);
        formData.append('boja', boja);
        formData.append('velicina', velicina);
        formData.append('pol', pol);

        const id = props.match.params.id;

        axios.post(`/api/update-product/${id}`, formData).then(res => {
            if (res.data.status === 200) {
                alert(res.data.message);
            }

            else if (res.data.status === 404) {
                alert(res.data.message);
            }
            else if (res.data.status === 500) {
                alert(res.data.message);
            }
            else if (res.data.status === 501) {
                alert(res.data.message);
            }

            else if (res.data.status === 505) {
                alert(res.data.message);
            }
        })
    }


    useEffect(() => {

        const id = props.match.params.id;

        axios.get(`/api/edit-product/${id}`).then(res => {
            if (res.data.status === 200) {
                setName(res.data.product.product.name);
                setDescription(res.data.product.product.description);
                setPrice(res.data.product.product.price);
                setPol(res.data.product.pol);
                setStanje(res.data.product.stanje);
            }
            else if (res.data.status === 404) {
                alert(res.data.message);
                history.push('/admin/dashboard');
            }
        });

    }, [props.match.params.id, history]);



    return (

        <div className="add-product">

            <Navbar />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-7 text-center">
                        <form onSubmit={updateProduct} encType="multipart/form-data">
                            <div className="form-group mb-1">
                                <label>Model: </label>
                                <input type="text" name="name" onChange={handleName} value={name} className="form-control" />
                            </div>
                            <div className="form-group mb-1">
                                <label>Opis: </label>
                                <textarea name="description" onChange={handleDescription} value={description} className="form-control" />
                            </div>

                            <div className="form-group mb-1">
                                <label>Slika: </label>
                                <input type="file" name="image" id="image" onChange={handleImage} className="form-control" />
                            </div>

                            <div className="form-group mb-1 mt-3 mb-3">
                                <label className="mx-3">Boja:</label>
                                <select name="boja" onChange={handleBoja}>
                                    <option>Izaberi</option>
                                    <option value={'crvena'}>Crvena</option>
                                    <option value={'plava'}>Plava</option>
                                    <option value={'zelena'}>Zelena</option>
                                    <option value={'bela'}>Bela</option>
                                    <option value={'crna'}>Crna</option>
                                    <option value={'siva'}>Siva</option>
                                    <option value={'narandžasta'}>Narandžasta</option>
                                    <option value={'žuta'}>Žuta</option>
                                    <option value={'braon'}>Braon</option>
                                    <option value={'roze'}>Roze</option>
                                    <option value={'ljubičasta'}>Ljubičasta</option>
                                </select>
                            </div>

                            <div className="form-group mb-1 mt-3 mb-3">
                                <label className="mx-3">Velicina:</label>
                                <select name="velicina" onChange={handleVelicina}>
                                    <option>Izaberi</option>
                                    <option value={35}>35</option>
                                    <option value={36}>36</option>
                                    <option value={37}>37</option>
                                    <option value={38}>38</option>
                                    <option value={39}>39</option>
                                    <option value={40}>40</option>
                                    <option value={41}>41</option>
                                    <option value={42}>42</option>
                                    <option value={43}>43</option>
                                    <option value={44}>44</option>
                                    <option value={45}>45</option>
                                    <option value={46}>46</option>
                                    <option value={47}>47</option>
                                    <option value={48}>48</option>
                                </select>
                            </div>

                            <div className="form-group mb-1 mt-3 mb-3">
                                <label className="mx-3">Pol:</label>
                                <select name="pol" id="pol" onChange={handleChangePol}>
                                    <option>Izaberi</option>
                                    <option name="muski" value={'muski'}>Muški</option>
                                    <option name="zenski" value={'zenski'}>Ženski</option>
                                </select>
                            </div>

                            <div className="form-group mb-1">
                                <label>Cena: </label>
                                <input type="number" name="price" onChange={handlePrice} value={price} className="form-control" />
                            </div>

                            <div className="form-group mb-1">
                                <label>Na stanju: </label>
                                <input type="number" name="stanje" onChange={handleStanje} value={stanje} className="form-control" />
                            </div>

                            <div className="form-group mb-1 mt-3">
                                <button type="submit" className="btn btn-success btn-lg">Sačuvaj izmene</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProduct;