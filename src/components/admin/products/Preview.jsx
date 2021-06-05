import React from "react";
import { urlbase } from "../../../services/getInfoPage";

export default function Preview(props) {

    const handlerOnMouseOver = () => {
        document.querySelector(`.add-product .product-preview .info .name`).classList.remove('text-truncate')
    }

    const handlerOnMouseOut = () => {
        document.querySelector(`.add-product .product-preview .info .name`).classList.add('text-truncate')
    }

    return (
        <div className="product-preview d-none d-md-flex justify-content-center flex-wrap col-4 mt-4 border-metallic-seaweed rounded h-75 px-0 py-2 p-lg-4">
            <h3 className="text-center text-metallic-seaweed mb-3">
                Vista previa
            </h3>
            <div
                className="col-10 py-3 d-flex justify-content-between align-items-center card position-relative mx-auto"
                style={{ width: "275px", minHeight: "400px" }}
                onMouseOver={handlerOnMouseOver}
                onMouseOut={handlerOnMouseOut}
            >
                <div
                    className="d-flex flex-column justify-content-start pt-3"
                    style={{ minWidth: "150px", maxWidth: "150px" }}
                >
                    <div className="image d-flex justify-content-center">
                        <img
                            src={
                                props.datapost.image
                                    ? props.datapost.image
                                    : `${urlbase}/images/sin_imagen.jpg`
                            }
                            alt="preview del nuevo producto"
                            width="90%"
                        />
                    </div>
                    <div className="info w-100 d-flex flex-wrap justify-content-center align-items-center text-sombra-main-2">
                        <p className="name w-100 text-center text-truncate">
                            {props.datapost.name}
                        </p>
                        <p className="h5 mb-0">
                            {props.datapost.price ? "$ " + props.datapost.price : ""}
                        </p>
                        <p className="mb-0 ml-3">
                            {props.datapost.discount > 0
                                ? props.datapost.discount + " %"
                                : ""}
                        </p>
                    </div>
                </div>
                <div
                    className="w-100 d-flex p-2"
                    style={{ position: "absolute", top: "0", left: "0" }}
                >
                    <i className="far fa-heart ml-auto text-danger pointer"></i>
                </div>
                <div className="buy w-100 text-center p-2">
                    <button className="w-100 rm-btn rm-orange mt-1 outline">
                        <i className="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}
