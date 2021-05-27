import React from 'react'

export default function Loadingdata(props) {
    return (
        <div className="col-12 text-center">
            <div className="spinner-border" role="status">
                <span className="sr-only"></span>
            </div>
            <div className="title">
                <p>
                    {props.title ? props.title : 'Loading...'}
                </p>
            </div>
        </div>
    )
}
