import React from 'react'
import { Link } from 'react-router-dom'

// Components.
import Loadingdata from '../../Loadingdata'

export default function Categories(props) {
    return (
        <div
            className='categories col-12 p-0 mt-4 d-flex flex-wrap justify-content-between'
            style={{fontSize: '.9rem'}}
        >
            {
                props.categories && props.categories.length
                    ? props.categories.map( (category, i) => {
                        return (
                            <div
                                key={i}
                                className='d-block py-1 px-4 rounded text-center mb-2 element-sidebar-up'
                            >
                                <Link to={`/page/${category.category.title}`}>
                                    <p className='text-champagne text-capitalize mb-1'>
                                        {category.category.title} ({category.total_products})
                                    </p>
                                </Link>
                            </div>
                        )
                    })
                    : <div className='mx-auto text-metallic-seaweed'>
                        <Loadingdata />
                    </div>
            }
        </div>
    )
}
