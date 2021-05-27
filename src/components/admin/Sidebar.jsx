import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { urlbase } from '../../services/getInfoPage';

export default function Sidebar(props) {

    const [ activelink, setActivelink ] = useState('Home')

    const classnametitle = 'title mb-0 text-truncate text-metallic-seaweed-contrast';

    const logout = async () => {

        localStorage.clear();

        if(props.admin.tokenhashed){

            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(props.admin),
            };

            const request = await fetch(urlbase + '/api/apiUsers/logout',options)

            const response = await request.json();

            console.log(response);
        }

        props.setAdmin({});

        props.setUser();
    }

    const links = [
        {
            path: '/admin',
            title: 'Home',
            icon: <i className="fas fa-home text-metallic-seaweed-contrast"></i>,
            classname: {
                link: `${activelink === 'Home' ? 'active' : ''}`,
                title: classnametitle
            },
        },
        {
            path: '/admin/productos',
            title: 'Productos',
            icon: <i className="fas fa-box-open text-metallic-seaweed-contrast"></i>,
            classname: {
                link: `${activelink === 'Productos' ? 'active' : ''}`,
                title: classnametitle
            },
        },
        {
            path: '/admin/usuarios',
            title: 'Usuarios',
            icon: <i className="fas fa-users text-metallic-seaweed-contrast"></i>,
            classname: {
                link: `${activelink === 'Usuarios' ? 'active' : ''}`,
                title: classnametitle
            },
        },
        {
            path: '/admin/configuracion',
            title: 'Configuracion',
            icon: <i className="fas fa-cog text-metallic-seaweed-contrast"></i>,
            classname: {
                link: `${activelink === 'Configuracion' ? 'active' : ''}`,
                title: classnametitle
            },
        },
        {
            title: 'Log out',
            icon: <i className="fas fa-sign-out-alt text-metallic-seaweed-contrast"></i>,
            classname: {
                link: `${activelink === 'Log out' ? 'active' : ''}`,
                title: classnametitle
            },
            onClick: logout
        }
    ]

    return (
        <div className='sidebar element-sidebar-up'>
            <div className="button-menu w-100">
                <i className="fas fa-bars text-metallic-seaweed-contrast"></i>
            </div>
            <div className="brand">
                <Link to='/page' className='text-opal'>
                    <div className="logo bg-opal rounded-circle shadow">
                        <span
                            className="mytooltip down text-center"
                            data-title="Ir a la pagina"
                        ></span>
                        <img
                            src={`${urlbase}/images/logo.png`}
                            alt="logo.png"
                            width='44px'
                            height='44px'
                            className='rounded-circle bg-metallic-seaweed-contrast'
                            onMouseOver={ () => document.querySelector(".admin-container .sidebar .mytooltip")
                                .classList.add("d-flex")}
                            onMouseOut={() => document.querySelector(".admin-container .sidebar .mytooltip")
                                .classList.remove("d-flex")}
                        />
                    </div>
                </Link>
            </div>
            <hr className='mx-0 my-2 bg-metallic-seaweed-contrast'/>
            <div className="links w-100 overflow-hidden">
                {
                    links.map( (link, i) => {
                        return !link.onClick ? (
                            <Link
                                to={link.path}
                                className={link.classname.link}
                                onClick={() => { setActivelink(link.title) }}
                            >
                                {link.icon}
                                <p className={link.classname.title}>
                                    {link.title}
                                </p>
                            </Link>
                        )
                        : <p
                            className={link.classname.link + ' logout pointer'}
                            onClick={link.onClick}
                        >
                            {link.icon}
                            <p className={link.classname.title}>
                                {link.title}
                            </p>
                        </p>
                    })
                }
            </div>
        </div>
    )
}
