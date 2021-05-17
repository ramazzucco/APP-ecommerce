import React, { useEffect, useState } from 'react'
import { modal } from '../../services';
import { urlbase } from "../../services/getInfoPage";
import { submit } from '../../services/handlerForm';

export default function Mydata(props) {

    const [ status, setStatus ] = useState(0)
    const [ user, setUser ] = useState(props.user.user)

    useEffect(() => {
        if(user.status === 0) setStatus('#C77C30')
        if(user.status === 1) setStatus('#C0C0C0')
        if(user.status === 3) setStatus('#CCAA35')
    },[props.user.user.status, user.status])

    useEffect(() => {
        setUser(props.user.user);
    },[props.user.user])

    const handlerSubmit = async (e) => {
        e.preventDefault();

        const url = urlbase + '/api/apiUsers/newavatar'
        const formdata = new FormData();

        formdata.append('id ', user.id)
        formdata.append('avatar', document.querySelector('form#updateavatar input').files[0])

        const options = {
            method: 'POST',
            body: formdata
        }

        const submitform = await submit(url, options, props.setUser, 'updateavatar', user);

        submitform.successful
            ? modal('successful', datamodal.title.success, datamodal.content.success)
            : modal('failed', datamodal.title.failed, submitform.error);
    }

    const hidemydata = (item) => {
        const mydata = document.querySelector('.misdatos section');
        const arrow = document.querySelector(`.misdatos header i`);

            if(mydata.className.includes('d-none')){
                mydata.classList.replace('d-none','d-flex');
            } else {
                mydata.classList.replace('d-flex','d-none');
            }

            arrow.className.includes('fa-chevron-down')
                ? arrow.classList.replace('fa-chevron-down','fa-chevron-up')
                : arrow.classList.replace('fa-chevron-up','fa-chevron-down');

    }

    const datamodal = {
        title: {
            failed: 'Lo sentimos !',
            success: 'Enhorabuena !',
        },
        content: {
            failed: 'No se ha podido actualizar la informacion',
            success: 'La informacion fue actualizada',
        }
    }

    return (
        <div className='misdatos col-12 d-flex flex-wrap bg-white rounded-lg shadow p-3'>
            <header className='d-flex align-items-center col-12 pointer' onClick={hidemydata}>
                <h4 className=''>Mis Datos</h4>
                <i className="fa fa-chevron-down ml-auto"></i>
            </header>
            <section className='col-12 p-0 d-flex flex-column flex-sm-row border-top'>
                <form
                    id='updateavatar'
                    className='col-12 col-sm-5 d-flex flex-wrap align-items-center justify-content-center p-3'
                >
                    <label htmlFor='newavatar' className="userimage col-12 p-0 d-flex flex-column align-items-center">
                        <span
                            className="mytooltip text-center"
                            data-title="Click para cambiar la imagen"
                        ></span>
                        <div
                            className='image rounded-circle'
                            style={{maxWidth: '150px',maxHeight: '150px',overflow: 'hidden'}}
                        >
                            <img
                                src={urlbase + `/images/avatars/${user.avatar}`}
                                alt="avatar"
                                width="100%"
                                style={{objectFit: 'contain'}}
                                onMouseOver={ () => document.querySelector("form#updateavatar .mytooltip")
                                    .classList.add("d-flex")}
                                onMouseOut={() => document.querySelector("form#updateavatar .mytooltip")
                                    .classList.remove("d-flex")}
                                className="pointer"
                            />
                        </div>
                        <div className="badge d-flex flex-column align-items-center">
                            <i
                                className="fas fa-medal fa-4x"
                                style={{ color: status, cursor: "default" }}
                            ></i>
                            <p className="mt-3 mb-0 text-center">
                                {user.status === 0
                                    ? "Comprador ocasional"
                                    : ""}
                                {user.status === 1
                                    ? "Comprador recurrente"
                                    : ""}
                                {user.status === 3 ? "Comprador vip" : ""}
                            </p>
                        </div>
                    </label>
                    <input
                        id="newavatar"
                        type="file"
                        name="newavatar"
                        onChange={handlerSubmit}
                    />
                </form>
                <div className="data col-12 col-sm-7 d-flex p-3">
                    <ul className='list-unstyled col-5 col-sm-3 p-0 text-right'>
                        <li className='mb-3'>Nombre</li>
                        <li className='mb-3'>Apellido</li>
                        <li className='mb-3'>email</li>
                        <li className='mb-3'>Direccion</li>
                        <li className='mb-3'>Ciudad</li>
                    </ul>
                    <ul className='list-unstyled col-7 col-sm-9 p-0 pl-3 text-muted'>
                        <li className='mb-3'>{user.first_name}</li>
                        <li className='mb-3'>{user.last_name}</li>
                        <li className='mb-3'>{user.email}</li>
                        <li className='mb-3'>{user.address}</li>
                        <li className='mb-3'>{user.city}</li>
                    </ul>
                </div>
            </section>
        </div>
    )
}
