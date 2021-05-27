import React from 'react'
import { Link } from 'react-router-dom'
import { urlbase } from '../services/getInfoPage'

export default function Error(props) {
    return (
        <div
            className='d-flex justify-content-center align-items-flex-start w-100'
            style={{minHeight: '100vh',maxHeight: '100vh'}}
        >
            {
                props.error && props.error.status >= 300 && props.error.status < 400
                    ? <img
                            src={`${urlbase}/images/${'error300.svg'}`}
                            alt="error 300"
                            width='50%'
                            height='50%'
                            style={{
                                position: 'absolute',
                                top: '40%'
                            }}
                        />
                    : ''
            }
            {
                props.error && props.error.status >= 400 && props.error.status < 500
                    ? <img
                            src={`${urlbase}/images/${'error400.svg'}`}
                            alt="error 400"
                            width='50%'
                            height='50%'
                            style={{
                                position: 'absolute',
                                top: '40%'
                            }}
                        />
                    : ''
            }
            {
                props.error && props.error.status >= 500
                    ? <img
                            src={`${urlbase}/images/${'error500.svg'}`}
                            alt="error 500"
                            width='50%'
                            height='50%'
                            style={{
                                position: 'absolute',
                                top: '40%'
                            }}
                        />
                    : ''
            }
            {
                props.error
                ? (
                    <div className='col-12 col-md-8 col-lg-6 d-flex flex-column justify-content-start align-items-center mt-5'>
                        <h1 className='d-flex align-self-start'>ERROR :</h1>
                        <p className='w-100 text-center'>
                            Mensaje:
                            <span className='text-danger ml-4'>
                                {props.error.message} !
                            </span>
                        </p>
                        {
                            props.error && props.error.status >= 300 && props.error.status < 400
                                ? <p className='text-muted'></p>
                                : ''
                        }
                        {
                            props.error && props.error.status >= 400 && props.error.status < 500
                                ? <ul className='text-muted'>
                                    <li>Informacion requerida inexistente, verifique su conexion a internet.</li>
                                    <li>Problemas de servidor, intentelo nuevamente mas tarde.</li>
                                    <li>codigo de estado:  ({props.error.status})</li>
                                </ul>
                                : ''
                        }
                        {
                            props.error && props.error.status >= 500
                                ? <p className='text-muted'></p>
                                : ''
                        }
                        <Link className='d-flex align-self-end' to='/page'>
                            Volver a la pagina
                        </Link>
                    </div>
                    )
                    : ''
            }
        </div>
    )
}
