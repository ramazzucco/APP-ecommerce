import React from 'react'
import { Route } from 'react-router';

// Components.
import Items from './Items';
import User from './User';

export default function Users(props) {
    return (
        <div className='users col-12 p-0'>
            <Route exact path='/admin/usuarios'>
                <Items
                    users={props.users}
                    products={props.products}
                    setProducts={props.setProducts}
                />
            </Route>
            <Route exact path='/admin/usuarios/:id/:incommingmessage?'>
                <User
                    users={props.users}
                    admin={props.admin}
                    messages={props.messages}
                    setMessages={props.setMessages}
                />
            </Route>
        </div>
    )
}
