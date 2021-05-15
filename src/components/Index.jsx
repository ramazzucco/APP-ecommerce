import React, { useState } from 'react'
import { Redirect, Route } from "react-router-dom";
import "../css/page.css"

// Components.
import Header from './page/Header';
import Home from './page/Home';
import Login from './page/Login';
import Signup from './page/Signup';
import Categories from './page/Categories';
import Footer from './page/Footer';
import Detail from './page/Detail';
import Cart from './page/Cart';
import About from './page/About';
import Contact from './page/Contact';
import Faq from './page/Faq';
import User from "./User";
import Modalinfo from './Modalinfo';
import Loadinginfo from './Loadinginfo';

export default function Index(props) {

    const [ dataPost, setDataPost ] = useState({});

    return (
        <div className="index">
            <Loadinginfo width={props.width} />
            <Modalinfo width={props.width} />
            <Login
                dataPost={dataPost}
                setDataPost={setDataPost}
                user={props.user}
                setUser={props.setUser}
                setToken={props.setToken}
                style={props.style}
                width={props.width}
            />
            <Signup
                dataPost={dataPost}
                setDataPost={setDataPost}
                setUser={props.setUser}
                style={props.style}
                width={props.width}
            />
            <Header
                user={props.user}
                setUser={props.setUser}
                admin={props.admin}
                setAdmin={props.setAdmin}
                style={props.style}
                width={props.width}
                items={props.items}
                setItems={props.setItems}
                products={props.products.allproducts}
            />
            <Route exact path="/page">
                <Home
                    user={props.user}
                    setUser={props.setUser}
                    products={props.products}
                    width={props.width}
                    items={props.items}
                    setItems={props.setItems}
                    path={props.path}
                    setPath={props.setPath}
                    favourites={props.favourites}
                    setFavourites={props.setFavourites}
                />
            </Route>
            {   // Categorias.
                props.products.categories
                    ? props.products.categories.map( category => {
                        return (
                            <Route path={`/page/${category.name}`}>
                                <Categories
                                    user={props.user}
                                    products={
                                        props.products.allproducts.filter( product => product.category_id === category.id )
                                    }
                                    items={props.items}
                                    setItems={props.setItems}
                                    width={props.width}
                                    path={props.path}
                                    setPath={props.setPath}
                                />
                            </Route>
                        )
                    })
                    : ""
            }
            {   // Detalle.
                props.products.allproducts
                    ? props.products.allproducts.map( product => {
                        return (
                            <Route path={`/page/${product.category_id}/${product.id}`}>
                                <Detail
                                    product={product}
                                    products={props.products}
                                    setProducts={props.setProducts}
                                    productinpromotion={
                                        props.products.promotions.filter(promo => promo.products_id === product.id)[0]
                                    }
                                    relatedproducts={
                                        props.products.allproducts.filter( prod => prod.category_id === product.category_id)
                                    }
                                    views={props.products.views.filter( view => view.products_id === product.id)[0]}
                                    user={props.user}
                                    setUser={props.setUser}
                                    items={props.items}
                                    setItems={props.setItems}
                                    width={props.width}
                                    messages={props.products.messages.filter( msg => msg.products_id === product.id)}
                                />
                            </Route>
                        )
                    })
                    : ''
            }
            <Route path='/page/cart'>
                {
                    props.user
                        ? <Cart user={props.user}/>
                        : <Redirect to='/page' />
                }
            </Route>
            <Route path='/page/aboutus'>
                <About width={props.width}/>
            </Route>
            <Route path='/page/contact'>
                <Contact width={props.width}/>
            </Route>
            <Route path='/page/faq'>
                <Faq width={props.width}/>
            </Route>
            <Route path="/page/users">
                {
                    props.user
                        ? <User
                            user={props.user}
                            setUser={props.setUser}
                            admin={props.admin}
                            favourites={props.favourites}
                            products={props.products.allproducts}
                        />
                        : <Redirect to='/page' />
                }
            </Route>
            <Footer />
        </div>
    )
}
