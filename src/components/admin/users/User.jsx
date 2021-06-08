import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { modal, qS, qSall } from '../../../services';
import { urlbase } from '../../../services/getInfoPage';
import Loadingdata from '../../Loadingdata';
import Detalle from './Detalle';
import Messages from './Messages';
import Orders from './Orders';

export default function User(props) {

    const [ user, setUser ] = useState()
    const [ buttonactive, setButtonactive ] = useState('Detalle')
    const [ messages, setMessages ] = useState([])

    const params = useParams();
    const history = useHistory();

    const getUser = useCallback( async () => {
        if(!user){
            const token = localStorage.getItem('token');
            const url = `${urlbase}/api/dashboard/users/${params.id}`;
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: token }),
            };

            const request = await fetch(url,options);
            const response = await request.json();

            if(response.error){
                modal('failed', 'Lo sentimos !', response.data[0].message);
                qS('.modal-info div').classList.replace('bg-main-sombra-2','bg-opal');
            } else {
                setUser(response.data);
            }
        }
    },[user,params])

    useEffect(() => {
        getUser();
    },[getUser])

    useEffect(() => {
        if(user) setMessages(user.messages);
    },[user])

    useEffect(() => {
        if(params.incommingmessage && user){
            qS('.users .user #messages-user').click()
        }
    },[user, params])

    const buttons = [
        {
            id: 'detail-user',
            title: 'Detalle',
        },
        {
            id: 'orders-user',
            title: 'Ordenes de compra',
        },
        {
            id: 'messages-user',
            title: 'Mensajes',
        }
    ]

    const handlerUserSection = (e) => {
        const section = qSall('.admin-container .users .user .section');

        section.forEach( sec => {
            sec.className.includes(e.target.attributes.id.value)
                ? sec.classList.add('show')
                : sec.classList.remove('show');
        })
    }

    return (
        <div className='user pl-4 pl-lg-2 pr-md-0'>
            <div className="title d-flex flex-wrap align-items-center bg-metallic-seaweed text-champagne text-left border-metallic-seaweed rounded px-4 py-2 mt-4">
                <h3>
                    Detalle de usuario
                    <span className='h4 d-none d-lg-inline ml-5'>" {user ? `${user.user.first_name} ${user.user.last_name}` : ''} "</span>
                </h3>
                <button
                    className='ml-auto btn-admin btn-green-sheen rounded px-4'
                    onClick={() => history.push('/admin/usuarios')}
                >
                    Volver a la lista
                </button>
            </div>
            <header className='d-flex flex-wrap col-12 pt-3' style={{zIndex: '1'}}>
                {
                    buttons.map( (btn, i) => {
                        return (
                            <button
                                key={i}
                                id={btn.id}
                                className={`btn-admin btn-green-sheen mx-2 mb-2
                                    ${buttonactive === btn.title ? 'active' : ''}`
                                }
                                onClick={(e) => {
                                    setButtonactive(btn.title);
                                    handlerUserSection(e);
                                }}
                                onMouseOver={(e) => e.target.classList.add('hover')}
                                onMouseOut={(e) => e.target.classList.remove('hover')}
                            >
                                {btn.title}
                            </button>
                        )
                    })
                }
            </header>
            <div className='separator col-12 pr-5'>
                <hr className='col-12 bg-champagne-contrast mb-0 mt-3' />
            </div>
            {
                user
                ? (
                    <React.Fragment>
                        <Detalle user={user} />
                        <Messages
                            user={user}
                            admin={props.admin}
                            messages={messages}
                            setMessages={props.setMessages}
                        />
                        <Orders
                            purchases={user.purchases}
                            orders={user.orders}
                        />
                    </React.Fragment>
                )
                : (
                    <div className="d-flex py-4 text-metallic-seaweed">
                        <Loadingdata />
                    </div>
                )
            }
        </div>
    )
}
