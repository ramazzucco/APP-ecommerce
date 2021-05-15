import React from "react";
import { Link } from 'react-router-dom';

export default function Links(props) {
    return (
        <div className={props.data.classdiv} style={props.style}>
            {props.data.data.map((link, i) => {
                return (
                    <Link
                        to={link.link}
                        id={link.title}
                        key={i}
                        className={props.data.classlink}
                        onClick={link.onClick ? link.onClick : () => {}}
                    >
                        {link.title}
                        {link.icon}
                    </Link>
                );
            })}
        </div>
    );
}
