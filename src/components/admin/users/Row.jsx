import React from 'react'
import { Link } from 'react-router-dom';
import { qS } from '../../../services';

export default function Row(props) {

    const handlerOnMouseOver = (selector) => {
        qS(selector).classList.add('d-flex');
    }

    const handlerOnMouseOut = (selector) => {
        qS(selector).classList.remove('d-flex');
    }

    const functionsRowName = {
        onMouseOver: () => {
            handlerOnMouseOver(`.admin-container .items-user #u${props.user.id} td.name .mytooltip`)
        },
        onMouseOut: () => {
            handlerOnMouseOut(`.admin-container .items-user #u${props.user.id} td.name .mytooltip`)
        }
    }

    return (
        <tr
            id={`u${props.user.id}`}
            className="text-green-sheen"
        >
            <td>
                {props.user.id}
            </td>
            <td className="name">
                <span
                    className="mytooltip text-center"
                    data-title="Ir al detalle de usuario"
                ></span>
                <Link
                    to={`/admin/usuarios/${props.user.id}`}
                    {...functionsRowName}
                >
                    {`${props.user.first_name} ${props.user.last_name}`}
                </Link>
            </td>
            <td>{props.user.email}</td>
            <td>{props.user.address}</td>
            <td>{props.user.city}</td>
            <td className={`
                ${props.user.status === 2 ? 'text-success text-uppercase' : ''}
                ${props.user.status === 0 ? "text-sombra-main-3" : ""}
                ${props.user.status === 1 ? "text-secondary" : ""}
                ${props.user.status === 3 ? "text-warning" : ""}`
             }>
                {props.user.status === 2 ? 'Admin' : ''}
                {props.user.status === 0 ? "Comprador ocasional" : ""}
                {props.user.status === 1 ? "Comprador recurrente" : ""}
                {props.user.status === 3 ? "Comprador vip" : ""}
            </td>
        </tr>
    );
}
