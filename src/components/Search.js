import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';


function Search() {

    const [products, setProducts] = useState([]);
    const [kriterijum, setKriterijum] = useState('naziv');
    const [kljuc, setKljuc] = useState('');
    const history = useHistory();
    const [boja, setBoja] = useState();
    const [velicina, setVelicina] = useState();
    const [kolicina, setKolicina] = useState();

    String.prototype.isEmpty = function () {
        return (this.length === 0 || !this.trim());
    };


    function search(kriterijum, key) {
        console.log(key + " " + kriterijum);

        if (key.isEmpty())
            return;

        axios.get(`/api/search/${kriterijum}/${key}`).then(res => {
            if (res.data.status === 200) {
                setProducts(res.data.products)
            }
            if (res.data.status === 404) {
                alert(res.data.message);
                setProducts([]);
            }
        })
    }

    const handleChangeKriterijum = (e) => {
        setProducts([]);
        setKriterijum(e.target.value);
    }

    const handleBoje = (e) => {
        setBoja(e.target.value);
    }

    const handleVelicine = (e) => {
        setVelicina(e.target.value);
    }

    const handleKolicina = (e) => {
        setKolicina(e.target.value);
    }

    const dodajUKorpu = (e) => {
        e.preventDefault();

        let product_cart = {
            product_id: e.target.value,
            velicina: velicina,
            boja: boja,
            kolicina: kolicina
        }

        axios.post(`/api/korpa_dodaj`, product_cart).then(res => {
            if (res.data.status === 200) {
                alert(res.data.message);
            }
            if (res.data.status === 401) {
                alert(res.data.message);
            }
            if (res.data.status === 203) {
                alert(res.data.message);
            }
            if (res.data.status === 205) {
                alert(res.data.message);
            }
        }).
            catch(function (error) {
                if (error.response.status === 404) {
                    alert(error.response.message);
                }
            });

    }


    var src = '';

    if (kriterijum === 'naziv') {
        src = <div>
            <input type="text" id="src" onChange={(e) => search(kriterijum, e.target.value)} placeholder="Unesite naziv modela..." />
        </div>
    }
    else if (kriterijum === 'cena') {
        src = <div className="form-group mb-1 mt-3 mb-3">
            <select className="selectCena" id="select_cena" onChange={(e) => search(kriterijum, e.target.value)} >
                <option className="" value={'izaberi'}>Izaberi</option>
                <option className="opadajuca" value={'desc'}>Opadajuća</option>
                <option className="rastuca" value={'asc'}>Rastuća</option>
            </select>
        </div>
    }
    else if (kriterijum === 'pol') {
        src = <div className="form-group mb-1 mt-3 mb-3">
            <select className="selectPol" id="select_pol" onChange={(e) => search(kriterijum, e.target.value)} >
                <option className="" value={'izaberi'}>Izaberi</option>
                <option className="muski" value={'muski'}>Muški</option>
                <option className="zenski" value={'zenski'}>Ženski</option>
            </select>
        </div>
    }
    else if (kriterijum === 'velicina') {
        src = <div className="form-group mb-1 mt-3 mb-3">
            <select className="selectVelicina" id="select_velicina" onChange={(e) => search(kriterijum, e.target.value)} >
                <option className="velicinaOption" value={'izaberi'}>Izaberi</option>
                <option className="velicinaOption" value={35}>35</option>
                <option className="velicinaOption" value={36}>36</option>
                <option className="velicinaOption" value={37}>37</option>
                <option className="velicinaOption" value={38}>38</option>
                <option className="velicinaOption" value={39}>39</option>
                <option className="velicinaOption" value={40}>40</option>
                <option className="velicinaOption" value={41}>41</option>
                <option className="velicinaOption" value={42}>42</option>
                <option className="velicinaOption" value={43}>43</option>
                <option className="velicinaOption" value={44}>44</option>
                <option className="velicinaOption" value={45}>45</option>
                <option className="velicinaOption" value={46}>46</option>
                <option className="velicinaOption" value={47}>47</option>
                <option className="velicinaOption" value={48}>48</option>
            </select>
        </div>
    }
    else if (kriterijum === 'boja') {
        src = <div className="form-group mb-1 mt-3 mb-3">
            <select className="selectBoja" id="select_boja" onChange={(e) => search(kriterijum, e.target.value)} >
                <option className="bojaOption" value={'izaberi'}>Izaberi</option>
                <option className="bojaOption" value={'crvena'}>Crvena</option>
                <option className="bojaOption" value={'zelena'}>Zelena</option>
                <option className="bojaOption" value={'plava'}>Plava</option>
                <option className="bojaOption" value={'bela'}>Bela</option>
                <option className="bojaOption" value={'crna'}>Crna</option>
                <option className="bojaOption" value={'siva'}>Siva</option>
                <option className="bojaOption" value={'narandzasta'}>Narandžasta</option>
                <option className="bojaOption" value={'zuta'}>Žuta</option>
                <option className="bojaOption" value={'braon'}>Braon</option>
                <option className="bojaOption" value={'roze'}>Roze</option>
                <option className="bojaOption" value={'ljubicasta'}>Ljubičasta</option>
            </select>
        </div >
    }

    return (
        < div className="search-container" >
            <Navbar />
            <div className="search">
                <select id="kriterijum" onChange={handleChangeKriterijum}>
                    <option value={"naziv"}>Naziv</option>
                    <option value={"cena"}>Cena</option>
                    <option value={"velicina"}>Velicina</option>
                    <option value={"boja"}>Boja</option>
                    <option value={"pol"}>Pol</option>
                </select>

                {src}

            </div>

            <div className="products">
                {
                    products.map((product) => (
                        <div className="product" key={product.id}>
                            <h5 style={{ color: "#0779dd" }}>{product.name}</h5>
                            <label>{product.description}</label>
                            <br />
                            <img src={`http://localhost:8000/${product.image}`} height="250px" width="250px" alt="pic" />
                            <br />
                            <h5 id="cena">Cena: {product.price}€</h5>
                            <label>Boja: </label>
                            <select className="bojaPocetna" id="select_boja_poc" onChange={handleBoje}>
                                <option>Izaberi</option>
                                {
                                    product.boje.map((boja) => (
                                        <option className="boja" value={boja.boja} key={boja.boja}>{boja.boja}</option>
                                    ))
                                }
                            </select>
                            <br />
                            <label>Veličina: </label>
                            <select className="velicinaPocetna" id="select_vel_poc" onChange={handleVelicine}>
                                <option>Izaberi</option>
                                {
                                    product.velicine.map((velicina, index) => (
                                        <option className="velicina" value={velicina.velicina} key={index}>{velicina.velicina}</option>
                                    ))
                                }

                            </select>

                            <br />
                            <label>Količina : </label>
                            <input type="number" id="kolicina" onChange={handleKolicina} />
                            <br />
                            <Link to="">
                                <button onClick={dodajUKorpu} value={product.id} className="btn btn-danger btn-sm">Dodaj u korpu</button>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div >
    );
}

export default Search;