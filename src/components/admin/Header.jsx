import React, { useState } from "react";
import { Link } from "react-router-dom";
import { urlbase } from "../../services/getInfoPage";

export default function Header(props) {

    const [ datasearch, setDatasearch ] = useState('')
    const [ searchcoption, setSearchoption ] = useState('')

    let move = 0;

    const handlerOnKeyDownSearchAdmin = (e) => {
        const optionslist = document.querySelectorAll('#listsearch-admin p');

        if(e.keyCode === 40 && move < optionslist.length){
            move++
        }

        if(e.keyCode === 38 && move > 0) {
            move--
        }

        if(e.keyCode === 13){
            optionslist.forEach( async (option, i) => {
                if(i === move){
                    option.parentElement.click()
                }

                setDatasearch('');
            })
        }

        optionslist.forEach( (option, i) => {
            if(i === move){
                option.classList.add('bg-champagne');
            } else {
                option.classList.remove('bg-champagne');
            }
        })
    }

    window.onclick = (e) => {
        if(!e.target.classList.value.includes('option-search-admin')){
            setDatasearch('');
        }
    }

    const searchProduct = () => {
        const response = [];
        props.products.allproducts.map( (product, i) => {
            if(product.name.toLowerCase().includes(datasearch.toLowerCase()) && datasearch !== ''){

                response.push(
                    <Link to={`/admin/product/${product.id}`} key={i}>
                        <p className='option-search-admin pl-3 py-1 pointer mb-0 text-lowercase'>
                            {product.name}
                        </p>
                    </Link>
                )
            }
            return '';
        });

        if(!response.length){
            response.push(
                <p className='option-search-admin pl-3 py-1 pointer mb-0 text-lowercase'>
                    No se ha encontrado nada con "{datasearch}"
                </p>
            )
        }

        return response;
    }

    const searchUser = () => {
        const response = [];
        props.users.map( (user, i) => {
            if((user.first_name + ' ' + user.last_name).toLowerCase().includes(datasearch.toLowerCase())
                && datasearch !== ''){

                response.push(
                    <Link to={`/admin/user/${user.id}`} key={i}>
                        <p className='option-search-admin pl-3 py-1 pointer mb-0 text-lowercase'>
                            {user.first_name + ' ' + user.last_name}
                        </p>
                    </Link>
                )
            }
            return '';
        });

        if(!response.length){
            response.push(
                <p className='option-search-admin pl-3 py-1 pointer mb-0 text-lowercase'>
                    No se ha encontrado nada con "{datasearch}"
                </p>
            )
        }

        return response;
    }

    return (
        <header className="header d-flex flex-wrap">

            <div className='search-admin d-flex flex-wrap justify-content-end align-items-end align-items-md-center col-12 col-md-10 col-lg-9 p-0'>
                <select
                    className='col-5 col-sm-3 col-md-3'
                    name="search-option"
                    id="search-option"
                    onChange={(e) => setSearchoption(e.target.value)}
                >
                    <option selected disabled>Buscar en</option>
                    <option value="products">Productos</option>
                    <option value="users">Usuarios</option>
                </select>
                <input
                    type="text"
                    name="search"
                    id="search"
                    className='col-10 col-sm-8 col-lg-7 col-xl-5 position-relative'
                    onChange={(e) => setDatasearch(e.target.value)}
                    onKeyDown={handlerOnKeyDownSearchAdmin}
                />
                <div
                    id='listsearch-admin'
                    className={`col-11 col-sm-9 col-lg-6 p-0 position-absolute ${datasearch === '' ? 'd-none' : ''}`}
                >
                    {
                        props.products && searchcoption === 'products'
                            ? searchProduct()
                            : searchUser()
                    }
                </div>
                <label htmlFor="search" className='d-flex justify-content-end align-items-center col-1 mb-0'>
                    <i className="fas fa-search admin" ></i>
                </label>
            </div>

            <div className="avatar col-12 col-md-2 col-lg-3 p-md-0 d-flex justify-content-end align-items-center align-items-md-center my-2">
                <div className="icons col-1 p-0 d-flex justify-content-end align-items-center mr-5">
                    <i
                        className="fas fa-bell admin text-opal"
                        onMouseOver={(e) => e.target.classList.replace('text-opal','text-metallic-seaweed')}
                        onMouseOut={(e) => e.target.classList.replace('text-metallic-seaweed','text-opal')}
                    ></i>
                </div>
                <div
                    className="image rounded-circle overflow-hidden d-flex justify-content-center align-items-center"
                    style={{ width: "33px", height: "33px" }}
                >
                    <img
                        src={`${urlbase}/images/avatars/${props.admin.avatar}`}
                        alt={`${props.admin.first_name} ${props.admin.last_name}`}
                        width="44px"
                        height="44px"
                        style={{
                            objectFit: "contain",
                            borderRadius: "50%",
                        }}
                    />
                </div>
                <div
                    className="info d-none d-lg-flex flex-column align-items-start"
                    style={{ fontSize: "1rem" }}
                >
                    <p className="pl-2 text-metallic-seaweed mb-0">
                        {`${props.admin.first_name} ${props.admin.last_name}`}
                    </p>
                    <p className='text-success mb-0 pl-2' style={{ fontSize: ".9rem" }}>
                        Admin
                    </p>
                </div>
            </div>
        </header>
    );
}
