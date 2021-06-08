import React, { useCallback, useEffect, useState } from 'react'
import { qS, usersListBy } from '../../../services'
import Loadingdata from '../../Loadingdata'
import Row from './Row'

export default function Items(props) {

    const [ orderlistuser, setOrderlistuser ] = useState('id')
    const [ orderbydirection, setOrderbydirection ] = useState('up')
    const [ users, setUsers ] = useState([])

    useEffect(() => {
        qS('.users .items-user').classList.add('show');
    },[])

    const usersproperties = [
        {
            value: 'id',
            title: 'Id'
        },
        {
            value: 'name',
            title: 'Nombre'
        },
        {
            value: 'email',
            title: 'Email'
        },
        {
            value: 'address',
            title: 'Direccion'
        },
        {
            value: 'city',
            title: 'Ciudad'
        },
        {
            value: 'status',
            title: 'Status'
        },
    ]

    const orderBy = usersListBy;

    const orderListBy = useCallback(() => {
        if(orderlistuser === 'id'){
            orderbydirection === 'up'
                ? setUsers(props.users.sort((a,b) => orderBy(a,b).id(a,b)))
                : setUsers(props.users.sort((a,b) => orderBy(a,b).id(a,b)).reverse());
        }
        if(orderlistuser === 'name'){
            orderbydirection === 'up'
                ? setUsers(props.users.sort((a,b) => orderBy(a,b).name(a,b)))
                : setUsers(props.users.sort((a,b) => orderBy(a,b).name(a,b)).reverse());
        }
        if(orderlistuser === 'email'){
            orderbydirection === 'up'
                ? setUsers(props.users.sort((a,b) => orderBy(a,b).email(a,b)))
                : setUsers(props.users.sort((a,b) => orderBy(a,b).email(a,b)).reverse());
        }
        if(orderlistuser === 'address'){
            orderbydirection === 'up'
                ? setUsers(props.users.sort((a,b) => orderBy(a,b).address(a,b)))
                : setUsers(props.users.sort((a,b) => orderBy(a,b).address(a,b)).reverse());
        }
        if(orderlistuser === 'city'){
            orderbydirection === 'up'
                ? setUsers(props.users.sort((a,b) => orderBy(a,b).city(a,b)))
                : setUsers(props.users.sort((a,b) => orderBy(a,b).city(a,b)).reverse());
        }
        if(orderlistuser === 'status'){
            orderbydirection === 'up'
                ? setUsers(props.users.sort((a,b) => orderBy(a,b).status(a,b)))
                : setUsers(props.users.sort((a,b) => orderBy(a,b).status(a,b)).reverse());
        }
    },[props.users,orderlistuser,orderbydirection,orderBy])

    useEffect(() => {
        setUsers(props.users)
        orderListBy();
    },[props.users,orderListBy])

    return (
        <div className='items-user section pl-4 pl-lg-2 pr-md-0'>
            <div className="title bg-metallic-seaweed text-champagne text-left rounded pl-4 py-2">
                <h3>Lista de usuarios</h3>
            </div>
            <div className='col-12 d-flex align-items-center my-3'>
                <label htmlFor="order-list-user" className='text-green-sheen mb-0 mr-4 d-none d-sm-flex'>
                    Ordenar por
                </label>
                <select
                    name="order-list-user"
                    id="order-list-user"
                    className='bg-champagne text-green-sheen text-center rounded py-1 px-3'
                    onChange={(e) => {setOrderlistuser(e.target.value); setUsers([])}}
                >
                    {
                        usersproperties.map( (property, i) => {
                            return (
                                <option
                                    key={i}
                                    value={property.value}
                                >
                                    {property.title}
                                </option>
                            )
                        })
                    }
                </select>
                <button
                    className='mx-2 border-0 bg-transparent rounded text-green-sheen'
                    style={{border: '1px solid var(--metallic-seaweed)',fontSize: '1.5rem'}}
                    onClick={() => {setOrderbydirection('up'); setUsers([])}}
                >
                    <i className={`${orderbydirection === 'up' ? 'fas' : 'far'} fa-arrow-alt-circle-up`}></i>
                </button>
                <button
                    className='mx-2 border-0 bg-transparent rounded text-green-sheen'
                    style={{border: '1px solid var(--metallic-seaweed)',fontSize: '1.5rem'}}
                    onClick={() => {setOrderbydirection('down'); setUsers([])}}
                >
                    <i className={`${orderbydirection === 'down' ? 'fas' : 'far'} fa-arrow-alt-circle-down`}></i>
                </button>
            </div>
            <table className="items-list table table-hover table-striped rounded shadow">
                <thead>
                    <tr className='text-champagne bg-opal'>
                        {
                            usersproperties.map( (property, i) => {
                                return (
                                    <th scope="col" key={i}>{property.title}</th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map( (user, i) => {
                            return (
                                <Row user={user} key={i} />
                            )
                        })
                    }
                </tbody>
            </table>
            {
                !users.length
                    ? <div className="d-flex py-4 text-metallic-seaweed">
                        <Loadingdata />
                    </div>
                    :''
            }
        </div>
    )
}
