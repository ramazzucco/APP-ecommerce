import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { urlbase } from '../../../services/getInfoPage'
import Textarea from '../../form/Textarea'

export default function Messages(props) {
    const [ defaultdatapost ] = useState({
        from_name: props.admin ? 'ADMIN' : 0,
        to_id: props.user.user.id,
        to_name: `${props.user.user.first_name} ${props.user.user.last_name}`,
        users_id: props.admin.id,
        avatar: props.admin.avatar
    })
    const [ datapost, setDatapost ] = useState(defaultdatapost)
    const [ messages, setMessages ] = useState([])

    useEffect(() => {
        if(!messages.length) setMessages(props.messages);
    },[props.messages, messages])

    const handlerChange = (e) => {
        setDatapost({...datapost, [e.target.name]: e.target.value})
    }

    const handlerSubmit = async (e) => {
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

        const request = await fetch(url,options);
        const response = await request.json();

        if(!response.error){
            document.querySelector('#form-message #content').value = '';
            setDatapost(defaultdatapost);
            setMessages([...props.messages, response.data])
        }
    }

    const datatextarea = {
        div: 'field border-metallic-seaweed rounded-lg',
        label: {
            className: 'col-12 rounded-top py-2 bg-metallic-seaweed text-champagne',
            htmlfor: "content",
            title: "Escribir aqui",
        },
        textarea: {
            className: 'col-12 border-0 bg-transparent text-metallic-seaweed',
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
        <div className='messages-user section col-12 d-flex flex-wrap mt-5'>
            <section className='col-12 pr-0 pl-4 d-flex flex-wrap mt-5'>
                <div className="messages-container col-12 d-flex flex-wrap align-items-start pt-5 px-0 px-md-2 px-lg-5 overflow-auto">
                    {
                        messages.length
                            ? messages.map( (msg, i) => {
                                return (
                                    <div
                                        key={i}
                                        className={`message col-12 px-0 px-md-2 text-metallic-seaweed
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
                                        <div className={`content col-12 col-sm-10 col-lg-8 col-xl-6 rounded shadow p-3 mt-3 mb-5
                                            ${msg.from_name !== 'ADMIN' ? 'ml-auto bg-green-sheen' : 'bg-metallic-seaweed'}`}
                                        >
                                            <p className='text-champagne'>
                                                {msg.content}
                                            </p>
                                            {
                                                msg.products_id > 0
                                                    ? <Link
                                                        className='product_link p-0'
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
                </div>
                    <div className="write-message col-12 px-1 px-lg-5 mb-4">
                        <form id='form-message' onSubmit={handlerSubmit}>

                            <Textarea {...datatextarea} />

                            <div className="buttons col-12 px-0 d-flex justify-content-end mt-3">
                                <button
                                    type='submit'
                                    className='btn-admin btn-metallic-seaweed'
                                >
                                    Enviar
                                </button>
                                <button
                                    type='button'
                                    className='btn-admin-outline btn-champagne ml-3'
                                    onClick={() => document.querySelector('#form-message #content').value = ''}
                                >
                                    Borrar
                                </button>
                            </div>
                        </form>
                    </div>
            </section>
        </div>
    )
}
