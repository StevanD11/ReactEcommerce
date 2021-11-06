import Navbar from "./Navbar";
import { useState } from 'react';

function Convertor() {

    const [input, setInput] = useState({
        amount: '',
        from: '',
        to: ''
    });

    const handleInput = (e) => {
        e.persist();
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    var result = "";

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency?have=" + input.from + "&want=" + input.to + "&amount=" + input.amount, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "currency-converter-by-api-ninjas.p.rapidapi.com",
                "x-rapidapi-key": "4916172c11msh0beee19c8846ca4p127267jsn0bc7bcd7fc43"
            }
        })
            .then(response => response.json())
            .then(response => {
                document.getElementById('res').innerHTML = response.old_amount + " " + response.old_currency + " = " + response.new_amount + " " + response.new_currency;
            })
            .catch(err => {
                console.error(err);
            });

    }




    return (
        <div className="convertor-container">
            <Navbar />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-5 text-center">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label>Amount: </label>
                                <input type="text" name="amount" onChange={handleInput} value={input.amount} className="form-control  text-center" />
                            </div>
                            <div className="form-group mb-3">
                                <label>From: </label>
                                <input type="text" name="from" onChange={handleInput} value={input.from} className="form-control  text-center" placeholder="Must be 3-character currency code (e.g. USD)" />
                            </div>
                            <div className="form-group mb-3">
                                <label>To: </label>
                                <input type="text" name="to" onChange={handleInput} value={input.to} className="form-control  text-center" placeholder="Must be 3-character currency code (e.g. EUR)" />
                            </div>
                            <div className="form-group mb-3">
                                <button type="submit" className="btn btn-success btn-lg">Convert</button>
                            </div>
                        </form>
                        <div className="result">
                            <h4 id="res" className="mt-4"></h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Convertor;