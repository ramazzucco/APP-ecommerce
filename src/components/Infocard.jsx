import React from "react";
import { Link } from 'react-router-dom';

export default function Infocard(props) {
    return (
        props.datainfocards.map( (infocard, i) => {
            return (
                <div className={infocard.classnamecard} key={i}>
                    <div>
                        {
                            infocard.icons.map( (icon, i) => {
                                return <i className={icon} key={i}></i>
                            })
                        }
                    </div>
                    <p className={infocard.title.className}>
                        {infocard.title.content}
                    </p>
                    <p className={infocard.description.className}>
                        {infocard.description.content}
                    </p>
                    <Link to={infocard.link.to}>
                        {infocard.link.content}
                    </Link>
                </div>
            )
        })
    );
}
