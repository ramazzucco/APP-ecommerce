import { urlbase } from "../services/getInfoPage"

export default function Style(theme, handlerSubmit, handlerCancel, handlerChange, width, setData,showPass, setShowPass){
    const styles = [
        {
            id: "styledefault",
            backgroundcolor: {
                container: "bg-color-modal",
                containerform: "bg-color-main",
                headerdiv: `${width < 768 ? "bg-color-main" : "bg-naranja"}`,
                header: "",
                inputdiv: "",
                inputlabel: "",
                inputinput: "",
                buttons: "",
                buttonsubmit: "",
                buttoncancel: ""
            },
            textcolor: {
                header: width < 768 ? "text-naranja" : "text-color-main",
                inputlabel: "text-color-main",
                inputinput: "text-color-main",
                buttonsubmit: "",
                buttoncancel: ""
            }
        },
        {
            id: "light",
            backgroundcolor: {
                container: "bg-color-modal",
                containerform: "bg-info",
                headerdiv: "",header: "",inputdiv: "",inputlabel: "",inputinput: "",buttons: "",
                buttonsubmit: "btn-form submit",
                buttoncancel:"btn-form cancel"
            },
            textcolor: {
                header: "text-light",
                inputlabel: "",inputinput: "",buttonsubmit: "",buttoncancel: ""
            }
        },
        {
            id: "dark",
            backgroundcolor: {
                container: "bg-color-modal",
                containerform: "bg-dark",
                headerdiv: "",header: "",inputdiv: "",inputlabel: "",inputinput: "",buttons: "",
                buttonsubmit: "btn-form-outline submit",
                buttoncancel:"btn-form-outline cancel"
            },
            textcolor: {
                header: "text-light",
                inputlabel: "",inputinput: "",buttonsubmit: "",buttoncancel: ""
            }
        }
    ]

    const backgroundcolor = styles.filter( style => style.id === theme )[0].backgroundcolor;
    const textcolor = styles.filter( style => style.id === theme )[0].textcolor;

    const classContainer = `container-modal login w-100 d-none flex-md-row flex-wrap justify-content-center align-items-md-center align-content-center position-absolute ${backgroundcolor.container}`;
    const classContainerForm = `containerform ${theme !== "styledefault" ? "form1" : "col-11 col-md-7 shadow p-lg-5"} ${backgroundcolor.containerform} ${width < 768 ? "rounded-bottom" : "rounded"}`;

    const classHeaderDiv = `${theme !== "styledefault" ? "formheader" : "col-11 col-md-3 p-md-3 p-lg-5 d-flex flex-md-column-reverse flex-wrap justify-content-end mb-0"} ${backgroundcolor.headerdiv} ${width < 768 ? "rounded-top" : "rounded-left"}`;
    const classLogo = `mx-auto ${width < 768 ? "w-25" : "w-100"}`;
    const classHeader = `w-100 h3 text-uppercase text-center letter-space-2 p-3 mb-md-3 rounded-top ${textcolor.header}`;

    const classForm = `${theme !== "styledefault" ? "" : "px-2 py-5 p-md-5 d-flex flex-column justify-content-center align-items-center"}`;
    const classInputDiv = `${theme !== "styledefault" ? "group px-3" : "col-12 col-sm-8 col-md-12 col-lg-8 d-flex flex-wrap justify-content-center mb-3"}`;
    const classInputLabel = `${theme === "styledefault" ? "col-12 mb-0 p-0 pr-5 text-right align-self-center d-none" : ""} text-capitalize ${backgroundcolor.inputlabel} ${textcolor.inputlabel}`
    const classInputInput = `${theme === "styledefault" ? "pb-2 border-top-0 border-left-0 border-right-0 bg-transparent col-12 mb-3 p-0 text-center" : ""} ${backgroundcolor.inputinput} ${textcolor.inputinput}`;

    const classButtons = `col-11 col-sm-8 col-md-11 p-0 d-flex flex-wrap justify-content-center mt-3 ${backgroundcolor.buttons}`;
    const classButtonSubmit = `${theme !== "styledefault" ? "" : "rm-btn rm-orange"} col-sm-12 col-lg-3 my-1 letter-space ${backgroundcolor.buttonsubmit} ${textcolor.buttonsubmit}`;
    const classButtonCanel = `${theme !== "styledefault" ? "" : "rm-btn-outline rm-orange"} col-sm-12 col-lg-3 my-1 ml-0 ml-lg-5 letter-space ${backgroundcolor.buttoncancel} ${textcolor.buttoncancel}`;

    const logindata = {
        container: {
            className: classContainer
        },
        containerform: {
            className: classContainerForm
        },
        header: {
            div: classHeaderDiv,
            className: classHeader,
            logo: urlbase + (width < 768 ? "/images/logo.png" : "/images/login.svg"),
            classLogo: classLogo,
            title: "login"
        },
        form: {
            id: "login",
            className: classForm,
            onSubmit: handlerSubmit,
            buttons: {
                className: classButtons,
                submit: {
                    className: classButtonSubmit
                },
                button: {
                    className: classButtonCanel,
                    onClick: () => handlerCancel(setData),
                }
            }
        },
        fields: [
            {
                id: "input",
                input: {
                    div: classInputDiv,
                    label: {
                        className: classInputLabel,
                        htmlfor: "email",
                        title: "Email",
                    },
                    input: {
                        className: classInputInput + " mt-3",
                        id: "email",
                        name: "email",
                        type: "email",
                        placeholder: "Email",
                        error: "error email",
                        required: true,
                        onChange: handlerChange,
                    },
                }
            },
            {
                id: "input",
                input: {
                    div: classInputDiv,
                    label: {
                        className: classInputLabel.replace(
                            "col-12 mb-0 p-0 pr-5 text-right align-self-center d-none","col-12 position-absolute text-right"
                        ),
                        htmlfor: "password",
                        title: <div>
                            <i className={`far fa-eye ${showPass ? "d-none" : ""}`} onClick={() => setShowPass(!showPass)}></i>
                            <i className={`far fa-eye-slash ${showPass ? "" : "d-none"}`} onClick={() => setShowPass(!showPass)}></i>
                        </div>,
                    },
                    input: {
                        className: classInputInput,
                        id: "password",
                        name: "password",
                        type: showPass ? "text" : "password",
                        placeholder: "Contraseña",
                        error: "error password",
                        required: true,
                        onChange: handlerChange,
                    },
                }
            },
            {
                id: "input",
                input: {
                    div: classInputDiv.replace("col-12 col-sm-8 col-md-12 col-lg-8",""),
                    label: {
                        className: "labelcheckbox align-sefl-center",
                        htmlfor: "rememberme",
                        title: "Recordar sesion",
                    },
                    input: {
                        className: classInputInput.replace("col-12 mb-3","ml-3 mb-1") + " checkbox-1",
                        id: "rememberme",
                        name: "rememberme",
                        type: "checkbox",
                        placeholder: "",
                        onChange: handlerChange,
                        error: "error rememberme",
                    },
                }
            },
        ]
    }

    return logindata;
}
