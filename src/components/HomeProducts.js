import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomeProducts() {

    const [products, setProducts] = useState([]);
    const [velicina, setVelicina] = useState([]);
    const [boja, setBoja] = useState([]);
    const [kolicina, setKolicina] = useState();

    useEffect(() => {
        axios.get(`/api/view-products`).then(res => {
            if (res.data.status === 200) {
                setProducts(res.data.products);
            }

        }).catch(function (error) {
            if (error.response.status === 500) {
                alert('Sistem ne može da vrati proizvode!');
            }

        });;
    }, []);


    const handleBoje = (e, product_id) => {
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

        if (kolicina <= 0) {
            alert('Količina mora biti veća od 0!');
            return;
        }

        if (velicina === undefined || boja === undefined || kolicina === undefined) {
            alert('Potrebno je da odaberete veličinu/boju/količinu pre unosa u korpu!');
            return;
        }

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



    return (

        <div className="home-products-container">

            <h1 className="text-center mt-4 mb-4">DS Sport Shop</h1>

            <div className="home-products">
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
                                <button onClick={dodajUKorpu} value={product.id} className="btn btn-danger btn-sm" id="btn_korpa">Dodaj u korpu</button>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div >
    );
}

export default HomeProducts;