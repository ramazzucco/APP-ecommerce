import React, { useState } from 'react'
import { closeSubMenues, modal } from '../../services'
import { urlbase } from '../../services/getInfoPage'

// Components.
import Form from '../form/Form'

export default function Contact(props) {

    const [ data, setData ] = useState({})

    const handlerChange = (e) => {
        if(e.target.classList.value.includes('border-danger')){
            e.target.classList.remove('border-danger')
        }

        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handlerSubmit = async (e) => {
        e.preventDefault();

        if(!data.message || data.message === ''){
            document.querySelector('form#contact #message').classList.add('border-danger')
        } else {
            const url = urlbase + '/api/apiUsers/email';
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            };

            document.querySelector('#loading-info .title p').innerHTML = 'Enviando...'
            document.getElementById('loading-info').classList.toggle('d-none');

            const request = await fetch(url,options);
            const response = await request.json();

            console.log(response)

            if(response){
                document.querySelector('#loading-info .title p').innerHTML = 'Cargando...'
                document.getElementById('loading-info').classList.toggle('d-none');
            }

            if(!response.error){
                modal('successful','Enhorabuena !','El mail ha sido enviado con exito.');

                const inputs = document.querySelectorAll('form#contact input')

                inputs.forEach( input => {
                    input.value = '';
                })
            } else {
                modal('failed','Lo sentimos !', response.data.message)
            }
            console.log(data)
        }
    }

    const inputdiv = 'd-flex flex-wrap align-items-center justify-content-md-center align-items-md-start col-12 col-md-10 col-xl-12 p-0 mb-3';
    const inputlabelclassname = 'text-md-right text-capitalize pr-3 pr-lg-4 pr-xl-5 pl-0 col-12 col-md-4 col-lg-3 mb-1 mb-md-0 text-sombra-main-3';
    const inputinputclassname = 'rounded-lg p-2 col-12 col-md-7 col-lg-6 border-color-main';

    const contactdata = {
        form: {
            id: "contact",
            className: 'd-flex flex-wrap col-12 p-0 justify-content-center mx-auto',
            onSubmit: handlerSubmit,
            buttons: {
                className: 'd-flex justify-content-around align-items-center col-12 col-md-6 mt-2',
                style: { minHeight: '10vh', maxHeight: '10vh' },
                submit: {
                    className: 'rm-btn rm-blue w-75'
                }
            }
        },
        fields: [
            {
                id: "input",
                input: {
                    div: inputdiv,
                    label: {
                        className: inputlabelclassname,
                        htmlfor: "full_name",
                        title: "nombre completo",
                    },
                    input: {
                        className: inputinputclassname,
                        id: "full_name",
                        name: "full_name",
                        type: "text",
                        placeholder: "",
                        required: true,
                        error: "error full_name",
                        onChange: handlerChange,
                    },
                }
            },
            {
                id: "input",
                input: {
                    div: inputdiv,
                    label: {
                        className: inputlabelclassname,
                        htmlfor: "email",
                        title: "email",
                    },
                    input: {
                        className: inputinputclassname,
                        id: "email",
                        name: "email",
                        type: "email",
                        placeholder: "",
                        required: true,
                        error: "error email",
                        onChange: handlerChange,
                    },
                }
            },
            {
                id: "input",
                input: {
                    div: inputdiv,
                    label: {
                        className: inputlabelclassname,
                        htmlfor: "subject",
                        title: "Titulo",
                    },
                    input: {
                        className: inputinputclassname,
                        id: "subject",
                        name: "subject",
                        type: "text",
                        placeholder: "",
                        required: true,
                        error: "error subject",
                        onChange: handlerChange,
                    },
                }
            },
            {
                id: "textarea",
                textarea: {
                    div: inputdiv,
                    label: {
                        className: inputlabelclassname,
                        htmlfor: "message",
                        title: "mensaje",
                    },
                    textarea: {
                        className: inputinputclassname,
                        id: "message",
                        name: "message",
                        type: "textarea",
                        placeholder: "",
                        required: true,
                        error: "error message",
                        onChange: handlerChange,
                    },
                }
            },
        ]
    }

    return (
        <section
            className='container-fluid about bg-color-main py-5'
            onClick={closeSubMenues}
        >
            <div className='containerform col-12 col-sm-10 col-xl-8 border bg-white rounded-lg shadow mx-auto p-3 p-sm-4'>
                <h1
                    className='text-center mb-5 text-sombra-main-3'
                    style={{ fontSize: `${props.width < 768 ? '2rem' : '2.3rem'}` }}
                >
                    Formulario de contacto
                </h1>
                <Form {...contactdata} />
            </div>
        </section>
    )
}
