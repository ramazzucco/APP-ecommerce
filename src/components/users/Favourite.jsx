import React, { useEffect, useState } from 'react'
import { urlbase } from "../../services/getInfoPage";


export default function Favourite(props) {

    // const [ favouritesID, setFavouritesID ] = useState(props.favourites)
    const [ favouriteprod, setFavouriteprod ] = useState([])

    // useEffect(() => {
    //     setFavouritesID(props.favourites)
    // },[props.favourites])

    useEffect(() => {
        if(props.favourites.length){
            // favouritesID.map( id => {
            //     setFavouriteprod([...favouriteprod, props.products.filter(prod => `${prod.id}` === id)[0]])
            // })
            props.favourites.map( async id => {
                await props.products.map( prod => {
                    if(`${prod.id}` === id){
                        setFavouriteprod([...favouriteprod, prod])
                    }
                })
            })
            // props.products.map( async product => {
            //     await favouritesID.map( id => {
            //         if(`${product.id}` === id) setFavouriteprod([...favouriteprod, product])
            //     })
            // })
        }
    },[props.favourites])

    return (
        <div className='favourites col-12 d-flex flex-wrap bg-white rounded-lg shadow p-3 mt-5'>
            <header className='d-flex align-items-center justify-content-start col-12 border-bottom mb-3'>
                <h4 className=''>Favoritos</h4>
            </header>
            <section className='col-12 p-0 d-flex flex-column'>
                {
                    favouriteprod.map( (product, i) => {
                        return (
                            <div className='col-12 d-flex align-items-center' key={i}>
                                <div className="image col-2 p-0">
                                    <img
                                        src={urlbase + `/images/${product.image}`}
                                        alt={product.name}
                                        width='50px'
                                    />
                                </div>
                                <div className='info col-10 p-0'>
                                    <p className=''>
                                        {product.name}
                                    </p>
                                </div>
                            </div>
                        )
                    })
                }
            </section>
        </div>
    )
}
