import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { urlbase } from "../../services/getInfoPage";


export default function Favourite(props) {

    const [ favouriteprod, setFavouriteprod ] = useState([])

    const getFavourites = useCallback(() => {
        const favourites = JSON.parse(localStorage.getItem('favourite'));
        const favouriteproducts = [];

        if(favourites){
            favourites.ids.map( fid => {
                favouriteproducts.push(props.products.find( prod => prod.id === Number(fid)));

                return 'done';
            })

            setFavouriteprod(favouriteproducts);
        }
    },[props.products])

    useEffect(() => {
        getFavourites();
    },[getFavourites])

    const deleteFavourite = (e) => {
        const favourites = JSON.parse(localStorage.getItem('favourite'));

        const deletedfavourite = favourites.ids.filter( fid => fid !== e.target.attributes.dataid.value );

        document.getElementById(e.target.attributes.dataid.value).innerHTML = '';

        deletedfavourite.length
            ? localStorage.setItem('favourite',JSON.stringify({ids: deletedfavourite}))
            : localStorage.removeItem('favourite');
    }

    return (
        <div className='favourites col-12 d-flex flex-wrap bg-white rounded-lg shadow p-3 mt-5'>
            <header className='d-flex align-items-center justify-content-start col-12 border-bottom mb-3'>
                <h4 className=''>Favoritos</h4>
            </header>
            <section className='col-12 p-0 d-flex flex-column'>
                {
                    favouriteprod.length
                        ? favouriteprod.map( (product, i) => {
                            return (
                                <div
                                    key={i}
                                    id={product.id}
                                    className='d-flex'
                                >
                                    <Link to={`/page/${product.category_id}/${product.id}`} className='col-11 d-flex mb-2'>
                                        <div className="image col-3 col-sm-1 p-0 d-flex justify-content-flex-start">
                                            <img
                                                src={urlbase + `/images/${product.image}`}
                                                alt={product.name}
                                                width='100%'
                                            />
                                        </div>
                                        <div className='info col-9 col-md-10 col-lg-11 p-0 ml-2 d-flex flex-column justify-content-center'>
                                            <p className='text-muted mb-1 ml-5'>
                                                {product.category_title}
                                            </p>
                                            <p className='text-truncate mb-1 ml-5'>
                                                {product.name}
                                            </p>
                                        </div>
                                    </Link>
                                    <div className="close col-1 p-0 d-flex justify-content-end">
                                        <i class="fas fa-times text-sombra-main-4 mr-2"
                                            style={{fontSize: '1rem'}}
                                            dataid={product.id}
                                            onClick={deleteFavourite}
                                        ></i>
                                    </div>
                                </div>
                            )
                        })
                        : <p className='text-center h5 text-muted'>No hay productos seleccionados !</p>
                }
            </section>
        </div>
    )
}
