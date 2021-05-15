import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer(props) {

    const footer = {
        footer: "bg-white",
    }

    return (
        <footer className="d-flex flex-wrap p-2 p-sm-5 ">

            <div className="socialnetworks col-12 p-0 d-flex justify-content-around mb-3">
                <Link to="www.instagram.com/tue-commerceOk">
                    <i className="fab fa-instagram fa-3x"></i>
                </Link>
                <Link to="www.facebook.com/tue-commerce">
                    <i className="fab fa-facebook fa-3x"></i>
                </Link>
                <a href='https://wa.me/+3415853666'>
                    <i className="fab fa-whatsapp fa-3x"></i>
                </a>
            </div>

            <hr className="sombra-main-4"/>

            <div className="contactus d-flex justify-content-center col-12 mb-5 text-color-main">
                <ul className="list-unstyled">
                    <li>
                        <i className="fas fa-home mr-3"></i> Calle False 123, Spriengfield
                    </li>
                    <li>
                        <i className="fas fa-envelope mr-3"></i> info@tumarca_e-commerce.com.ar
                    </li>
                    <li>
                        <i className="fas fa-phone mr-3"></i> 0341-4339666
                    </li>
                </ul>
            </div>

            <div className="copyright col-12 p-0 text-color-main text-center">
                <i className="far fa-copyright">
                    {"  "} ra-ma-commerce - Todods los derechos reservados
                </i>
            </div>

        </footer>
    )
}
