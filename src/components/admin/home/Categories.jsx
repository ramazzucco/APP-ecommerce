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
                            <div className='d-block py-1 px-4 bg-opal rounded text-center mb-2 element-up' key={i}>
                                <Link to={`/page/${category.category.title}`}>
                                    <p className='text-metallic-seaweed text-capitalize mb-1'>
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
