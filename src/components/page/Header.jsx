import React, { useState, useEffect } from "react";
import { urlbase } from "../../services/getInfoPage";
import Styleheader from "../../style/header";

// Components.
import Header1 from "./Header1";

export default function Header(props) {
    const [ path, setPath ] = useState(window.location.pathname);

    useEffect(() => {
        setPath(window.location.pathname);
    },[path])

    const showlogin = () => {
        document.querySelector("body").classList.toggle("overflow-hidden");
        document.querySelector(".login").classList.replace("d-none","d-flex");
    }

    const showsignup = () => {
        document.querySelector("body").classList.toggle("overflow-hidden");
        document.querySelector(".signup").classList.replace("d-none","d-flex");
    }

    const handlerButtonMenu = () => {
        document.querySelector(".dropdown").classList.toggle("show");
        document.querySelector(".usersheader").classList.toggle("d-none");
        document.querySelector(".usersheader").classList.toggle("d-flex");
    }

    const logout = async () => {
        document.querySelector(".submenu.avatar").classList.toggle("d-none");

        localStorage.clear();

        if(props.user.user.tokenhashed){

            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(props.user.user),
            };

            const request = await fetch(urlbase + '/api/apiUsers/logout',options)

            const response = await request.json();

            console.log(response);
        }

        if(props.user.user.status === 2) props.setAdmin({});

        props.setUser()
    }

    const Style = Styleheader(
        props, showlogin, showsignup, handlerButtonMenu, logout
    );

    const header = Style.header;
    const categories = Style.categories;
    const buttonmenu = Style.buttonmenu;
    const avatar = Style.avatar;
    const myprofile = Style.myprofile;

    const deletepathlinkswithsubmenues = (width) => {
        if(width > 768){
            header.links.data.forEach( link => {
                if(link.submenu) delete link.link;
            })
            myprofile.forEach( link => {
                if(link.submenu) delete link.link;
            })
            delete avatar.link
        }
    }

    deletepathlinkswithsubmenues(props.width);

    const allProps = {
        user: props.user ? props.user.user : "",
        setUser: props.setUser,
        width: props.width,
        styleheader: header,
        categories: categories,
        products: props.products,
        buttonmenu: buttonmenu,
        avatar: avatar,
        myprofile: myprofile,
        showlogin: showlogin,
        showsignup: showsignup,
        items: props.items,
        setItems: props.setItems
    }

    return (
        <header className={header.header}>
            <Header1 {...allProps} />
        </header>
    );
}
