import React from 'react';
import { Link } from "react-router-dom";
import { addFavourite, addToCart } from '../../services';
import { urlbase } from "../../services/getInfoPage";

export default function Card(props) {

    const product = props ? props.product : '';
    const datacard = props ? props.datacard : '';
    const user = props.user ? props.user.user : '';

    const handlerOnMouseOver = (e, Pid, CardId) => {
        document.querySelector(`.${CardId} .card${Pid} .info .name`).classList.remove('text-truncate')
    }

    const handlerOnMouseOut = (e, Pid, CardId) => {
        document.querySelector(`.${CardId} .card${Pid} .info .name`).classList.add('text-truncate')
    }

    return (
        <article
            key={product.id}
            className={datacard.card.classname.card + ' card' + product.id}
            style={datacard.card.style}
            onMouseOver={(e) => handlerOnMouseOver(e,product.id,datacard.cardID)}
            onMouseOut={(e) => handlerOnMouseOut(e,product.id,datacard.cardID)}
        >
            <Link
                to={`/page/${product.category_id}/${product.id}`}
                className={datacard.card.classname.linkbutton}
                style={datacard.card.stylelink ? datacard.card.stylelink : {}}
            >
                <div className={datacard.card.classname.image}>
                    <img
                        src={urlbase + `/images/${product.image}`}
                        alt={product.name}
                        width={datacard.card.classname.imagewidth}
                    />
                </div>
                <div className={datacard.card.classname.info}>
                    <p className={datacard.card.classname.infoName}>
                        {product.name}
                    </p>
                    <p className={datacard.card.classname.infoPrice}>
                        $ {product.price}
                    </p>
                    <p className={datacard.card.classname.infoDiscount}>
                        {
                            product.discount > 0
                                ? product.discount + " %"
                                : ""
                        }
                    </p>
                </div>
            </Link>
            <div className={datacard.card.classname.divButtons}>
                <div
                    className={ datacard.card.classname.diviconfavourite}
                    style={datacard.card.stylediviconfavourite}
                >
                    <i className="far fa-heart ml-auto text-danger pointer"
                        id={product.id}
                        dataid={product.id}
                        onClick={(e) => {
                            addFavourite(e);
                            e.target.classList.value.includes('text-danger')
                                ? e.target.classList.value.replace('text','bg')
                                : e.target.classList.value.replace('bg','text');
                        }}
                    >
                    </i>
                </div>
                <button
                    dataid={datacard.cardID ? datacard.cardID : ''}
                    className={datacard.card.classname.button}
                    onClick={(e) => addToCart(e,user,props.items,props.setItems,product)}
                >
                    <i className="fas fa-shopping-cart" dataid={datacard.cardID ? datacard.cardID : ''}></i>
                </button>
            </div>
        </article>
    )
}
