import React, { useEffect, useState } from "react";
import { urlbase } from '../../services/getInfoPage'
import { addFavourite, addToCart, closeSubMenues } from '../../services'
import { generaldataproductcard } from "../../datacomponents/home";

// Components.
import Slidercard from "./Slidercard";

export default function Detail(props) {

    const [ datamessage, setDatamessage] = useState({
        users_id: props.user ? props.user.user.id : '',
        to_id: 1,
        products_id: props.products_id ? props.products_id : '',
        from_name: props.user ? `${props.user.user.first_name} ${props.user.user.last_name}` : '',
        to_name:'ADMIN',
        product_link: props.user ? `/page/${props.product.category_id}/${props.product.id}` : ''
    })
    const [ dataquantity, setDataquantity ] = useState({
        user: props.user ? props.user.user : '',
        id: props.product.id,
        quantity: ['0']
    })
    const [ quantitywidth, setQuantitywidth ] = useState(100)
    const [ views, setViews ] = useState({})

    const amountofunit = Array.from({length: props.product.stock}, () => {return 'something'} );

    useEffect(() => {
        window.scrollTo(0,75)

        if(props.views) setViews(props.views);

        countViewOfProduct();
    },[])

    useEffect(() => {
        setViews(props.views);
    },[props.views])

    useEffect(() => {
        const getquantitywidth = document.querySelector('.info .quantity');
        if(getquantitywidth) setQuantitywidth(getquantitywidth.clientWidth);
    },[props.width])

    const countViewOfProduct = async () => {
        let newviews;

        if(props.views){
            newviews = {
                products_id: props.product.id,
                numero: props.views.numero + 1
            }
        } else {
            newviews = {
                products_id: props.product.id,
                numero: 1
            }
        }

        const request = await fetch(urlbase + `/api/product/views?id=${newviews.products_id}&view=${newviews.numero}`);
        const response = await request.json();

        props.setProducts({...props.products, views: response.data})
        console.log(response)
    }

    const writeMessage = (e) => {
        const writemessage = document.querySelector('.writemessage');

        if(writemessage.childNodes[3]){
            writemessage.childNodes[1].classList.remove('border-danger');
            writemessage.removeChild(writemessage.childNodes[2]);
        }

        setDatamessage({ ...datamessage , [e.target.name]: e.target.value })
    }

    const submitMessage = async () => {

        if(datamessage.content && datamessage.content !== ''){
            const token = localStorage.getItem('token');

            datamessage.token = token;

            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datamessage),
            };

            const request = await fetch(urlbase + '/api/apiUsers/messages', options);
            const response = await request.json();

            if(!response.error){
                props.setProducts({...props.products, messages: [ ...props.products.messages, response.data ]})
            }

            console.log(response)
        } else {
            const writemessage = document.querySelector('.writemessage');

            if(writemessage.childNodes.length === 3){
                const error = document.createElement('p');

                error.classList.add('error','text-danger', 'text-center','w-100');
                error.innerHTML = 'No hay mensaje. !';

                writemessage.insertBefore(error,writemessage.childNodes[2]);
                writemessage.childNodes[1].classList.add('border-danger');
            }

        }
    }

    const handlerQuantity = (e) => {
        const quantity = document.querySelector('.card-detail .quantity');
        const token = localStorage.getItem('token');

        if(quantity.childNodes[2]) quantity.removeChild(quantity.childNodes[2]);

        setDataquantity({...dataquantity, token: token, quantity: [e.target.value]});

        toggleSubmenuQuantity(e);
        toggleIcon();
    }

    const submitQuantity = async () => {

        const error = document.createElement('p');
        error.classList.add('error','text-danger', 'text-center','w-100');
        error.innerHTML = 'Debe elegir la cantidad.';

        if(dataquantity.quantity[0] === '0'){
            const quantity = document.querySelector('.card-detail .quantity');

            if(!quantity.childNodes[2]){
                quantity.appendChild(error)
            }

        } else {

            if(!props.user){
                window.scrollTo(0,0);

                document.querySelector("body").classList.toggle("overflow-hidden");
                document.querySelector(".signup").classList.replace("d-none","d-flex");

                localStorage.setItem('userwantedbuyproduct',`${window.location.pathname}`);
            } else {
                const options = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dataquantity),
                };

                const request = await fetch(urlbase + '/api/product/generatepreference', options);
                const response = await request.json();

                console.log(response)
                window.location.href = response.data.redirect;
            }
        }

    }

    const toggleIcon = () => {
        const icon = document.querySelector('.detail .quantity i')

        icon.className.includes('up')
            ? icon.classList.replace('fa-chevron-up','fa-chevron-down')
            : icon.classList.replace('fa-chevron-down','fa-chevron-up');
    }

    const toggleSubmenuQuantity = (e) => {
        document.getElementById(e.target.attributes.dataid.value).classList.toggle('d-none');
    }

    const handlerSubmenuQuantity = (e) => {
        toggleSubmenuQuantity(e);
        toggleIcon();
    }

    const onMouseLeaveQuantity = (e) => {
        toggleSubmenuQuantity(e);
        toggleIcon();
    }

    const toggleMorethanfiveQuantity = (e) => {
        const input = document.getElementById(e.target.attributes.datamorequantity.value);

        input.classList.toggle('d-none');
    }

    const hidesubmenuselects = (e) => {
        const submenu_select = document.getElementById('quantity');

        if(!submenu_select.className.includes('d-none') && !['BUTTON','I'].includes(e.target.tagName)){
            submenu_select.classList.toggle('d-none');
            toggleIcon();
        }
    }

    const datacardrelatedproducts = {
        ...generaldataproductcard,
        cardID: 'relatedproducts',
        products: props.relatedproducts,
        containercarousel: {
            classname: "relatedproducts border-top border-bottom px-0 px-md-5",
            style: { margin: "50px 0" }
        },
        title: {
            classname: "col-12 h5 text-capitalize text-left bg-main-contrast-4 my-5 p-0",
            content: "Productos relacionados"
        }
    };

    datacardrelatedproducts.carouselprovider.totalslides = props.relatedproducts ? props.relatedproducts.length : 0;
    datacardrelatedproducts.carouselprovider.visibleslides = props.width / 300;

    return (
        <section
            className="container-fluid detail bg-color-main py-5"
            onClick={(e) => { closeSubMenues(); hidesubmenuselects(e); }}
        >
            <div className="marca mb-4 col-11 col-md-10 mx-auto">
                <p className='display-2 text-capitalize position-absolute bg-main-contrast-3'
                    style={{
                        top: `${props.width < 768 ? '-33px' : '-55px'}`,
                        left: `${props.width < 768 ? '18px' : '30px'}`,
                        textShadow: '1px 1px 3px black',
                        fontSize: `${props.width < 768 ? '66px' : ''}`
                    }}
                >
                    {props.product.marca}
                </p>
            </div>

            <div className='col-11 col-md-10 p-0 d-flex flex-column justify-content-between flex-wrap mx-auto'>

                <article className="card-detail d-flex flex-column flex-md-row col-12 p-0">
                    <div className="image col-12 col-md-7 py-4 border bg-white d-flex justify-content-center align-items-center">
                        <img
                            style={{
                                minHeight: `${props.width < 768 ? '250px' : '450px'}`,
                                maxHeight: `${props.width < 768 ? '250px' : '450px'}`,
                                maxWidth: '100%',
                                filter: 'drop-shadow(3px 3px 5px black'
                            }}
                            src={`${urlbase}/images/${props.product.image}`}
                            alt={`${props.product.name}`}
                        />
                    </div>

                    <div className="info col-12 col-md-5 p-3 d-flex flex-column border bg-white"
                        style={{ minHeight: '30vh' }}
                    >

                        <div className="title d-flex">
                            <p className='name col-9 p-0 h5 mb-4'>
                                {props.product.name}
                            </p>
                            <p className="vistas col-2 p-0 bg-main-contrast-4">
                                {
                                    views && views.numero > 0
                                        ? <React.Fragment>
                                            <i className='fas fa-eye'></i>
                                            {views.numero}
                                        </React.Fragment>
                                        : ''
                                }
                            </p>
                            <i className="far fa-heart col-1 px-0 pt-1 text-right text-danger"
                                dataid={`.card${props.product.id} .fa-heart`}
                                id={`.card${props.product.id} .fa-heart`}
                                onClick={(e) => addFavourite(e)}
                            >
                            </i>
                        </div>

                        <div className='price'>
                            {
                                props.product.discount > 0
                                    ? <React.Fragment>

                                        <div className="without-discount">
                                            <p className='without-discount text-danger mb-0'>
                                                antes <del>$ {props.product.price}</del>
                                            </p>
                                        </div>

                                        <div className="with-discount d-flex">
                                            <p className='price h2 m-0 mr-2'>
                                                $ {
                                                (props.product.price - ((props.product.price * props.product.discount) / 100)).toFixed(2)
                                                }
                                            </p>
                                            <p className='discount text-success align-self-start m-0'>
                                                {props.product.discount} % OFF
                                            </p>
                                        </div>
                                    </React.Fragment>
                                    : <p className='without-discount h2 mb-1'>
                                        $ {props.product.price}
                                    </p>
                            }
                        </div>

                        {
                            props.productinpromotion
                                ? <div className="productinpromotion">
                                    <p className='text-muted mb-0'>
                                        12 cuotas sin interes con todas las tarjetas
                                    </p>
                                    <img src={`${urlbase}/images/Mastercard-32.png`} alt="Mastercard-32"/>
                                    <img src={`${urlbase}/images/Visa-32.png`} alt="Visa-32"/>
                                    <img src={`${urlbase}/images/Amex-32.png`} alt="Amex-32"/>
                                    <img src={`${urlbase}/images/Discover-32.png`} alt="Discover-32"/>
                                </div>
                                : ''
                        }

                        <p className="stock text-muted mt-2 mb-4">
                            stock : {props.product.stock} ( unidades )
                        </p>

                        {
                            props.product.discount > 0
                                ? <p className={`send text-center text-light bg-success rounded pb-1 mb-4`}
                                    style={{fontSize: '0.8rem', width: '99px'}}
                                >
                                    envio gratis
                                </p>
                                : ''
                        }

                        <div className={`quantity submenu-select ${
                                props.width < 768 ? 'w-100' : props.width < 1040 ? 'w-75' : 'w-50'
                            } d-flex flex-column overflow-hidden`}
                        >
                            <button
                                className='rm-btn border text-lowercase bg-color-main py-0 position-relative'
                                onClick={handlerSubmenuQuantity}
                                dataid='quantity'
                            >
                                Elige la cantidad
                                <i className="fa fa-chevron-up ml-3" dataid='quantity'></i>
                            </button>
                            <div
                                className="options w-100 d-none position-absolute bg-color-main rounded text-center shadow-sm"
                                id='quantity'
                                style={{
                                    zIndex: '1',
                                    margin: '26px 0',
                                    maxWidth: `${quantitywidth}px`
                                }}
                                dataid='quantity'
                                onMouseLeave={onMouseLeaveQuantity}
                            >
                                {
                                    amountofunit.map( (number, i) => {
                                        return (
                                            i < 5
                                                ? <option
                                                    key={i}
                                                    value={i+1}
                                                    className={
                                                        `mb-0 py-2 ${`${i+1}` === dataquantity.quantity[0] ? ' border rounded bg-white' : ''}`
                                                    }
                                                    dataid='quantity'
                                                    onMouseOver={(e) => e.target.classList.value = 'mb-0 py-2 border rounded bg-white pointer'}
                                                    onMouseOut={(e) => {
                                                        if(!e.target.attributes.selected) e.target.classList.value = 'mb-0 py-2'
                                                    }}
                                                    onClick={handlerQuantity}
                                                    selected={`${i+1}` === dataquantity.quantity[0] ? true : false}
                                                >
                                                    {i + 1} {i === 0 ? 'Unidad' : 'Unidades'}
                                                </option>
                                                : ''
                                            )
                                    })
                                }
                                <div className={`morethanfive ${amountofunit.length > 5 ? '' : 'd-none'}`}>
                                    <option
                                        className='mb-0 py-2'
                                        onMouseOver={(e) => e.target.classList.value = 'mb-0 py-2 border rounded bg-white pointer'}
                                        onMouseOut={(e) => e.target.classList.value = 'mb-0 py-2'}
                                        onClick={toggleMorethanfiveQuantity}
                                        datamorequantity='morethanfive'
                                        dataid='quantity'
                                        selected={Number(dataquantity.quantity[0]) > 5 ? true : false}
                                    >
                                        Mas de 5 unidades
                                    </option>
                                    <input
                                        id='morethanfive'
                                        dataid='quantity'
                                        className='d-none w-100 py-1 border-top border-left border-right rounded-bottom text-center'
                                        type="number"
                                        name="quantity"
                                        onChange={handlerQuantity}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="buttons" style={{minHeight: '126px', maxHeight: '126px'}}>
                            <button
                                className='rm-btn rm-orange w-100 mt-5 mb-2 text-capitalize'
                                onClick={submitQuantity}
                            >
                                comprar ahora
                            </button>
                            <button
                                className='rm-btn-outline rm-orange w-100 text-capitalize'
                                dataid='card-detail'
                                onClick={(e) => addToCart(e,props.user,props.items,props.setItems,props.product)}
                            >
                                agregar a carrito
                            </button>
                        </div>
                    </div>
                </article>

                <div className="description my-4 col-12 p-0">
                    <h5 className='bg-main-contrast-4 pb-2 mb-3 border-bottom'>
                        Descripcion
                    </h5>
                    <p className='px-3'>
                        {props.product.description}
                    </p>
                </div>

                <div className="col-12 p-0 messages">
                    <h5 className='bg-main-contrast-4 pb-2 mb-3 border-bottom'>
                        Mensajes
                    </h5>
                    {
                        props.messages.length
                            ? props.messages.map( (msg, i) => {
                                return (
                                    <div className={
                                        `singlemessage p-2 shadow-sm ${i%2 === 0 ? 'bg-main-sombra-3' : 'bg-main-sombra-2'}`
                                    }>
                                        <div className="header d-flex">
                                            <p className='name font-weight-bold text-capitalize'>
                                                {msg.from_name}
                                            </p>
                                            <p className='date text-muted ml-5'>
                                                {msg.date}
                                            </p>
                                        </div>
                                        <div className='body'>
                                            <p className='content px-3'>
                                                {msg.content}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })
                            : <p className='text-center text-muted'>
                                No hay mensajes acerca de este producto!
                            </p>
                    }

                    {
                        props.user
                            ? <div className="writemessage col-12 p-0 my-4">
                                <label
                                    className='text-muted'
                                    htmlFor="content"
                                >
                                    Escriba aqui
                                </label>
                                <textarea
                                    id="content"
                                    className='col-12 border py-3'
                                    name="content"
                                    onChange={writeMessage}
                                />
                                <button
                                    className='rm-btn rm-orange w-25 mt-2'
                                    onClick={submitMessage}
                                >
                                    Enviar
                                </button>
                            </div>
                            : ''
                    }
                </div>

                <div className="relatedproducts col-12 p-0">
                    <Slidercard
                        key='relatedproducts'
                        datacard={datacardrelatedproducts}
                        items={props.items}
                        setItems={props.setItems}
                        user={props.user}
                    />
                </div>
            </div>
        </section>
    );
}
