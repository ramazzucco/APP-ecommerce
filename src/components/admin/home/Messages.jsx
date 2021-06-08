import React from 'react';
import { Link } from 'react-router-dom';
import { urlbase } from '../../../services/getInfoPage';

// Components.
import Loadingdata from '../../Loadingdata';

export default function Messages(props) {

    const users = props.users ? props.users.filter( user => user.status !== 2) : [];

    const handlerClickOnMessageUser = async (id) => {
        props.setActivelink('Usuarios');

        const token = localStorage.getItem('token');
        const url = `${urlbase}/api/dashboard/incommingmessage/${id}`
        const options = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: token }),
        };

        const request = await fetch(url,options);
        const response = await request.json();

        if(response) props.setIncommingmessages(response.data);
    }

    return (
        <div className="col-12 p-0 element-up overflow-hidden">
            <header
                className="d-flex justify-content-between align-items-center py-2 px-3 pb-2 mb-1 text-left bg-metallic-seaweed text-champagne"
            >
                Usuarios
                <i className="fas fa-sync-alt ml-auto" onClick={() => props.getData('messages', props.setMessages)}></i>
            </header>
            <section className="p-0 p-xl-3 mb-3" style={{maxHeight: '72vh'}}>
            {
                users.length ?
                    users.map((user, i) => {
                        return (
                            <Link
                                key={i}
                                to={`/admin/usuarios/${user.id}/incommingmessage`}
                                className="user d-flex align-items-center pl-4 pl-sm-5 pl-lg-4 my-3 my-lg-2"
                                onClick={() => handlerClickOnMessageUser(user.id)}
                            >
                                <div className='position-relative'>
                                    <div className="incommingmessage position-absolute">
                                        {
                                            props.incommingmessages && props.incommingmessages.length
                                                ? props.incommingmessages.map( IncMsg => {
                                                    let msgN = 0;
                                                    if(IncMsg.users_id === user.id){
                                                        msgN++
                                                    }
                                                    if(msgN !== 0){
                                                        return (
                                                            <p
                                                                key={i}
                                                                className='badge text-champagne bg-success rounded-circle border-champagne'
                                                            >
                                                                {msgN}
                                                            </p>
                                                            );
                                                        }
                                                    return '';
                                                })
                                                : ''
                                        }
                                    </div>
                                    <div
                                        className="image rounded-circle overflow-hidden d-flex justify-content-center align-items-center"
                                        style={{ width: "33px", height: "33px" }}
                                    >
                                        <img
                                            src={`${urlbase}/images/avatars/${user.avatar}`}
                                            alt={`${user.first_name} ${user.last_name}`}
                                            width="44px"
                                            height="44px"
                                            style={{
                                                objectFit: "contain",
                                                borderRadius: "50%",
                                            }}
                                        />
                                    </div>
                                </div>
                                <div
                                    className="info ml-3 ml-lg-1 ml-xl-3 d-flex flex-column align-items-start"
                                    style={{ fontSize: "1rem" }}
                                >
                                    <p className="pl-2 text-metallic-seaweed text-truncate mb-0">
                                        {`${user.first_name} ${user.last_name}`}
                                    </p>
                                    <p className='pl-2 mb-0 text-opal' style={{fontSize: '.9rem'}}>
                                    {user.status === 0 ? "Comprador ocasional" : ""}
                                    {user.status === 1 ? "Comprador recurrente" : ""}
                                    {user.status === 3 ? "Comprador vip" : ""}
                                    </p>
                                </div>
                            </Link>
                        );
                    })
                    : <div className="d-flex py-4 text-metallic-seaweed">
                        <Loadingdata />
                    </div>
                }
            </section>
        </div>
    )
}
