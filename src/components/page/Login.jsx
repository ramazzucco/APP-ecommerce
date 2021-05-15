import React, { useEffect, useState } from "react";
import { urlbase } from "../../services/getInfoPage";
import Style from "../../style/login";
import { cancel, submit } from "../../services/handlerForm";

//Components.
import Form from "../form/Form";

export default function Login(props) {

    const [ showPass, setShowPass ] = useState(false)

    useEffect(() => {
        if(props.width < 768){
            document.querySelector(".container-modal.login").classList.add("overflow-auto")
        }
    },[props.width])

    const handlerChange = (e) => {
        if(e.target.classList.value.includes("text-danger")){
            const input = document.querySelector(`.login #${[e.target.name]}`);
            const error = document.querySelector(`.login .error.${[e.target.name]}`);

            input.classList.remove("border","border-danger","text-danger");

            if(error.innerHTML !== "") error.innerHTML = "";
        }

        e.target.name === "rememberme"
            ? props.dataPost.rememberme
                ? props.setDataPost({...props.dataPost, rememberme: !props.dataPost.rememberme})
                : props.setDataPost({...props.dataPost, rememberme: true})
            : props.setDataPost({...props.dataPost, [e.target.name]: e.target.value});
    };

    const handlerSubmit = async (e) => {
        e.preventDefault();

        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(props.dataPost),
        };

        const url = urlbase + "/api/apiUsers/login";

        submit(url, options, props.setUser, "login");

    };

    const handlerCancel = (setData) => {
        cancel("login")
        setData([]);
    };

    const login = Style(
        props.style,
        handlerSubmit,
        handlerCancel,
        handlerChange,
        props.width,
        props.setDataPost,
        showPass,
        setShowPass
    );

    return (
        <div className={login.container.className}>
            <div className={login.header.div}>
                <img
                    src={login.header.logo}
                    alt="logo de la marca"
                    className={login.header.classLogo}
                    width="100px"
                />
                <p className={login.header.className}>
                    {login.header.title}
                </p>
            </div>
            <div className={login.containerform.className}>
                <Form {...login} />
            </div>
        </div>
    )
}
