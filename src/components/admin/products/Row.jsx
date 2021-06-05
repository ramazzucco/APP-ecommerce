import React from "react";
import { Link, useHistory } from "react-router-dom";
import { qS } from "../../../services";

export default function Row(props) {

    const history = useHistory();

    const handlerOnMouseOver = (selector) => {
        qS(selector).classList.add('d-flex');
    }

    const handlerOnMouseOut = (selector) => {
        qS(selector).classList.remove('d-flex');
    }

    const functionsRowId = {
        onMouseOver: () => {
            handlerOnMouseOver(`.admin-container .items-product #p${props.product.id} td.id .mytooltip`)
        },
        onMouseOut: () => {
            handlerOnMouseOut(`.admin-container .items-product #p${props.product.id} td.id .mytooltip`)
        }
    }

    const functionsRowCategory = {
        onMouseOver: () => {
            handlerOnMouseOver(`.admin-container .items-product #p${props.product.id} td.category .mytooltip`)
        },
        onMouseOut: () => {
            handlerOnMouseOut(`.admin-container .items-product #p${props.product.id} td.category .mytooltip`)
        }
    }

    const functionsRowName = {
        onClick: () => {
            qS('.products #modify-product').click();
            history.push(`/admin/productos/modificar/${props.product.id}`)
        },
        onMouseOver: () => {
            handlerOnMouseOver(`.admin-container .items-product #p${props.product.id} td.name .mytooltip`)
        },
        onMouseOut: () => {
            handlerOnMouseOut(`.admin-container .items-product #p${props.product.id} td.name .mytooltip`)
        }
    }

    return (
        <tr
            id={`p${props.product.id}`}
            className="text-metallic-seaweed text-lowercase"
            onDoubleClick={props.selectRow}
        >
            <td className="id">
                <span
                    className="mytooltip text-center"
                    data-title="Ir al detalle del producto"
                ></span>
                <Link
                    to={`/page/${props.product.category_id}/${props.product.id}`}
                    {...functionsRowId}
                >
                    {props.product.id}
                </Link>
            </td>
            <td className="category">
                <span
                    className="mytooltip text-center"
                    data-title="Ir a la categoria"
                ></span>
                <Link
                    to={`/page/${props.product.category.title}`}
                    {...functionsRowCategory}
                >
                    {props.product.category.title}
                </Link>
            </td>
            <td
                className="name text-break pointer"
                {...functionsRowName}
            >
                <span
                    className="mytooltip text-center"
                    data-title="Ir a modificar producto"
                ></span>
                {props.product.name}
            </td>
            <td>{props.product.marca}</td>
            <td>$ {props.product.price}</td>
            <td>{props.product.discount > 0 ? props.product.discount + " %" : "s/d"}</td>
            <td>{props.product.stock}</td>
            <td>
                <i
                    className="fas fa-trash-alt text-danger"
                    onClick={props.showModal}
                    dataProduct={JSON.stringify(props.product)}
                ></i>
            </td>
        </tr>
    );
}
