import React from 'react'

export default function Loadinginfo(props) {

    return (
        <div
            id='loading-info'
            className='d-none'
            style={{
                minHeight: document.getElementById('root').clientHeight,
                minWidth: document.getElementById('root').clientWidth,
                position: 'absolute',
                zIndex: 5
            }}
        >
            <div
                className='loading-card col-9 col-sm-8 col-md-6 col-lg-4 position-sticky shadow p-5 bg-main-sombra-2 rounded'
                style={{
                    top: '50%',
                    left: '50%',
                    transform: `translate(${props.width < 768 ? props.width < 550 ? '-15%' : '-25%': '-50%'},-50%)`,
                    zIndex: '10'
                }}
            >
                <div className="spinner-container d-flex justify-content-center">
                    <div
                        className="spinner-grow text-sombra-main-4"
                        role="status"
                    >
                    </div>

                    <div
                        className="spinner-grow text-sombra-main-4 mx-4"
                        role="status"
                    >
                    </div>

                    <div
                        className="spinner-grow text-sombra-main-4"
                        role="status"
                    >
                    </div>
                </div>
                <div className="title mt-4">
                    <p className='font-weight-bold text-center mb-0 letter-space-1 text-color-main'>
                        Cargando...
                    </p>
                </div>
            </div>
        </div>
    )
}
