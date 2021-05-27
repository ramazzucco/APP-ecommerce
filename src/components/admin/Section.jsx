import React from 'react';
import { Route } from 'react-router';

// Components.
import Header from './Header';
import Widgets from './home/Widgets';
import Lastproduct from './home/Lastproduct';
import Categories from './home/Categories';
import Views from './home/Views';
import Users from './home/Users';

export default function Section(props) {
    return (
        <div className="main col-12 d-flex flex-column">
            <Header
                admin={props.admin}
                users={props.users}
                products={props.products}
            />
            <Route exact path='/admin'>
                <div className="home d-flex flex-wrap align-items-start">

                    <div className='products col-12 col-lg-9 pr-0 mt-3 d-flex flex-wrap align-items-start justify-content-between'>
                        <Widgets widgets={props.widgets} />
                        <Categories categories={props.categories} />

                        <div className='col-12 col-md-7 p-0 mt-3'>
                            <Views views={props.views} />
                        </div>

                        <div className='col-12 col-md-4 p-0 mt-3'>
                            <Lastproduct lastproduct={props.lastproduct} />
                        </div>
                    </div>

                    <div className="users col-12 col-md-7 col-lg-3 pr-0 mt-3 d-flex align-items-start">
                        <Users
                            users={props.users}
                            incommingmessages={props.incommingmessages}
                            getData={props.getData}
                            setMessages={props.setMessages}
                        />
                    </div>
                </div>
            </Route>
        </div>
    )
}
