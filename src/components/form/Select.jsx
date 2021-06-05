import React from 'react'

export default function Select(props) {
    return (
        <div className={props.div}>
            <label htmlFor={props.label.htmlfor}>
                {props.label.title}
            </label>
            <select
                className={props.select.className}
                name={props.select.name}
                id={props.select.id}
                onChange={props.select.onChange}
            >
                {
                    props.select.options.map( (option, i) => {
                        return (
                            option.value === ''
                                ? (
                                    <option
                                    className={props.select.classNameOptions}
                                    key={i}
                                    value={option.value}
                                    disabled='true'
                                    selected
                                >
                                    {option.title}
                                </option>
                                )
                                : (
                                    <option
                                        className={props.select.classNameOptions}
                                        key={i}
                                        value={option.value}
                                    >
                                        {option.title}
                                    </option>
                                )
                        )
                    })
                }
            </select>
            <div
                className={
                    props.select.classNameError
                        ? props.select.classNameError + ' ' + props.select.error
                        : "d-flex justify-content-center align-items-center w-100 text-danger " + props.select.error
                }
                style={{fontSize: "0.9rem"}}
            ></div>
        </div>
    )
}
