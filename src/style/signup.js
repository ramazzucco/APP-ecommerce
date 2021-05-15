import { urlbase } from "../services/getInfoPage"

export default function Style(theme, handlerSubmit, handlerCancel, handlerChange, width, setData, showPass, setShowPass){
    const styles = [
        {
            id: "styledefault",
            backgroundcolor: {
                container: "bg-color-modal",
                containerform: "bg-color-main",
                headerdiv: width < 768 ? "bg-color-main" : "bg-naranja",
                header: "",
                inputdiv: "",
                inputlabel: "",
                inputinput: "",
                buttons: "",
                buttonsubmit: "",
                buttoncancel: ""
            },
            textcolor: {
                header: width < 768 ? "text-naranja" : "text-sombra-main-6",
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

    const classContainer = `container-modal signup w-100 d-none flex-md-row flex-wrap justify-content-center align-items-md-center align-content-center position-absolute ${backgroundcolor.container}`;
    const classContainerForm = `containerform ${theme !== "styledefault" ? "form1" : "col-12 col-md-7 py-4 shadow p-lg-5"} ${backgroundcolor.containerform} ${width < 768 ? "rounded-bottom" : "rounded"}`;

    const classHeaderDiv = `${theme !== "styledefault" ? "formheader" : "header col-12 col-md-3 p-md-3 p-lg-5 d-flex flex-md-column-reverse flex-wrap justify-content-start mb-0"} ${backgroundcolor.headerdiv} ${width < 768 ? "rounded-top" : "rounded-left"}`;
    const classLogo = `mx-auto ${width < 768 ? "w-25" : "w-100 mb-5"}`;
    const classHeader = `w-100 h3 text-uppercase text-center letter-space-2 p-0 p-md-3 my-2 my-md-5 rounded-top ${textcolor.header}`;

    const classForm = `${theme !== "styledefault" ? "" : "p-2 my-3 mt-md-5 mb-md-3 d-flex flex-wrap justify-content-center align-items-center"}`;
    const classInputDiv = `${theme !== "styledefault" ? "group px-3" : "col-12 col-md-6 p-0 d-flex flex-wrap justify-content-center mb-3"}`;
    const classInputLabel = `${theme === "styledefault" ? "col-11 p-0 text-left align-self-center d-none" : ""} text-capitalize ${backgroundcolor.inputlabel} ${textcolor.inputlabel}`
    const classInputInput = `${theme === "styledefault" ? "pb-2 border-top-0 border-left-0 border-right-0 bg-transparent col-11 mb-3 p-0 text-center" : ""} ${backgroundcolor.inputinput} ${textcolor.inputinput}`;

    const classButtons = `col-11 col-sm-8 col-md-11 p-0 d-flex flex-wrap justify-content-center mt-3 ${backgroundcolor.buttons}`;
    const classButtonSubmit = `${theme !== "styledefault" ? "" : "rm-btn rm-orange"} col-sm-12 col-lg-3 my-1 letter-space ${backgroundcolor.buttonsubmit} ${textcolor.buttonsubmit}`;
    const classButtonCanel = `${theme !== "styledefault" ? "" : "rm-btn-outline rm-orange"} col-sm-12 col-lg-3 my-1 ml-0 ml-lg-5 letter-space ${backgroundcolor.buttoncancel} ${textcolor.buttoncancel}`;

    const signupdata = {
        container: {
            className: classContainer
        },
        containerform: {
            className: classContainerForm
        },
        header: {
            div: classHeaderDiv,
            className: classHeader,
            logo: urlbase + (width < 768 ? "/images/logo.png" : "/images/fill_form.svg"),
            classLogo: classLogo,
            title: "signup"
        },
        form: {
            id: "signup",
            className: classForm,
            link: {
                classname: {
                    div: "formlink col-12 p-0 mb-3 text-center",
                    link: "",
                },
                url: "/terminosycondiciones",
                title: "Ver terminos y condiciones"
            },
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
                        htmlfor: "first_name",
                        title: "nombre",
                    },
                    input: {
                        className: classInputInput,
                        id: "first_name",
                        name: "first_name",
                        type: "text",
                        placeholder: "Nombre *",
                        required: true,
                        error: "error first_name",
                        onChange: handlerChange,
                    },
                }
            },
            {
                id: "input",
                input: {
                    div: classInputDiv,
                    label: {
                        className: classInputLabel,
                        htmlfor: "last_name",
                        title: "apellido",
                    },
                    input: {
                        className: classInputInput,
                        id: "last_name",
                        name: "last_name",
                        type: "text",
                        placeholder: "Apellido *",
                        required: true,
                        error: "error last_name",
                        onChange: handlerChange,
                    },
                }
            },
            {
                id: "input",
                input: {
                    div: classInputDiv,
                    label: {
                        className: classInputLabel,
                        htmlfor: "email",
                        title: "email",
                    },
                    input: {
                        className: classInputInput,
                        id: "email",
                        name: "email",
                        type: "email",
                        placeholder: "Email *",
                        required: true,
                        error: "error email",
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
                            "col-11 p-0 text-left align-self-center d-none","col-11 position-absolute text-right"
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
                        placeholder: "Password *",
                        required: true,
                        error: "error password",
                        onChange: handlerChange,
                    },
                }
            },
            {
                id: "input",
                input: {
                    div: classInputDiv,
                    label: {
                        className: classInputLabel,
                        htmlfor: "address",
                        title: "direccion",
                    },
                    input: {
                        className: classInputInput,
                        id: "address",
                        name: "address",
                        type: "text",
                        placeholder: "Direccion",
                        required: false,
                        error: "error address",
                        onChange: handlerChange,
                    },
                },
            },
            {
                id: "input",
                input: {
                    div: classInputDiv,
                    label: {
                        className: classInputLabel,
                        htmlfor: "city",
                        title: "ciudad",
                    },
                    input: {
                        className: classInputInput,
                        id: "city",
                        name: "city",
                        type: "text",
                        placeholder: "Ciudad",
                        required: false,
                        error: "error city",
                        onChange: handlerChange,
                    },
                }
            },
            {
                id: "select",
                input: {
                    div: classInputDiv.replace("col-md-6",""),
                    label: {
                        className: classInputLabel.replace("d-none","d-flex").replace("col-11","d-block")
                            .replace("text-left","justify-content-center") + ' avatar',
                        htmlfor: "avatar",
                        title: "Imagen",
                        icon: <i className="fas fa-upload align-self-center mr-3"></i>
                    },
                    input: {
                        className: classInputInput,
                        id: "avatar",
                        name: "avatar",
                        type: "file",
                        placeholder: "",
                        required: false,
                        error: "error avatar",
                        onChange: handlerChange,
                    },
                }
            },
            {
                id: "input",
                input: {
                    div: classInputDiv.replace("col-md-6",""),
                    label: {
                        className: "labelcheckbox align-sefl-center",
                        htmlfor: "terminosycondiciones",
                        title: "Aceptar terminos y condiciones"
                    },
                    input: {
                        className: classInputInput.replace("col-11 mb-3","ml-3 mb-1") + " checkbox-1",
                        id: "terminosycondiciones",
                        name: "terminosycondiciones",
                        type: "checkbox",
                        placeholder: "",
                        onChange: handlerChange,
                        error: "error terminosycondiciones",
                    },
                }
            },
        ]
    }

    return signupdata;
}