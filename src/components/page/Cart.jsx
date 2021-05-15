import React, { useState, useEffect, useCallback } from 'react'
import { closeSubMenues } from '../../services'
import { urlbase } from '../../services/getInfoPage';

export default function Cart(props) {

    const [ cart, setCart ] = useState([])
    const [ total, setTotal ] = useState(0)
    const [ dataquantity, setDataquantity ] = useState({user: props.user ? props.user.user : ''})

    const calculateTotal = () => {
        const subtotalsElement = document.querySelectorAll('.subtotal span');
        const subtotals = [];

        subtotalsElement.forEach( subtotal =>  subtotals.push(Number(subtotal.innerHTML.slice(1))) );

        setTotal(subtotals.reduce((acum,numb) => acum + numb).toFixed(2));
    }

    const handlerQuantity = useCallback( async () => {
        const token = localStorage.getItem('token');
        const id = await cart.map( product => {
            return product.id
        });
        const quantity = await cart.map( product => { return 1 });

        setDataquantity({...dataquantity, token: token, id: id, quantity: quantity});
    },[dataquantity,cart])

    useEffect(() => {
        if(cart.length === 0){
            const getcart = JSON.parse(localStorage.getItem('cart'));
            if(getcart) setCart(getcart.products);
        }

        if(cart.length){
            calculateTotal();
        }
    },[cart])

    useEffect(() => {
        if(!dataquantity.id) handlerQuantity();
    },[dataquantity,handlerQuantity])

    return (
        <section
            className="container-fluid cart bg-color-main py-5"
            onClick={closeSubMenues}
        >
            <div className='items-container col-10 p-3 d-flex flex-column mx-auto bg-white rounded shadow'>
                <h5 className='border-bottom pl-3 pb-2 text-muted'>
                    Resumen
                </h5>
                {
                    cart.length
                        ? cart.map( (product, i) => {
                            return (
                                <div
                                    key={i}
                                    className='item d-flex flex-wrap align-items-start'
                                >
                                    <div className="product col-12 col-lg-9 p-0 d-flex">
                                        <img
                                            src={`${urlbase}/images/${product.image}`}
                                            alt={product.name}
                                            width='66px'
                                            className='d-none d-md-flex d-lg-flex d-xl-flex'
                                        />
                                        <div className="info d-flex flex-column ml-3">
                                            <p className='title m-0'>
                                                {product.name}
                                            </p>
                                            <p className='price m-0'>
                                                $ {product.price} -
                                            </p>
                                            <p className='discount m-0'>
                                                {product.discount > 0 ? product.discount : ''} % Descuento
                                            </p>
                                        </div>
                                    </div>
                                    <div className="resume col-12 col-lg-3 p-0 d-flex flex-column align-items-end text-muted border-left">
                                        <p>
                                            {product.price}
                                        </p>
                                        <p>
                                            - {product.discount} %
                                        </p>
                                        <p className='subtotal border-top'>
                                            Subtotal :
                                            <span className='ml-2 ml-lg-5'>
                                                $ {` ${((product.price) - ((product.price * product.discount) / 100)).toFixed(2)}`}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                        : <div className='col-12  d-flex flex-column flex-md-row'>
                            <p className='col-12 col-md-8 p-0'>
                                No hay productos seleccionados
                            </p>
                            <p className='col-12 col-md-4 p-0 text-right text-muted border-left'>
                                Subtotal : $ 0
                            </p>
                        </div>
                }
                <div className="total d-flex col-12 border-top py-2 pr-0">
                    <p className='title col-5 col-lg-9 font-weight-bold h5 p-0'>
                        Total
                    </p>
                    <p className='price col-7 col-lg-3 text-right h5 p-0'>
                       $ { total }
                    </p>
                </div>
            </div>

            <div className="payment d-flex flex-wrap justify-content-around rounded col-10 mx-auto p-3 mt-4 bg-white shadow">
                <h5 className='text-muted w-100 border-bottom pb-2 mb-5 pl-3'>
                    Pagar con
                </h5>
                <div className="paypal col-12 col-md-3 rounded-lg border bg-color-main d-flex flex-column p-3">
                    <div className="image d-flex justify-content-center align-items-center" style={{minHeight: '150px', maxHeight: '150px'}}>
                        <img
                            src="https://www.kerigmafilms.com/wp-content/uploads/2017/01/icono-paypal-tarjetas-300x103.jpg" alt="logo paypal"
                            width='200px'
                        />
                    </div>
                    <button className='rm-btn-outline rm-orange mt-2'>
                        Pay-pal
                    </button>
                </div>
                <div className="cryptocoin col-12 col-md-3 rounded-lg border bg-color-main d-flex flex-column p-3">
                    <div className="image d-flex justify-content-center align-items-center" style={{minHeight: '150px', maxHeight: '150px'}}>
                        <img
                            src="https://image.freepik.com/vector-gratis/criptomoneda-digital-vector-set-iconos-bitcoin-ethereum-litecoin-monero-ripple-z_1268-2988.jpg" alt="set-iconos-bitcoin-ethereum-litecoin-monero-ripple-z_1268-2988"
                            width='200px'
                        />
                    </div>
                    <button className='rm-btn  rm-disabled mt-2'>
                        Crypto Monedas
                    </button>
                </div>
                <div className="credit-card col-12 col-md-3 rounded-lg border bg-color-main d-flex flex-column p-3">
                    <div className="image d-flex justify-content-center align-items-center" style={{minHeight: '150px', maxHeight: '150px'}}>
                        <img
                            src="http://www.puertopixel.com/wp-content/uploads/tarjetas.jpg" alt="tarjetas de credito"
                            width='200px'
                        />
                    </div>
                    <button className='rm-btn rm-disabled mt-2'>
                        Tarjetas de Credito
                    </button>
                </div>
            </div>
        </section>
    )
}
