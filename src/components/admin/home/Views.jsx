import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Components.
import Loadingdata from '../../Loadingdata';

export default function Views(props) {

    const [ views, setViews ] = useState({})

    useEffect(() => {
        setViews(props.views)
    },[props.views])

    const handlerOnMouseOver = (e, selector) => {
        document.querySelector(selector).classList.replace('bg-opal','bg-metallic-seaweed')
    }

    const handlerOnMouseOut = (e, selector) => {
        document.querySelector(selector).classList.replace('bg-metallic-seaweed','bg-opal')
    }

    return (
        <div className='views col-12 px-0 d-flex flex-wrap justify-content-between'>
            <div
                className="top10 w-100 element-up"
                onMouseOver={(e) => handlerOnMouseOver(e,'.views .top10 header')}
                onMouseOut={(e) => handlerOnMouseOut(e,'.views .top10 header')}
            >
                <header className='rounded-top bg-opal'>
                    <p className='text-center text-champagne mb-0'>
                        Top 10 mas vistos
                    </p>
                </header>
                <section className='p-3'>
                    {
                        views && views.top10
                            ? views.top10.map( (top10, i) => {
                                return (
                                    <div className='d-flex col-12 p-0' key={i}>
                                        <Link
                                            to={`/page/${top10.category_id}/${top10.products_id}`}
                                            className='d-flex col-12 p-0 text-truncate text-metallic-seaweed'
                                            style={{fontSize: '.9rem'}}
                                        >
                                            <p className='mb-0 px-2 text-rich-black-fogra-29 rounded-circle'>
                                                {i + 1}
                                            </p>
                                            <p className='mb-0 ml-3 text-truncate'>
                                                ({top10.views}) - {top10.name}
                                            </p>
                                        </Link>
                                    </div>
                                )
                            })
                            : <div className="d-flex py-4 text-metallic-seaweed">
                                <Loadingdata />
                            </div>
                    }
                </section>
            </div>

            <div
                className="notviews w-100 element-up mt-3"
                onMouseOver={(e) => handlerOnMouseOver(e,'.views .notviews header')}
                onMouseOut={(e) => handlerOnMouseOut(e,'.views .notviews header')}
            >
                <header className='rounded-top bg-opal'>
                    <p className='text-center text-champagne mb-0'>
                        Productos sin vistas
                    </p>
                </header>
                <section className='p-3'>
                    {
                        views && views.notviews
                            ? views.notviews.map( (top10, i) => {
                                return (
                                    <div className='d-flex col-12 p-0' key={i}>
                                        <Link
                                            to={`/page/${top10.category_id}/${top10.products_id}`}
                                            className='d-flex col-12 p-0 text-truncate text-metallic-seaweed'
                                            style={{fontSize: '.9rem'}}
                                        >
                                            <p className='mb-0 px-2 text-rich-black-fogra-29 rounded-circle'>
                                                {i + 1}
                                            </p>
                                            <p className='mb-0 ml-3 text-truncate'>
                                                {top10.name}
                                            </p>
                                        </Link>
                                    </div>
                                )
                            })
                            : <div className="d-flex py-4 text-metallic-seaweed">
                                <Loadingdata />
                            </div>
                    }
                </section>
            </div>
        </div>
    )
}
