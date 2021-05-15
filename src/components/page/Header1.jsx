import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { hidesubmenues, handlersubmenu, toggleIcon } from "../../services";
import { urlbase } from "../../services/getInfoPage";

// Compenents.
import Button from "../Button";
import Links from "./Links";

export default function Header1(props) {

    const [ datasearch, setDatasearch ] = useState('')
    const [ moveOptions, setMoveOptions ] = useState(0)
    const [ divwidthofusername, setDivwidthofusername ] = useState(0)

    const header = props.styleheader;

    useEffect(() => {
        if(props.user){
            setDivwidthofusername(document.querySelector('.usersheader .username').clientWidth)
        }
    },[props])

    const submitSearch = (data) => {
        props.products.forEach( product => {
            if(product.name.toLowerCase().includes(data.toLowerCase()) || product.name === data){
                window.location.pathname = `/page/${product.category_id}/${product.id}`
            }

        });
    }

    const handlerOnKeyDownSearch = (e) => {

        setMoveOptions(0);

        if(e.keyCode === 13){
            if(datasearch !== ''){
                const options = document.querySelectorAll('#listsearch p');
                let selectwhitharrowkey;

                options.forEach( option => {

                    if(option.className.includes('bg-main-sombra-2')){
                        submitSearch(option.innerHTML);
                        selectwhitharrowkey = true;
                    }

                })

                if(!selectwhitharrowkey) submitSearch(datasearch);
            }
        }

        if(e.keyCode === 40){
            const options = document.querySelectorAll('#listsearch p');
            let moveoptionposition;

            moveOptions === 0
                ? moveoptionposition = 1
                : moveoptionposition = moveOptions;

            if(moveoptionposition < options.length) setMoveOptions(moveOptions + 1);

            options.forEach( (option, i) => {
                if(i+1 === moveoptionposition){
                    option.classList.add('bg-main-sombra-2');
                } else {
                    if(option.className.includes('bg-main-sombra-2')){
                        option.classList.remove('bg-main-sombra-2');
                    }
                }
            })
        }

        if(e.keyCode === 38){
            const options = document.querySelectorAll('#listsearch p');
            let moveoptionposition;

            moveOptions === options.length
                ? moveoptionposition = options.length
                : moveoptionposition = moveOptions;

            if(moveoptionposition > 0) setMoveOptions(moveOptions - 1);

            options.forEach( (option, i) => {
                if(i+1 === moveoptionposition){
                    option.classList.add('bg-main-sombra-2');
                } else {
                    if(option.className.includes('bg-main-sombra-2')){
                        option.classList.remove('bg-main-sombra-2');
                    }
                }
            })
        }
    }

    return (
        <React.Fragment>
            <div className={header.brand.div}>
                <img
                    id="brand"
                    src="http://localhost:3000/images/logo.png"
                    alt="logo de la marca"
                    width="66px"
                    className=""
                />
            </div>
            <div className={header.buttonmenudiv}>
                <Button {...props.buttonmenu} />
            </div>
            <div className={header.classnav}>
                <div className={header.search.div}>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        className={header.search.input}
                        onChange={(e) => setDatasearch(e.target.value)}
                        onKeyDown={handlerOnKeyDownSearch}
                    />
                    <div
                        id='listsearch'
                        className={`w-100 bg-white position-absolute ${datasearch === '' ? 'd-none' : ''}`}
                    >
                        {
                            props.products
                                ? props.products.map( (product, i) => {
                                    if(product.name.toLowerCase().includes(datasearch.toLowerCase()) && datasearch !== ''){

                                        const pathname = `/page/${product.category_id}/${product.id}`;

                                        return (
                                            <p
                                                key={i}
                                                className='text-naranja rounded-lg pl-3 py-1 pointer mb-0'
                                                onClick={() => window.location.pathname = pathname}
                                            >
                                                {product.name}
                                            </p>
                                        )
                                    }
                                })
                                : ''
                        }
                    </div>
                    <label htmlFor="search" className={header.search.label}>
                        <i className="fas fa-search" onClick={() => submitSearch(datasearch)}></i>
                    </label>
                </div>
                <Links
                    data={header.links}
                    width={props.width}
                />
            </div>
            <div className={header.usersbuttons.avatar.div}>
                {!props.user ? (
                    header.usersbuttons.data.map((button, i) => {
                        return <Button {...button} key={i} />
                    }))
                    : (
                        <React.Fragment>
                            <div className="iconsusersheader col-12 text-center text-md-right text-color-main">
                                <p className="cantitems m-0 position-absolute rounded-circle bg-naranja">
                                    {props.items === 0 ? '' : props.items}
                                </p>
                                <Link to={`${props.width > 768 ? window.location.pathname : '/page/cart'}`}>
                                    <i
                                        className={`fas fa-shopping-cart ${props.width < 768 ? "fa-2x" : ""}`}
                                        onMouseOver={
                                            props.width < 768
                                                ? () => {}
                                                : () => handlersubmenu("cart", props.width)
                                        }
                                    ></i>
                                </Link>
                                <i
                                    className={`fas fa-bell ml-3 ${props.width < 768 ? "fa-2x" : ""}`}
                                    onMouseOver={() => handlersubmenu("bell", props.width)}
                                ></i>
                            </div>
                            <Link to={props.avatar.link} className={header.usersbuttons.avatar.img}>
                                <div
                                    className='image rounded-circle'
                                    style={{maxWidth: '27px',maxHeight: '27px',overflow: 'hidden'}}
                                >
                                    <img
                                        src={ urlbase[0] + `/images/avatars/${props.user ? props.user.avatar : ""}`}
                                        alt="foto de usuario"
                                        width="100%"
                                        submenu="true"
                                        style={{objectFit: 'contain'}}
                                        onClick={ () => handlersubmenu("avatar", props.width) }
                                    />
                                </div>
                            </Link>
                            <p className={header.usersbuttons.avatar.p}>
                                bienvenido { props.user.status < 2 ? props.user.first_name : `Admin ${props.user.first_name}`} !
                            </p>
                        </React.Fragment>
                    )
                }
            </div>
            <div
                className={header.submenuheader.div}
                onMouseLeave={(e)=> {
                    hidesubmenues(e);
                    toggleIcon('#Categories i','up','fa-chevron-up','fa-chevron-down');
                }}
            >
                {
                    props.categories.map( (category, i) => {
                        return (
                            <Link
                                key={i}
                                to={category.path}
                                className={category.className}
                                onClick={category.onclick}
                            >
                                {category.title}
                            </Link>
                        )
                    })
                }
            </div>
            <div
                className={header.submenuavatar.div}
                onMouseLeave={(e)=> { hidesubmenues(e) }}
                style={{right: divwidthofusername === 0 ? 11 + 'px' : divwidthofusername + 'px'}}
            >
                {
                    props.myprofile.map( (link, i) => {
                        return (
                            <Link
                                key={i}
                                to={link.link}
                                className={link.className}
                                onClick={link.onClick ? link.onClick : () => {}}
                            >
                                {link.title}
                            </Link>
                        )
                    })
                }
            </div>
            <div
                className={header.submenucart.classname.div}
                onMouseLeave={(e)=> { hidesubmenues(e) }}
            >
                <div className={header.submenucart.classname.content.div}></div>
                <div className={header.submenucart.classname.buttons.div}>
                    <button
                        type='button'
                        className={header.submenucart.classname.buttons.clear}
                        onMouseOver={(e) => e.target.classList.add('text-white')}
                        onMouseOut={(e) => e.target.classList.remove('text-white')}
                        onClick={() => {
                            document.querySelector('.submenu.cart .content').innerHTML = `<p class='w-100 text-center text-light m-0'>
                                no hay items seleccionados!
                            </p>`;
                            localStorage.removeItem('cart');
                            props.setItems(0);
                        }}
                    >
                        Vaciar carrito
                    </button>
                    <button
                        type='button'
                        className={header.submenucart.classname.buttons.gocart}
                        onMouseOver={(e) => e.target.classList.add('text-white')}
                        onMouseOut={(e) => e.target.classList.remove('text-white')}
                    >
                        <Link to='/page/cart'>
                            Ir al carrito
                        </Link>
                    </button>
                </div>
            </div>
            <div
                className={header.submenubell.div}
                onMouseLeave={(e)=> { hidesubmenues(e) }}
            >
                <p className='m-0'>
                    No hay notificaciones!
                </p>
            </div>
        </React.Fragment>
    );
}
