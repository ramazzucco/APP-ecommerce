import React from "react";

export default function Myshopping(props) {

    return (
        <div className='miscompras d-flex flex-column align-items-center bg-white rounded-lg shadow p-3 mt-4'>
            <header className='col-12 border-bottom'>
                <h4 className="">Mis compras</h4>
            </header>
            <section className="list d-flex flex-wrap justify-content-center text-white py-3">
                {
                    props.purchases && props.purchases.length
                        ? props.purchases.map((purchase) => {
                            return (
                                <React.Fragment>
                                    <ul className="col-5 py-3 text-right list-unstyled text-sombra-main-3">
                                        <li>Producto :</li>
                                        <li>Orden ID :</li>
                                        <li>Cantidad :</li>
                                        <li>Precio sin descuento:</li>
                                        <li>Descuento :</li>
                                        <li>Precio final :</li>
                                    </ul>
                                    <ul className="col-7 py-3 text-left text-truncate list-unstyled bg-main-contrast-4 ">
                                        <li>{purchase.name}</li>
                                        <li>{purchase.order}</li>
                                        <li>{purchase.quantity}</li>
                                        <li>$ {purchase.priceWithoutDiscount}</li>
                                        <li>{purchase.discount} %</li>
                                        <li>$ {purchase.price}</li>
                                    </ul>
                                </React.Fragment>
                            );
                        })
                        : <p className='text-center h5 text-muted'>No ha realizado ninguna compra !</p>
                }
                {
                    props.purchases && props.purchases.length
                        ? <div className='totalspent d-flex justify-content-between col-12 pt-2 border-top text-sombra-main-3'>
                            <p className='h5'>Total Gastado :</p>
                            <p className='h5 font-weight-bold'>$
                                {
                                    props.purchases.map(p => { return Number(p.price) })
                                    .reduce((acum,numb) => {return acum + numb})
                                }
                                .-
                            </p>
                        </div>
                        : ''
                }
            </section>
        </div>
    );
}
