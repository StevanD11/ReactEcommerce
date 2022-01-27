import Navbar from "./Navbar";
import { useState } from 'react';

function Convertor() {

    const [input, setInput] = useState({
        amount: '',
        from: '',
        to: ''
    });

    String.prototype.isEmpty = function () {
        return (this.length === 0 || !this.trim());
    };

    const handleInput = (e) => {
        e.persist();
        setInput({ ...input, [e.target.name]: e.target.value });
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        if (input.amount.isEmpty() || input.from.isEmpty() || input.to.isEmpty()) {
            alert('Sva polja moraju biti popunjena!')
            return
        }

        if (input.amount < 1) {
            alert('Iznos mora biti veći od 0!')
            return
        }

        if (input.from.length > 3 || input.to.length > 3) {
            alert('Potrebno je da unesete 3-karakternu oznaku valute!');
            return
        }


        fetch("https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency?have=" + input.from + "&want=" + input.to + "&amount=" + input.amount, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "currency-converter-by-api-ninjas.p.rapidapi.com",
                "x-rapidapi-key": "4916172c11msh0beee19c8846ca4p127267jsn0bc7bcd7fc43"
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.error === 'Invalid currencies.') {
                    alert('Unesite ispravne oznake za valute!')
                    return
                }
                document.getElementById('res').innerHTML = response.old_amount + " " + response.old_currency + " = " + response.new_amount + " " + response.new_currency;
            })
            .catch(err => {
                alert("Došlo je do greške prilikom konverzije!");
                console.error(err);
            });
    }


    return (
        <div className="convertor-container">
            <Navbar />
            <div className="container py-5">
                <div className="konvert">
                    <div className="col-md-5 text-center">
                        <form onSubmit={handleSubmit} id="forma-convert">
                            <div className="form-group mb-3">
                                <label>Iznos: </label>
                                <input type="number" name="amount" onChange={handleInput} value={input.amount} className="form-control  text-center" />
                            </div>
                            <div className="form-group mb-3">
                                <label>Iz valute: </label>
                                <input type="text" name="from" onChange={handleInput} value={input.from} className="form-control  text-center" placeholder="Unesite 3-karakternu oznaku valute (npr. USD)" />
                            </div>
                            <div className="form-group mb-3">
                                <label>U valutu: </label>
                                <input type="text" name="to" onChange={handleInput} value={input.to} className="form-control  text-center" placeholder="Unesite 3-karakternu oznaku valute (npr. EUR)" />
                            </div>
                            <div className="form-group mb-3">
                                <button type="submit" className="btn btn-success btn-lg">Konvertuj</button>
                            </div>
                        </form>
                        <div className="result">
                            <h4 id="res"></h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Convertor;