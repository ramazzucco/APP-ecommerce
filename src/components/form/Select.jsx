import React from 'react'

export default function Select(props) {
    return (
        <div className="formgroup">
            <label htmlFor={props.label.htmlfor}>
                {props.label.title}
            </label>
            <select
                name={props.select.name}
                id={props.select.id}
                onChange={props.select.onChange}
            >
                {
                    props.select.options.map( (option, i) => {
                        return (
                            <option
                                key={i}
                                value={option.value}
                            >
                                {option.title}
                            </option>
                        )
                    })
                }
            </select>
        </div>
    )
}
