import React from "react";
import { Route } from "react-router-dom";
import { closeSubMenues } from "../services";

// Components.
import Sidebarnav from './users/Sidebarnav';
import Mydata from "./users/Mydata";
import Configaccount from "./users/Configaccount";
import Myshopping from "./users/Myshopping";
import Messages from "./users/Messages";
import Favourite from "./users/Favourite";

export default function User(props) {

    return (
        <section
            className="w-100 d-flex align-items-start flex-wrap color-main pt-3 pl-3 pr-3 pr-lg-0 py-5"
            onClick={closeSubMenues}
            style={{ minHeight: '90vh'}}
        >

            <Sidebarnav />

            <main className="contentuser col-12 col-md-9 col-xl-8 mx-auto">

                <Mydata
                    user={props.user}
                    setUser={props.setUser}
                />

                <Route path={'/page/users/miscompras'}>
                    <Myshopping purchases={props.user.purchases} />
                </Route>

                <Route path={'/page/users/configuracioncuenta'}>
                    <Configaccount
                        user={props.user.user}
                        setUser={props.setUser}
                    />
                </Route>

                <Route path={'/page/users/mensajes'}>
                    <Messages
                        user={props.user}
                        setUser={props.setUser}
                        admin={props.admin}
                    />
                </Route>

                <Route path={'/page/users/favoritos'}>
                    <Favourite
                        user={props.user}
                        setUser={props.setUser}
                        admin={props.admin}
                        products={props.products}
                    />
                </Route>
            </main>

        </section>
    );
}
