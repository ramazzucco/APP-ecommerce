import React from 'react'
import { Link } from 'react-router-dom';
import { urlbase } from '../../../services/getInfoPage';

// Components.
import Loadingdata from '../../Loadingdata';

export default function Lastproduct(props) {

    const handlerOnMouseOver = (e) => {
        const content = document.querySelector('.lastproduct .content .info');
        if(content) content.classList.add('h-100');
        document.querySelector('.lastproduct header').classList.replace('bg-opal','bg-metallic-seaweed');
    }
    const handlerOnMouseOut = (e) => {
        const content = document.querySelector('.lastproduct .content .info');
        if(content) content.classList.remove('h-100');
        document.querySelector('.lastproduct header').classList.replace('bg-metallic-seaweed','bg-opal');
    }

    return (
        <div
            className='lastproduct d-flex flex-column justify-content-start element-up rounded-top'
            onMouseOver={handlerOnMouseOver}
            onMouseOut={handlerOnMouseOut}
        >
            <header className="title bg-opal mb-3 rounded-top">
                <p className='text-center text-champagne mb-1'>
                    Ultimo producto
                </p>
            </header>
            <div className='content d-flex p-3'>
                {
                    props.lastproduct.link
                        ? <Link
                            to={props.lastproduct.link}
                            className='w-100 rounded position-relative'
                        >
                            <div className="image d-flex justify-content-center">
                                <img
                                    src={`${urlbase}/images/${props.lastproduct.image}`}
                                    alt={props.lastproduct.name}
                                    width='100%'
                                />
                            </div>
                            <div
                                className="info d-flex flex-column align-items-center justify-content-center
                                    text-champagne rounded position-absolute w-100 overflow-hidden"
                            >
                                <p className="name mb-1 font-weight-bold h5 text-truncate">
                                    {props.lastproduct.name}
                                </p>
                                <p className="category mb-1">
                                    {props.lastproduct.category}
                                </p>
                                <p className="price mb-1">
                                    $ {props.lastproduct.price}
                                </p>
                                <p className="stock mb-1">
                                    {props.lastproduct.stock} Unidades
                                </p>
                                <p className="discount mb-1">
                                    {props.lastproduct.dicount > 0 ? `${props.lastproduct.dicount} % OFF` : 'sin descuento'}
                                </p>
                            </div>
                        </Link>
                        : <div className="d-flex mx-auto py-4 text-metallic-seaweed">
                            <Loadingdata />
                        </div>
                }
            </div>
        </div>
    )
}
