import React from 'react';
import { Link } from "react-router-dom";
import { addFavourite, addToCart } from '../../services';
import { urlbase } from "../../services/getInfoPage";

export default function Card(props) {

    const product = props ? props.product : '';
    const datacard = props ? props.datacard : '';
    const user = props.user ? props.user.user : '';

    return (
        <article
            key={product.id}
            className={datacard.card.classname.card + ' card' + product.id}
            style={datacard.card.style}
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
                        height={datacard.card.classname.imageheight ? datacard.card.classname.imageheight : ''}
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
                <button
                    className={
                        datacard.card.classname.button.replace('rm-btn rm-orange','btn btn-outline-danger p-0')
                    }
                    onClick={(e) => {
                        addFavourite(e);
                        props.setFavourites([...props.favourites, e.target.attributes.dataProdcutid.value]);
                    }}
                    dataid={`.card${product.id} .fa-heart`}
                    dataProdcutid={product.id}
                >
                    <i className="far fa-heart m-1"
                        dataid={`.card${product.id} .fa-heart`}
                        id={`.card${product.id} .fa-heart`}
                        dataProdcutid={product.id}
                    >
                    </i>
                </button>
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
