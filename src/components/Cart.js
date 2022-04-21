import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

function Cart() {

    const [productsKorpa, setProductsKorpa] = useState([]);
    const history = useHistory();
    const [data, setData] = useState({
        ime: '',
        prezime: '',
        email: '',
        telefon: '',
        grad: '',
        postanski_broj: '',
        adresa: '',
        placanje: ''
    });


    if (!localStorage.getItem('auth_token')) {
        alert('Morate biti ulogovani da biste otvorili korpu!');
        history.push('/login');
    }


    String.prototype.isEmpty = function () {
        return (this.length === 0 || !this.trim());
    };

    const handleChange = (e) => {
        e.persist();
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (ukupno === 0) {
            alert('Potrebno je da dodate proizvod u korpu!')
            return;
        }


        if (data.ime.isEmpty() || data.prezime.isEmpty() || data.email.isEmpty() || data.telefon.isEmpty() || data.grad.isEmpty() || data.postanski_broj.isEmpty()
            || data.adresa.isEmpty() || data.placanje.isEmpty()) {
            alert('Sva polja moraju biti popunjena!')
            return;
        }

        const info = {
            ime: data.ime,
            prezime: data.prezime,
            email: data.email,
            telefon: data.telefon,
            grad: data.grad,
            postanski_broj: data.postanski_broj,
            adresa: data.adresa,
            placanje: data.placanje,
            ukupan_iznos: ukupno
        }


        axios.post(`api/naruci`, info).then(res => {
            if (res.data.status === 200) {
                alert(res.data.message);
                window.location.reload();
            }
            if (res.data.status === 422) {
                alert(res.data.message);
            }
            if (res.data.status === 404) {
                alert(res.data.message);
            }
        })

    }


    useEffect(() => {
        axios.get(`/api/korpa`).then(res => {
            if (res.data.status === 200) {
                setProductsKorpa(res.data.products);
            }
        })
    }, []);



    const deleteItem = (e) => {
        e.preventDefault();
        let id = e.target.value;

        axios.delete(`/api/obrisi_item/${id}`).then(res => {
            if (res.data.status === 200) {
                alert(res.data.message);
                window.location.reload();
            }
        });

    }


    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    let ukupno = 0;

    let ima = <div className="cart-products">
        {
            productsKorpa.map((product) => {
                ukupno += product.kolicina * product.price;
                return (
                    <div className="product-cart" key={product.id}>
                        <h5 style={{ color: "#0779dd" }}>{product.name}</h5>
                        <label>{product.description}</label>
                        <br />
                        <img src={`http://localhost:8000/${product.image}`} height="250px" width="250px" alt="pic" />
                        <br />
                        <h5 id="cena">Cena: {product.price}€</h5>
                        <label>Boja: {capitalizeFirstLetter(product.boja)}</label>
                        <br />
                        <label>Veličina: {product.velicina}</label>
                        <br />
                        <label>Količina: {product.kolicina}</label>
                        <br />
                        <label>Ukupno: {product.kolicina * product.price}€</label>
                        <br />
                        <Link to="">
                            <button className="btn btn-danger btn-lg" onClick={deleteItem} value={product.id}>Ukloni</button>
                        </Link>

                    </div>
                )

            })
        }
    </div>


    let nema = <h2 id="prazna-tekst">Korpa je trenutno prazna!</h2>


    return (

        <div className="cart-products-container">
            <Navbar />

            <h1 className="text-center mt-4 mb-4"> Korpa</h1>

            <div className="podesavanje">

                {productsKorpa.length > 0 ? ima : nema}

                <div className="ukupno-info">
                    <div className="grupa">
                        <h1 id="ukupno-cart">Ukupno</h1>
                        <h4 id="uplata">Za uplatu: {ukupno}€</h4>
                    </div>



                    <div className='div-forma-checkout'>
                        <form>
                            <div className="prva">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Ime:</label>
                                    <input type="text" className="form-control" name="ime" onChange={handleChange} value={data.ime} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Prezime:</label>
                                    <input type="text" className="form-control" name="prezime" onChange={handleChange} value={data.prezime} />
                                </div>
                            </div>
                            <div className="prva">
                                <div className="col-md-6 mb-3" >
                                    <label className="form-label">Email:</label>
                                    <input type="email" className="form-control" name="email" onChange={handleChange} value={data.email} />
                                </div>
                                <div className="col-md-6 mb-3" >
                                    <label className="form-label">Telefon:</label>
                                    <input type="text" className="form-control" name="telefon" onChange={handleChange} value={data.telefon} />
                                </div>
                            </div>
                            <div className="prva">
                                <div className="col-md-6 mb-3" >
                                    <label className="form-label">Grad:</label>
                                    <input type="text" className="form-control" name="grad" onChange={handleChange} value={data.grad} />
                                </div>
                                <div className="col-md-6 mb-3" >
                                    <label className="form-label">Poštanski broj:</label>
                                    <input type="text" className="form-control" name="postanski_broj" onChange={handleChange} value={data.postanski_broj} />
                                </div>
                            </div>
                            <div className="prva">
                                <div className="col-md-6 mb-3" >
                                    <label className="form-label">Adresa:</label>
                                    <input type="text" className="form-control" name="adresa" onChange={handleChange} value={data.adresa} />
                                </div>
                                <div className="col-md-6 mb-3" >
                                    <label className="form-label">Način plaćanja:</label>
                                    <select type="text" id='placanje' className="form-select" name="placanje" onChange={handleChange} value={data.placanje} >
                                        <option disabled value={''}>Izaberi</option>
                                        <option value={'gotovina'}>Gotovina</option>
                                        <option value={'kartica'}>Kartica</option>
                                    </select>
                                </div>
                            </div>
                            <button type="button" className="btn btn-primary mt-2" name="btn_naruci" onClick={handleSubmit} id="dugme">Naruči</button>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default Cart;