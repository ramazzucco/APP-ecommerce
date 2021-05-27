import React, { useState, useEffect } from 'react';
import { urlbase } from '../services/getInfoPage';
import '../css/admin.css';

// Components.
import Sidebar from './admin/Sidebar';
import Section from './admin/Section';
import Error from './Error';

export default function Admin(props) {

    const [ widgets, setWidgets ] = useState([])
    const [ lastproduct, setLastproduct ] = useState({})
    const [ categories, setCategories ] = useState([])
    const [ views, setViews ] = useState([])
    const [ users, setUsers ] = useState([])
    const [ messages, setMessages ] = useState([])
    const [ userswhithmessages, setUserswhithmessages ] = useState([])
    const [ incommingmessages, setIncommingmessages ] = useState([])
    const [ error, setError ] = useState([])

    const getData = async (datatofetch, setData) => {
        const token = localStorage.getItem('token');
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: token }),
        };

        const request = await fetch(`${urlbase}/api/dashboard/${datatofetch}`, options);
        const response = await request.json();

        console.log(response);

        if(response.error){
            setError([{
                status: response.meta.status,
                message: response.data[0].session}
            ])
        } else {
            if(response.userswhithmessages){
                setUserswhithmessages(response.userswhithmessages);
                setIncommingmessages(response.incommingmessages);
            }

            setData(response.data);
        }
    }

    useEffect(() => {
        getData('widgets', setWidgets);
        getData('lastproduct', setLastproduct);
        getData('categories', setCategories);
        getData('views', setViews);
        getData('users', setUsers);
        getData('messages', setMessages);

        const refresh = () => {
            setInterval(() => {
                getData('messages', setMessages);
                clearInterval(refresh);
            },1000 * 60 * 2);
        }

        refresh();
    },[])

    return (
        error.length
            ? <Error error={error[0]} />
            : <div className='admin-container d-flex m-0 p-0'>
                <Sidebar
                    admin={props.user.user}
                    setAdmin={props.setAdmin}
                    setUser={props.setUser}
                />
                <Section
                    products={props.products}
                    admin={props.user.user}
                    widgets={widgets}
                    lastproduct={lastproduct}
                    categories={categories}
                    views={views}
                    users={users}
                    messages={messages}
                    getData={getData}
                    setMessages={setMessages}
                    incommingmessages={incommingmessages}
                    userswhithmessages={userswhithmessages}
                />
            </div>

    )
}
