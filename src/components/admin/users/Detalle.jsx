import React, { useEffect } from 'react'
import { qS } from '../../../services';
import { urlbase } from '../../../services/getInfoPage'

export default function Detalle(props) {

    useEffect(() => {
        qS('.users .detail-user').classList.add('show');
    },[])

    return (
        <div className='detail-user section pl-md-4 pl-lg-2 pr-md-0 pt-5 mt-5 position-relative'>
            <div className="info d-flex flex-wrap p-4 mt-3 justify-content-center text-metallic-seaweed-contrast">
                <div className="image col-4 col-xl-3 p-0 position-absolute"
                    style={{top: '-50%',left: '25%',transform: 'translateX(-50%)',zIndex: '1'}}
                >
                    <img
                        src={`${urlbase}/images/avatars/${props.user.user.avatar}`}
                        alt={`${props.user.user.first_name} ${props.user.user.last_name}`}
                        width='50%'
                        className='rounded'
                    />
                </div>
                <div
                    className="data col-12 col-md-9 p-5 d-flex align-items-center justify-content-center bg-green-sheen rounded position-absolute"
                    style={{top: '0', left: '50%',transform: 'translateX(-50%)'}}
                >
                    <ul className='text-right list-unstyled mr-3 text-truncate'>
                        <li>Id : </li>
                        <li>Nombre : </li>
                        <li>Apellido : </li>
                        <li>Email : </li>
                        <li>Direccion : </li>
                        <li>Ciudad : </li>
                        <li>Estatus : </li>
                        <li>Codigo de estatus : </li>
                        <li>Ordenes de compra : </li>
                        <li>Cantidad de productos comprados : </li>
                        <li>Total gastado : </li>
                    </ul>
                    <ul className='text-left list-unstyled text-champagne'>
                        <li>{props.user.user.id}</li>
                        <li>{props.user.user.first_name}</li>
                        <li>{props.user.user.last_name}</li>
                        <li>{props.user.user.email}</li>
                        <li>{props.user.user.address}</li>
                        <li>{props.user.user.city}</li>
                        <li>
                            {props.user.user.status === 0 ? "Comprador ocasional" : ""}
                            {props.user.user.status === 1 ? "Comprador recurrente" : ""}
                            {props.user.user.status === 3 ? "Comprador vip" : ""}
                        </li>
                        <li>
                            {props.user.user.status === 0 ? (props.user.user.status) : ""}
                            {props.user.user.status === 1 ? (props.user.user.status) : ""}
                            {props.user.user.status === 3 ? (props.user.user.status) : ""}
                        </li>
                        <li>{props.user.orders ? props.user.orders.length : ' - '}</li>
                        <li>{props.user.purchases ? props.user.purchases.length : ' - '}</li>
                        <li>$ {
                            props.user.purchases.length
                                ? props.user.purchases.map( purchase => Number(purchase.price)).reduce((a,b) => a + b)
                                : ' - '
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
