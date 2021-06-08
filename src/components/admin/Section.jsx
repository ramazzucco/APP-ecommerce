import React, { useEffect, useState } from 'react';
import { Route } from 'react-router';

// Components.
import Header from './Header';
import Widgets from './home/Widgets';
import Lastproduct from './home/Lastproduct';
import Categories from './home/Categories';
import Views from './home/Views';
// import Users from './Home/Users';
import Users from './users/Users';
import Products from './products/Products';
import Messages from './home/Messages';

export default function Section(props) {

    const [ categories, setCategories ] = useState([])

    useEffect(() => {
        const categorys = props.categories.map( category => {
            return {
                id: category.category.id,
                title: category.category.title,
            }
        })
        setCategories(categorys);
    },[props.categories])

    return (
        <div className="main col-12 d-flex flex-column">
            <Header
                admin={props.admin}
                users={props.users}
                products={props.products}
                activelink={props.activelink}
                setActivelink={props.setActivelink}
                incommingmessages={props.incommingmessages}
            />
            <hr className='text-center bg-champagne-contrast m-0 w-100' />
            <Route exact path='/admin'>
                <div className="home d-flex flex-wrap">

                    <div className='products col-12 col-lg-9 pr-0 mt-3 d-flex flex-wrap align-items-start justify-content-between'>
                        <Widgets widgets={props.widgets} />
                        <Categories categories={props.categories} />

                        <div className='col-12 col-md-7 p-0 mt-3'>
                            <Views views={props.views} />
                        </div>

                        <div className='col-12 col-md-4 p-0 mt-3'>
                            <Lastproduct lastproduct={props.lastproduct} />
                        </div>
                    </div>

                    <div className="users col-12 col-md-7 col-lg-3 pr-0 mt-3 d-flex align-items-start">
                        <Messages
                            users={props.users}
                            incommingmessages={props.incommingmessages}
                            getData={props.getData}
                            setMessages={props.setMessages}
                            setActivelink={props.setActivelink}
                            setIncommingmessages={props.setIncommingmessages}
                        />
                    </div>
                </div>
            </Route>
            <Route path='/admin/productos'>
                <Products
                    products={props.products}
                    setProducts={props.setProducts}
                    categories={categories}
                />
            </Route>
            <Route path='/admin/usuarios'>
                <Users
                    admin={props.admin}
                    users={props.users}
                    products={props.products}
                    setProducts={props.setProducts}
                    categories={categories}
                    messages={props.messages}
                    setMessages={props.setMessages}
                />
            </Route>
        </div>
    )
}
