import React from "react";
import { Link } from "react-router-dom";

//Components.
import Input from "./Input";
import Select from "./Select";
import Textarea from "./Textarea";

export default function Form(props) {
    return (
        <form
            id={props.form.id}
            className={props.form.className}
            onSubmit={props.form.onSubmit}
        >
            {
                props.fields.map((field, i) => {
                    return field.input ? <Input {...field.input} key={i} /> : "";
                })
            }
            {
                props.fields.map((field, i) => {
                    return field.select ? <Select {...field.select} key={i} /> : "";
                })
            }
            {
                props.fields.map((field, i) => {
                    return field.textarea ?  <Textarea {...field.textarea} key={i} /> : "";
                })
            }
            <div className={props.form.link ? props.form.link.classname.div : ""}>
                <Link
                    to={props.form.link ? props.form.link.url : ""}
                    className={props.form.link ? props.form.link.classname.link : ""}
                >
                    {props.form.link ? props.form.link.title : ""}
                </Link>
            </div>
            <div
                className={props.form.buttons.className}
                style={props.form.buttons.style ? props.form.buttons.style : {}}
            >
                <button
                    type="submit"
                    className={props.form.buttons.submit.className}
                >
                    Enviar
                </button>
                {
                    props.form.buttons.button
                        ? <button
                            type="button"
                            className={props.form.buttons.button.className}
                            onClick={props.form.buttons.button.onClick}
                        >
                            Cancelar
                        </button>
                        : ''
                }
            </div>
        </form>
    );
}
