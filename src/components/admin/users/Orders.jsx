import React, { useCallback, useEffect, useState } from 'react'
import { urlbase } from '../../../services/getInfoPage';

export default function Orders(props) {

    const [ changestatus, setChangestatus ] = useState()
    const [ moreactions, setMoreactions ] = useState(0)
    const [ orders, setOrders ] = useState([])
    const [ purchases, setPurchases ] = useState([])

    useEffect(() => {
        if(orders.length === 0) setOrders(props.orders);
        if(purchases.length === 0) setPurchases(props.purchases)
    },[props.orders, props.purchases, orders, purchases])

    const handlerChangeStatus = useCallback( async () => {
        const token = localStorage.getItem('token');
        const url = urlbase + '/api/dashboard/orders/change';

        changestatus.token = token;

        const options = {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(changestatus)
        }

        const request = await fetch(url,options);
        const response = await request.json();

        if(!response.error){
            setOrders(response.data)
        }
    },[changestatus])

    useEffect(() => {
        if(changestatus) handlerChangeStatus();
    },[changestatus, handlerChangeStatus])

    const handlerMoreActions = (id) => {
        moreactions !== id
            ? setMoreactions(id)
            : setMoreactions(0);
    }

    window.onclick = (e) => {
        if(!e.target.attributes.dataid) setMoreactions(0);
    }

    return (
        <div className="orders-user section d-flex flex-wrap justify-content-between mt-5 pt-5 pr-0 pl-4 px-md-4">
        {
            purchases && orders && purchases.length
                ? purchases.map((purchase,i) => {
                    return (
                        <div
                            key={i}
                            className={`col-12 col-md-8 col-lg-5 px-0 d-flex flex-wrap mx-auto mt-5 border rounded position-relative ${
                                orders.filter(order => order.number === purchase.order)[0].status === 'pending' ? 'border-danger' : 'border-success'
                            }`}
                        >
                            {
                                orders.map( (order,i) => {
                                    return (
                                        order.number === purchase.order
                                            ? <div
                                                className={`col-12 p-0 text-center ${
                                                    order.status === 'pending' ? 'bg-danger' : 'bg-success'} p-2 text-champagne rounded-top`
                                                }
                                                key={i}
                                            >
                                                Orden {order.status === 'pending' ? 'pendiente' : 'exitosa'}
                                                <div
                                                    className={`position-absolute col-8 col-lg-10 bg-green-sheen rounded shadow p-3 ${
                                                        moreactions === order.number ? '' : 'd-none'}`}
                                                    style={{bottom: '-150px',right: '1px',zIndex: '1'}}
                                                >
                                                    <p className='text-center text-champagne mb-1 border-bottom'>cambiar el estado de la orden</p>
                                                    <ul className='w-100 text-left text-champagne list-unstyled pl-4 py-2'>
                                                        <li onClick={
                                                            (e) => setChangestatus({id: order.id, users_id: order.users_id, status: 'success'})
                                                            }
                                                            className='pointer'
                                                        >
                                                            exitosa
                                                            <i className={order.status === 'success' ? 'fas fa-check-circle ml-5' : ''}></i>
                                                        </li>
                                                        <li onClick={
                                                            (e) => setChangestatus({id: order.id, users_id: order.users_id, status: 'pending'})
                                                            }
                                                            className='pointer'
                                                        >
                                                            pendiente
                                                            <i className={order.status === 'pending' ? 'fas fa-check-circle ml-5' : ''}></i>
                                                        </li>
                                                        <li onClick={
                                                            (e) => setChangestatus({id: order.id, users_id: order.users_id, status: 'rejected'})
                                                            }
                                                            className='pointer'
                                                        >
                                                            rechazada
                                                            <i className={order.status === 'rejected' ? 'fas fa-check-circle ml-5' : ''}></i>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            : ''
                                    )
                                })
                            }
                            <ul className="col-5 py-3 text-right list-unstyled text-metallic-seaweed">
                                <li>Fecha :</li>
                                <li>Producto :</li>
                                <li>Orden ID :</li>
                                <li>Cantidad :</li>
                                <li>Precio sin descuento:</li>
                                <li>Descuento :</li>
                                <li>Precio final :</li>
                            </ul>
                            <ul className="col-7 py-3 text-left list-unstyled text-champagne-contrast-2">
                                <li>
                                    { orders.filter(order => order.number === purchase.order)[0].date
                                        ? orders.filter(order => order.number === purchase.order)[0].date
                                        : ' - '
                                    }
                                </li>
                                <li className='text-truncate'>{purchase.name}</li>
                                <li>{purchase.order}</li>
                                <li>{purchase.quantity}</li>
                                <li>$ {purchase.priceWithoutDiscount}</li>
                                <li>{purchase.discount} %</li>
                                <li>$ {purchase.price}</li>
                            </ul>
                            <div
                                className="more-actionsd-flex align-items-center px-3 position-absolute rounded-circle bg-green-sheen shadow pointer"
                                style={{bottom: '5px',right: '5px'}}
                                dataid={purchase.order}
                                onClick={(e) => handlerMoreActions(Number(e.target.attributes.dataid.value))}
                            >
                                <p className='h4 rounded-circle text-champagne' dataid={purchase.order}>+</p>
                            </div>
                        </div>
                    );
                })
                : <p className='text-center h5 mt-5 pt-5 text-muted w-100'>No ha realizado ninguna compra !</p>
        }
        {
            purchases && purchases.length
                ? <div className='totalspent d-flex flex-wrap justify-content-between col-12 pt-2 pb-5 text-metallic-seaweed'>
                    <hr className='bg-champagne-contrast w-100 my-2' />
                    <p className='h5 pl-4'>Total gastado por el usuario :</p>
                    <p className='h5 pr-4 font-weight-bold'>$
                        {
                            purchases.map(p => { return Number(p.price) })
                            .reduce((acum,numb) => {return acum + numb}).toLocaleString()
                        }
                        -
                    </p>
                </div>
                : ''
        }
    </div>
    )
}
