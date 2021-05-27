import React, { useState, useEffect, useCallback } from 'react'
import { Route, Redirect } from "react-router-dom";
import { urlbase } from "../services/getInfoPage";
import { responsiveHideSubmenues, saveUserPreference, getFavourite } from "../services/index";

// Components.
import Index from "./Index";
import Admin from "./Admin";

export default function Main(props) {

    const [ user, setUser ] = useState(null)
    const [ admin, setAdmin ] = useState(null)
    const [ items, setItems ] = useState(0)
    const [ style, setStyle ] = useState("styledefault")
    const [ width, setWidth ] = useState(0)
    const [ products, setProducts ] = useState([])
    const [ path, setPath ] = useState(window.location.pathname)

    const getProducts = async () => {
        const request = await fetch(urlbase + "/api/product/");
        const response = await request.json();

        if(response){
            setProducts(response.data)
        }
    }

    const getSession = async () => {
        const token = localStorage.getItem("token");

        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({token: token}),
        };

        const getsession = await fetch(urlbase + "/api/apiUsers/session", options);
        const session = await getsession.json();

        if(!session.error){
            setUser(session.data);

            // Si hay guardadas sesiones con informacion.
            if(session.data.user.session){
                if(session.data.user.datasession.cantitems > 0){
                    const cart = document.querySelector('.submenu.cart .content');

                    setItems(session.data.user.datasession.cantitems);

                    cart.innerHTML = session.data.user.datasession.items;
                }

                if(session.data.user.datasession.favourite.length){
                    session.data.user.datasession.favourite.map( fId => {
                        const cards = document.querySelectorAll(`.card${fId} .fa-heart`);

                        if(cards){
                           cards.forEach( card => {
                               card.classList.replace('far','fas');
                           })
                        }
                        return 'done';
                    })
                }
            }
        }

        // Cuando crean una cuenta despues de haber querido comprar un producto sin ser usuario.
        const userwantedbuyproduct = localStorage.getItem('userwantedbuyproduct');

        if(userwantedbuyproduct && window.location.pathname !== userwantedbuyproduct){
            window.location.pathname = userwantedbuyproduct;
        }
    }

    const getCartItems = useCallback(() => {

        const cart = document.querySelector('.submenu.cart .content');
        const cartuser = JSON.parse(localStorage.getItem('cart'));

        if(cart && cartuser && cartuser.items !== ''){
            if(user && cartuser.user.id === user.user.id) cart.innerHTML = cartuser.items;
            setItems(cartuser.cantitems);
        }

    },[user])

    const deleteItem = useCallback(() => {
        const closeicon = document.querySelectorAll('.submenu.cart .content .fa-window-close');
        let cartuser = JSON.parse(localStorage.getItem('cart'));

        closeicon.forEach( icon => {

            icon.onclick = (e) => {
                console.log(e.target.parentNode.outerHTML,'localStorage: ',cartuser.items)

                cartuser = {
                    user: cartuser.user,
                    cantitems: items - 1,
                    items: cartuser.items.replace(e.target.parentNode.outerHTML, '')
                };

                setItems(items - 1);

                if(items - 1 === 0){
                    e.target.parentNode.outerHTML = '';
                    localStorage.removeItem('cart')
                } else {
                    e.target.parentNode.outerHTML = cartuser.items;
                    localStorage.setItem('cart', JSON.stringify(cartuser))
                }
            }

        })
    }, [items])

    useEffect(() => {
        if(window.location.pathname === "/") window.location.pathname = "/page";

        getProducts();
    },[])

    useEffect(() => {
        if(!user) getSession();

        if(user){
            getCartItems();
            deleteItem();
            if(user.user.session){
                saveUserPreference();
            }
        }
    },[user, getCartItems, deleteItem])

    useEffect(() => {
        if(products && path === '/page' && user) getFavourite();
    },[products, path, user])

    useEffect(() => {
        setWidth(document.getElementById("root").clientWidth)
        window.onresize = () => {
            setWidth(document.getElementById("root").clientWidth)
        }
        responsiveHideSubmenues(width);
    },[width])

    useEffect(() => {
        const remembertheme = localStorage.getItem("theme");
        const currentTheme = document.getElementById("root").className;

        if(remembertheme && remembertheme !== currentTheme){
            document.getElementById("root").classList.replace(currentTheme,remembertheme);
            setStyle(remembertheme);
        }
    },[style])

    useEffect(() => {
        getCartItems();
        deleteItem();
    },[items, getCartItems, deleteItem])

    useEffect(() => {
        if(user) getFavourite();
    },[path, user])

    useEffect(() => {
        if(user && user.user.status === 2) setAdmin(user.user);
    },[user])

    return (
        <React.Fragment>
            <Route path="/page">
                <Index
                    user={user}
                    setUser={setUser}
                    admin={admin}
                    setAdmin={setAdmin}
                    style={style}
                    width={width}
                    products={products}
                    setProducts={setProducts}
                    items={items}
                    setItems={setItems}
                    path={path}
                    setPath={setPath}
                />
            </Route>
            <Route path="/admin">
                {
                    user && user.user.status === 2
                        ? <Admin
                            user={user}
                            setUser={setUser}
                            setAdmin={setAdmin}
                            messages={products.messages}
                            products={products}
                            width={width}
                        />
                        : <Redirect to='/page' />
                }
            </Route>
        </React.Fragment>
    )
}
