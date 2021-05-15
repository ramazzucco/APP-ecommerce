import React from 'react'

export default function Button(props) {
    return (
        <button
            id={props.id}
            onClick={props.onClick}
            type={props.type}
            className={props.className}
        >
            {props.title}
            {props.content}
        </button>
    )
}
