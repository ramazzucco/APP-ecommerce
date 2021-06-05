import React from 'react'

export default function Input(props) {
    return (
        <div className={props.div} style={props.divstyle ? props.divstyle : {}}>
            {
                props.input.type === "checkbox"
                    ? (
                        <React.Fragment>
                            <p className={props.label.className}>
                                {props.label.title}
                            </p>
                            <div className={props.input.className}>
                                <input
                                    type={props.input.type}
                                    id={props.input.id}
                                    name={props.input.name}
                                    value={props.input.value ? props.input.value : ''}
                                    onChange={props.input.onChange}
                                />
                                <label htmlFor={props.label.htmlfor}></label>
                            </div>
                        </React.Fragment>
                    )
                    : (
                        <React.Fragment>
                            <label
                                htmlFor={props.label.htmlfor}
                                className={props.label.className}
                            >
                                {props.label.icon ? props.label.icon : ""}
                                {props.label.title}
                            </label>
                            <i className={props.input.icon ? props.input.icon : ''}></i>
                            <input
                                className={props.input.className}
                                id={props.input.id}
                                name={props.input.name}
                                type={props.input.type}
                                onChange={props.input.onChange}
                                placeholder={props.input.placeholder}
                                value={props.input.value}
                                required={props.input.required}
                                disabled={props.input.disabled}
                            />
                        </React.Fragment>
                    )
            }
            <div
                className={
                    props.input.classNameError
                        ? props.input.classNameError + ' ' + props.input.error
                        : "d-flex justify-content-center align-items-center w-100 text-danger " + props.input.error
                }
                style={{fontSize: "0.9rem"}}
            ></div>
        </div>
    )
}
