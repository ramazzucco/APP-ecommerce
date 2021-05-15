import React from "react";

export default function Textarea(props) {
    return (
        <div className={props.div}>
            <label
                htmlFor={props.label.htmlfor}
                className={props.label.className}
            >
                {props.label.icon ? props.label.icon : ""}
                {props.label.title}
            </label>
            <textarea
                className={props.textarea.className}
                id={props.textarea.id}
                name={props.textarea.name}
                type={props.textarea.type}
                onChange={props.textarea.onChange}
                placeholder={props.textarea.placeholder}
                value={props.textarea.value}
                required={props.textarea.required}
            />
            <div
                className={
                    "d-flex justify-content-center align-items-center w-100 text-danger " +
                    props.textarea.error
                }
                style={{ fontSize: "0.9rem" }}
            ></div>
        </div>
    );
}
