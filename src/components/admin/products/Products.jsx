import React, { useEffect, useState } from 'react'

// Components.
import Items from './Items'
import Add from './Add';
import Modify from './Modify';
import { Route, useHistory } from 'react-router';

export default function Products(props) {

    const [ buttonactive, setButtonactive ] = useState('Lista')

    const history = useHistory();

    useEffect(() => {
        if(window.location.pathname.includes('modificar')) setButtonactive('Modificar');
    },[])

    const buttons = [
        {
            id: 'items-product',
            title: 'Lista',
            path: '/admin/productos'
        },
        {
            id: 'add-product',
            title: 'Agregar',
            path: '/admin/productos/agregar'
        },
        {
            id: 'modify-product',
            title: 'Modificar',
            path: '/admin/productos/modificar'
        }
    ]

    return (
        <div className='products col-12 p-0 mt-3'>
            <header className='d-flex col-12 p-3 mb-4 bg-metallic-seaweed rounded'>
                {
                    buttons.map( (button, i) => {
                        return (
                            <button
                                key={i}
                                id={button.id}
                                className={`bg-transparent mx-3
                                    ${buttonactive === button.title ? 'active' : ''}`
                                }
                                onClick={() => {
                                    history.push(button.path);
                                    setButtonactive(button.title)
                                }}
                                onMouseOver={(e) => e.target.classList.add('hover')}
                                onMouseOut={(e) => e.target.classList.remove('hover')}
                            >
                                {button.title}
                            </button>
                        )
                    })
                }
            </header>
            <Route exact path='/admin/productos'>
                <Items
                    key={'products'}
                    products={props.products}
                    setProducts={props.setProducts}
                />
            </Route>
            <Route path='/admin/productos/agregar'>
                <Add
                    products={props.products}
                    setProducts={props.setProducts}
                    categories={props.categories}
                />
            </Route>
            <Route exact path='/admin/productos/modificar'>
                <Modify
                    products={props.products}
                    setProducts={props.setProducts}
                    categories={props.categories}
                />
            </Route>
            <Route path='/admin/productos/modificar/:id'>
                <Modify
                    products={props.products}
                    setProducts={props.setProducts}
                    categories={props.categories}
                />
            </Route>
        </div>
    )
}
