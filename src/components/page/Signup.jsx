import React, { useEffect, useState } from "react";
import Style from "../../style/signup";
import { cancel, submit } from "../../services/handlerForm";

//Components.
import Form from "../form/Form";
import { urlbase } from "../../services/getInfoPage";

export default function Signup(props) {

    const [ showPass, setShowPass ] = useState(false)

    useEffect(() => {
        if(props.width < 768){
            document.querySelector(".container-modal.signup").classList.add("overflow-auto");
        }
    },[props.width])

    const iconError = `<i class="far fa-times-circle mr-3"></i>`;

    const handlerChange = (e) => {
        if(e.target.classList.value.includes("text-danger")){
            const input = document.querySelector(`.signup #${[e.target.name]}`);
            const error = document.querySelector(`.signup .error.${[e.target.name]}`);

            input.classList.remove("border","border-danger","text-danger");

            if(error.innerHTML !== "") error.innerHTML = "";
        }

        if(e.target.attributes.id.value === "terminosycondiciones"){
            document.querySelector(".signup .labelcheckbox").classList.remove("border-bottom","border-danger","text-danger");
            document.querySelector(`.signup .error.${[e.target.name]}`).innerHTML = "";
        }

        if(e.target.name === "avatar"){
            console.log(e.target)

            props.setDataPost({...props.dataPost, [e.target.name]: e.target.file})

            const label = document.querySelector('form#signup label.avatar');

            label.innerHTML = label.innerHTML + `<p class='border-left border-secondary text-muted mb-0 ml-3 pl-3'>
                ${e.target.files[0].name}
            </p>`
        } else {
            e.target.name === "terminosycondiciones"
                ? props.dataPost.terminosycondiciones
                    ? props.setDataPost({...props.dataPost, terminosycondiciones: !props.dataPost.terminosycondiciones})
                    : props.setDataPost({...props.dataPost, terminosycondiciones: true})
                : props.setDataPost({...props.dataPost, [e.target.name]: e.target.value});
        }
    }

    const handlerSubmit = async (e) => {
        e.preventDefault();

        if(!props.dataPost.terminosycondiciones){
            document.querySelector(".signup .labelcheckbox").classList.add("border-bottom","border-danger","text-danger");
            document.querySelector(".signup .terminosycondiciones").innerHTML = iconError + "Debe aceptar los terminos y condiciones"
        } else {

            const formdata = new FormData(document.querySelector("form#signup"));

            formdata.append('status',0);

            const url = urlbase + "/api/apiUsers/register";

            const options = {
                method: "POST",
                body: formdata
            }

            submit(url, options, props.setUser, "signup");

        }
    }

    const handlerCancel = (setData) => {
        cancel("signup")
        setData([]);
    };

    const signup = Style(
        props.style,
        handlerSubmit,
        handlerCancel,
        handlerChange,
        props.width,
        props.setDataPost,
        showPass,
        setShowPass
    )

    return (
        <div className={signup.container.className}>
            <div className={signup.header.div}>
                <img
                    src={signup.header.logo}
                    alt="logo de la marca"
                    className={signup.header.classLogo}
                />
                <p className={signup.header.className}>
                    {signup.header.title}
                </p>
            </div>
            <div className={signup.containerform.className}>
                <Form {...signup} />
            </div>
        </div>
    );
}
