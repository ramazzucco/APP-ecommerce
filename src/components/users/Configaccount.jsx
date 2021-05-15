import React, { useState } from 'react';
import { modal } from '../../services';
import { urlbase } from '../../services/getInfoPage';
import { submit } from '../../services/handlerForm';
import Form from '../form/Form';

//Components.
import Input from '../form/Input';

export default function Configaccount(props) {

    const [ showPass, setShowPass ] = useState({
        currentpassword: false,
        newpassword: false,
        password: false
    })
    const [ changepassword, setChangepassword ] = useState({
        email: props.user.email
    })
    const [ personaldata, setPersonaldata ] = useState({
        id: props.user.id,
        first_name: props.user.first_name,
        last_name: props.user.last_name,
        email: props.user.email,
        address: props.user.address,
        city: props.user.city,
    })

    const datamodal = {
        title: {
            success: 'Enhorabuena !',
        },
        content: {
            success: 'La informacion fue actualizada',
        }
    }

    const enableSection = (selector) => {
        const section = document.querySelector(selector + ' section');
        const arrow = document.querySelector(selector + ' header i');
        const buttons = document.querySelector(selector + ' .buttons');

        section.classList.toggle('d-flex');
        buttons.classList.toggle('d-flex');

        arrow.className.includes('fa-chevron-right')
            ? arrow.classList.replace('fa-chevron-right','fa-chevron-down')
            : arrow.classList.replace('fa-chevron-down','fa-chevron-right');
    }

    const handlerCancel = (selector) => {
        enableSection(selector);

        const inputs = document.querySelectorAll(selector + ' input');

        inputs.forEach( input => {
            input.value = '';
        })

    }

    const submitChangepassword = async () => {

        const token = localStorage.getItem('token');
        const url = urlbase + '/api/apiUsers/changepassword';

        changepassword.token = token;

        const options = {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(changepassword)
        }

        const submitform = await submit(url, options, props.setUser, "changepassword",props.user)

        if(submitform && submitform.successful){
            modal('successful', datamodal.title.success, datamodal.content.success);
            handlerCancel('.changepassword');
        }
    }

    const classnamelabel = 'col-12 col-sm-4 col-md-12 col-lg-4 p-0 pr-3 text-left text-sm-right text-md-left text-lg-right mb-0 mb-sm-2 mt-2 text-capitalize';
    const classnameinput = 'col-12 col-sm-7 col-md-12 col-lg-6 bg-transparent border-left-0 border-right-0 border-top-0 py-1';

    const handlerChange = (e) => {
        if(e.target.classList.value.includes('border-danger')){
            e.target.classList.remove('border-danger','border','text-danger');
            document.querySelector(`.changepassword .error.${e.target.name}`).innerHTML = '';
        }

        e.target.name === 'currentpassword'
            ? setChangepassword({ ...changepassword, password: e.target.value })
            : setChangepassword({ ...changepassword, [e.target.name]: e.target.value });
    }

    const fieldschangepassword = [
        {
            id: "input",
            input: {
                div: '',
                label: {
                    className: classnamelabel,
                    htmlfor: "newpassword",
                    title: <div>
                        Contraseña nueva
                        <i className={`far fa-eye ml-2 ${showPass.newpassword ? "d-none" : ""}`}
                            onClick={() => setShowPass({...showPass, newpassword: !showPass.newpassword})}></i>
                        <i className={`far fa-eye-slash ml-2 ${showPass.newpassword ? "" : "d-none"}`}
                            onClick={() => setShowPass({...showPass, newpassword: !showPass.newpassword})}></i>
                    </div>,
                },
                input: {
                    className: classnameinput,
                    id: "newpassword",
                    name: "newpassword",
                    type: showPass.newpassword ? "text" : "password",
                    placeholder: '',
                    required: true,
                    disabled: false,
                    error: "error newpassword",
                    onChange: handlerChange,
                },
            },
        },
        {
            id: "input",
            input: {
                div: '',
                label: {
                    className: classnamelabel,
                    htmlfor: "currentpassword",
                    title: <div>
                        Contraseña actual
                        <i className={`far fa-eye ml-2 ${showPass.currentpassword ? "d-none" : ""}`}
                            onClick={() => setShowPass({...showPass, currentpassword: !showPass.currentpassword})}></i>
                        <i className={`far fa-eye-slash ml-2 ${showPass.currentpassword ? "" : "d-none"}`}
                            onClick={() => setShowPass({...showPass, currentpassword: !showPass.currentpassword})}></i>
                    </div>,
                },
                input: {
                    className: classnameinput,
                    id: "currentpassword",
                    name: "currentpassword",
                    type: showPass.currentpassword ? "text" : "password",
                    placeholder: '',
                    required: true,
                    disabled: false,
                    error: "error currentpassword",
                    onChange: handlerChange,
                },
            },
        }
    ]

    const handlerChangePersonaldata = (e) => {
        if(e.target.classList.value.includes('border-danger')){
            e.target.classList.remove('border-danger','border','text-danger');
            document.querySelector(`.Personal-data .error.${e.target.name}`).innerHTML = '';
        }

        setPersonaldata({...personaldata, [e.target.name]: e.target.value})
    }


    const submitPersonaldata = async (e) => {
        e.preventDefault();

        if(!personaldata.password || personaldata.password === ''){
            document.querySelector('form#updateuser #password').classList.add('border-danger');
            document.querySelector(`form#updateuser .error.password`).innerHTML = `<i class="far fa-times-circle mr-3"></i> Debe ingresar su contraseña`
        } else {
            const token = localStorage.getItem('token');
            const url = urlbase + '/api/apiUsers/update';

            personaldata.token = token;

            const options = {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(personaldata)
            }

            const submitform = await submit(url, options, props.setUser, "Personal-data",props.user)

            if(submitform && submitform.successful){
                modal('successful', datamodal.title.success, datamodal.content.success);
                handlerCancel('.Personal-data');
            }
        }
    }

    const personaldataform = {
        form: {
            id: "updateuser",
            className: '',
            onSubmit: submitPersonaldata,
            buttons: {
                className: 'd-none buttons col-12 justify-content-end mt-3 border-bottom pb-3',
                submit: {
                    className: 'col-3 btn btn-primary btn-sm'
                },
                button: {
                    className: 'col-3 btn btn-outline-primary btn-sm border-0 ml-3',
                    onClick: () => enableSection('.Personal-data'),
                }
            }
        },
        fields: [
            {
                id: "input",
                input: {
                    div: '',
                    label: {
                        className: classnamelabel,
                        htmlfor: "first_name",
                        title: "nombre",
                    },
                    input: {
                        className: classnameinput,
                        id: "first_name",
                        name: "first_name",
                        type: "text",
                        placeholder: "",
                        value: personaldata.first_name,
                        required: true,
                        error: "error first_name",
                        onChange: handlerChangePersonaldata,
                    },
                }
            },
            {
                id: "input",
                input: {
                    div: '',
                    label: {
                        className: classnamelabel,
                        htmlfor: "last_name",
                        title: "apellido",
                    },
                    input: {
                        className: classnameinput,
                        id: "last_name",
                        name: "last_name",
                        type: "text",
                        placeholder: "",
                        value: personaldata.last_name,
                        required: true,
                        error: "error last_name",
                        onChange: handlerChangePersonaldata,
                    },
                }
            },
            {
                id: "input",
                input: {
                    div: '',
                    label: {
                        className: classnamelabel,
                        htmlfor: "email",
                        title: "email",
                    },
                    input: {
                        className: classnameinput,
                        id: "email",
                        name: "email",
                        type: "email",
                        placeholder: "",
                        value: personaldata.email,
                        required: true,
                        error: "error email",
                        onChange: handlerChangePersonaldata,
                    },
                }
            },
            {
                id: "input",
                input: {
                    div: '',
                    label: {
                        className: classnamelabel,
                        htmlfor: "address",
                        title: "direccion",
                    },
                    input: {
                        className: classnameinput,
                        id: "address",
                        name: "address",
                        type: "text",
                        placeholder: "",
                        value: personaldata.address,
                        required: false,
                        error: "error address",
                        onChange: handlerChangePersonaldata,
                    },
                },
            },
            {
                id: "input",
                input: {
                    div: '',
                    label: {
                        className: classnamelabel,
                        htmlfor: "city",
                        title: "ciudad",
                    },
                    input: {
                        className: classnameinput,
                        id: "city",
                        name: "city",
                        type: "text",
                        placeholder: "",
                        value: personaldata.city,
                        required: false,
                        error: "error city",
                        onChange: handlerChangePersonaldata,
                    },
                }
            },
            {
                id: "input",
                input: {
                    div: '',
                    label: {
                        className: classnamelabel,
                        htmlfor: "password",
                        title: <div>
                            Password
                            <i className={`far fa-eye ml-2 ${showPass.password ? "d-none" : ""}`}
                            onClick={() => setShowPass({...showPass, password: !showPass.password})}></i>
                            <i className={`far fa-eye-slash ml-2 ${showPass.password ? "" : "d-none"}`}
                            onClick={() => setShowPass({...showPass, password: !showPass.password})}></i>
                    </div>,
                    },
                    input: {
                        className: classnameinput,
                        id: "password",
                        name: "password",
                        type: showPass.password ? "text" : "password",
                        placeholder: "",
                        required: true,
                        error: "error password",
                        onChange: handlerChangePersonaldata,
                    },
                }
            }
        ]
    }

    return (
        <div className='configaccount col-12 d-flex flex-column bg-white rounded-lg shadow p-3 mt-5'
            style={{minHeight: '50vh'}}
        >
            <header className='d-flex align-items-center col-12 border-bottom mb-4'>
                <h4 className=''>Configuracion cuenta</h4>
            </header>
            <div className='options col-12 p-0'>

{/* Cambiar contraseña */}
                <div className="changepassword col-12 mt-2 px-0 px-md-4">
                    <header className='d-flex align-items-center pointer' onClick={() => enableSection('.changepassword')}>
                        <p className='mb-0'>Cambiar contraseña</p>
                        <i className="fa fa-chevron-right ml-3"
                            style={{fontSize: '0.9rem',marginLeft: 'auto',transition: 'all 1s ease'}}
                        ></i>
                    </header>
                    <section className='d-none flex-column col-12 p-3 mt-2 border-top'>
                        {
                            fieldschangepassword.map( field => {
                                return (
                                    <Input {...field.input} />
                                )
                            })
                        }
                    </section>
                    <div className="d-none buttons col-12 flex-wrap justify-content-end mt-3 border-bottom pb-3">
                        <button
                            type='button'
                            className='col-12 col-sm-4 col-md-3 btn btn-primary btn-sm'
                            onClick={submitChangepassword}
                        >
                            Aceptar
                        </button>
                        <button
                            type='button'
                            className='col-12 col-sm-4 col-md-3 mt-1 btn btn-outline-primary btn-sm border-0 ml-3'
                            onClick={() => handlerCancel('.changepassword')}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>

{/* Datos Personales */}
                <div className="Personal-data col-12 mt-2 px-0 px-md-4">
                    <header className='d-flex align-items-center pointer' onClick={() => enableSection('.Personal-data')}>
                        <p className='mb-0'>Datos personales</p>
                        <i className="fa fa-chevron-right ml-3"
                            style={{fontSize: '0.9rem',marginLeft: 'auto',transition: 'all 1s ease'}}
                        ></i>
                    </header>
                    <section className='d-none flex-column col-12 p-3 mt-2 border-top'>
                        <Form {...personaldataform} />
                    </section>
                </div>

{/* Preferencias */}
                <div className="preference col-12 mt-2 px-0 px-md-4">
                    <header className='d-flex align-items-center pointer' onClick={() => enableSection('.preference')}>
                        <p className='mb-0'>Preferencias</p>
                        <i className="fa fa-chevron-right ml-3"
                            style={{fontSize: '0.9rem',marginLeft: 'auto',transition: 'all 1s ease'}}
                        ></i>
                    </header>
                    <section className='d-none flex-column col-12 p-3 mt-2 border-top'>

                    </section>
                    <div className="d-none buttons col-12 flex-wrap justify-content-end mt-3 border-bottom pb-3">
                        <button
                            type='button'
                            className='col-12 col-sm-4 col-md-3 btn btn-primary btn-sm'
                            // onClick={handlerSubmit}
                        >
                            Aceptar
                        </button>
                        <button
                            type='button'
                            className='col-12 col-sm-4 col-md-3 mt-1 btn btn-outline-primary btn-sm border-0 ml-3'
                            onClick={() => handlerCancel('.preference')}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>

{/* Configurar envio */}
                <div className="Configurar-envios col-12 mt-2 px-0 px-md-4">
                    <header className='d-flex align-items-center pointer' onClick={() => enableSection('.Configurar-envios')}>
                        <p className='mb-0'>Configuracion de envio</p>
                        <i className="fa fa-chevron-right ml-3"
                            style={{fontSize: '0.9rem',marginLeft: 'auto',transition: 'all 1s ease'}}
                        ></i>
                    </header>
                    <section className='d-none flex-column col-12 p-3 mt-2 border-top'>

                    </section>
                    <div className="d-none buttons col-12 flex-wrap justify-content-end mt-3 border-bottom pb-3">
                        <button
                            type='button'
                            className='col-12 col-sm-4 col-md-3 btn btn-primary btn-sm'
                            // onClick={handlerSubmit}
                        >
                            Aceptar
                        </button>
                        <button
                            type='button'
                            className='col-12 col-sm-4 col-md-3 mt-1 btn btn-outline-primary btn-sm border-0 ml-3'
                            onClick={() => handlerCancel('.Configurar-envios')}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}
