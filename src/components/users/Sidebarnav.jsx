import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../../css/user.css';

export default function Sidebarnav(props) {

    const [ activelink, setActivelink ] = useState('Mis datos')

    const classlink = 'rounded col-8 col-lg-12 mx-auto text-center py-2 ';

    const links = [
        {
            path: '/page/users',
            class: classlink + `${activelink === 'Mis datos' ? 'active' : ''}`,
            title: 'Mis datos'
        },
        {
            path: '/page/users/miscompras',
            class: classlink + `${activelink === 'Mis compras' ? 'active' : ''}`,
            title: 'Mis compras'
        },
        {
            path: '/page/users/configuracioncuenta',
            class: classlink + `${activelink === 'Configuracion cuenta' ? 'active' : ''}`,
            title: 'Configuracion cuenta'
        },
        {
            path: '/page/users/favoritos',
            class: classlink + `${activelink === 'Productos favoritos' ? 'active' : ''}`,
            title: 'Productos favoritos'
        },
        {
            path: '/page/users/mispromociones',
            class: classlink + `${activelink === 'Mis promociones' ? 'active' : ''}`,
            title: 'Mis promociones'
        },
        {
            path: '/page/users/mensajes',
            class: classlink + `${activelink === 'Mensajes' ? 'active' : ''}`,
            title: 'Mensajes'
        }
    ]

    const scrolltosection = (window.innerHeight * 70) / 100;

    return (
        <nav
            className="sidebaruser d-flex flex-column col-10 col-md-8 col-lg-3 col-xl-2 mx-auto px-0 py-3 bg-white rounded-lg shadow-sm"
        >
            <div className="buttons w-100 d-flex flex-column px-2">
                <p className='text-center text-uppercase font-weight-bold border-bottom pb-2'>
                    Menu
                </p>
                {
                    links.map( (link, i) => {
                        return (
                            <Link
                                key={i}
                                to={link.path}
                                className={link.class}
                                onClick={() => {
                                    setActivelink(link.title);
                                    link.title !== 'Mis datos'
                                        ? window.scrollTo(0,scrolltosection)
                                        : window.scrollTo(0,0)
                                }}
                            >
                                {link.title}
                            </Link>
                        )
                    })
                }
            </div>
        </nav>
    );
}
