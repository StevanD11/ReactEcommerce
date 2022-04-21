import { useState } from 'react'
import Navbar from './Navbar';
import emailjs from "emailjs-com";

function Contact() {

    function handleSubmit(e) {
        e.preventDefault();

        if (name.isEmpty() || email.isEmpty() || subject.isEmpty() || message.isEmpty()) {
            alert('Sva polja moraju biti popunjena!')
            return;
        }


        emailjs.sendForm('service_20shv72', 'template_qfc57nq', e.target, 'WIE_Srk1LoofIn56z')
            .then((result) => {
                alert('Poruka je uspesno poslata!')
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });

        e.target.reset();
    }


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    String.prototype.isEmpty = function () {
        return (this.length === 0 || !this.trim());
    };


    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleSubject = (e) => {
        setSubject(e.target.value);
    }

    const handleMessage = (e) => {
        setMessage(e.target.value);
    }


    return (
        <div className="contact-div">
            <Navbar />
            <div className="forma-div text-center">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="form-group mb-3">
                        <label>Ime i prezime: </label>
                        <input type="text" name="name" onChange={handleName} className="form-control" />
                    </div>
                    <div className="form-group mb-3">
                        <label>Email: </label>
                        <input type="text" name="email" onChange={handleEmail} className="form-control" />
                    </div> <div className="form-group mb-3">
                        <label>Naslov: </label>
                        <input type="text" name="subject" onChange={handleSubject} className="form-control" />
                    </div>
                    <div className="form-group mb-3">
                        <label>Poruka: </label>
                        <textarea onChange={handleMessage} name="message" id="txtarea" className="form-control" />
                    </div>
                    <div className="form-group mb-1">
                        <button type="submit" className="btn btn-success btn-lg" id="btn_add">Pošalji</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Contact;