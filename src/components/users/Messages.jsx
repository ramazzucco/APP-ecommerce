import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { urlbase } from "../../services/getInfoPage";
import { submit } from '../../services/handlerForm';

// Components.
import Textarea from '../form/Textarea';

export default function Messages(props) {

    const [ defaultdatapost ] = useState({
        from_name: `${props.user.user.first_name} ${props.user.user.last_name}`,
        to_id: props.admin ? props.admin.id : 0,
        to_name: 'ADMIN',
        users_id: props.user.user.id,
        avatar: props.user.user.avatar
    })
    const [ datapost, setDatapost ] = useState(defaultdatapost)

    const handlerChange = (e) => {
        setDatapost({...datapost, [e.target.name]: e.target.value})
    }

    const handlerSubmit = (e) => {
        e.preventDefault();

        console.log(e.target)

        console.log(datapost)
        const token = localStorage.getItem('token');
        const url = urlbase + '/api/apiUsers/messages';

        datapost.token = token;

        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datapost)
        }

        const submitmessage = submit(url, options, props.setUser, 'message', props.user);

        if(submitmessage && submitmessage.successful){
            document.querySelector('#form-message #content').value = '';
            setDatapost(defaultdatapost);
        }
        console.log(props.incommingmessages)
    }

    const datatextarea = {
        div: 'field border border-primary rounded-lg',
        label: {
            className: 'col-12 rounded-top py-2 bg-complementario text-white',
            htmlfor: "content",
            title: "Escribir aqui",
        },
        textarea: {
            className: 'col-12 border-0',
            id: "content",
            name: "content",
            type: "textarea",
            placeholder: "",
            required: true,
            error: "error content",
            onChange: handlerChange,
        },
    }

    return (
        <div className='mensajes col-12 d-flex flex-wrap bg-white rounded-lg shadow p-3 mt-5'>
            <header className='d-flex align-items-center col-12 border-bottom mb-3'>
                <h4 className=''>Mensajes</h4>
            </header>
            <section className='col-12 p-0 d-flex'>
                <div className="messages-container col-12 d-flex flex-column align-items-start pt-5 px-0 px-md-2 overflow-auto">
                    {
                        props.user.messages.length
                            ? props.user.messages.map( (msg, i) => {
                                return (
                                    <div
                                        key={i}
                                        className={`message col-12 px-0 px-md-2
                                            ${msg.from_name !== 'ADMIN' ? 'ml-auto user' : 'admin'}`
                                        }
                                    >
                                        <div
                                            className={`avatar d-flex mb-2
                                                ${msg.from_name === 'ADMIN' ? 'flex-row-reverse ml-3' : 'mr-3'}
                                                align-items-center justify-content-end`
                                            }
                                        >
                                            <p className='name mb-0 mr-2 pl-2'>
                                                {msg.from_name}
                                                <span className='ml-3'>
                                                    {msg.date}
                                                </span>
                                            </p>
                                            <div
                                                className='image rounded-circle overflow-hidden d-flex justify-content-center align-items-center'
                                                style={{ width: "33px", height: "33px" }}
                                            >
                                                <img
                                                    src={
                                                        msg.from_name === 'ADMIN'
                                                            ? `${urlbase}/images/logo.png`
                                                            : `${urlbase}/images/avatars/${props.user.user.avatar}`
                                                    }
                                                    alt="avatar"
                                                    width="44px"
                                                    height="44px"
                                                    style={{
                                                        objectFit: "contain",
                                                        borderRadius: "50%",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className={`content col-12 col-sm-10 col-lg-8 col-xl-6 rounded shadow p-3 mt-3 mb-5 bg-complementario ${msg.from_name !== 'ADMIN' ? 'ml-auto' : ''}`}
                                        >
                                            <p className='text-white'>
                                                {msg.content}
                                            </p>
                                            {
                                                msg.products_id > 0
                                                    ? <Link
                                                        className='product_link text-sombra-complementario-4 p-0'
                                                        to={msg.product_link}
                                                    >
                                                        <u>Ver producto referido</u>
                                                    </Link>
                                                    : ''
                                            }
                                        </div>
                                    </div>
                                )
                            })
                            : <p className='text-center mx-auto mb-5 h5 text-muted'>No hay mensajes !</p>
                    }
                    <div className="write-message col-12 px-1">
                        <form id='form-message' onSubmit={handlerSubmit}>

                            <Textarea {...datatextarea} />

                            <div className="buttons col-12 px-0 d-flex justify-content-end mt-3">
                                <button
                                    type='submit'
                                    className='btn btn-sm btn-primary'
                                >
                                    Enviar
                                </button>
                                <button
                                    type='button'
                                    className='btn btn-sm btn-outline-primary ml-3'
                                    onClick={() => document.querySelector('#form-message #content').value = ''}
                                >
                                    Borrar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}
