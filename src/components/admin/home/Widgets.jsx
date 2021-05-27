import React from "react";

// Components.
import Loadingdata from '../../Loadingdata';

export default function Widgets(props) {
    return (
        <div className="widgets col-12 p-0 d-flex flex-wrap justify-content-between align-items-start">
            {props.widgets && props.widgets.length ? (
                props.widgets.map((widget, i) => {
                    return (
                        <div
                            key={i}
                            className={`widget d-flex justify-content-center border-${widget.type} rounded-lg py-2 px-4
                                bg-champagne-contrast text-${widget.type} element-up mb-3 mb-md-0`
                            }
                        >
                            <div>
                                <p className="title mb-1">{widget.text}</p>
                                <p className='h5'>
                                    <i className={`fas ${widget.icon} mr-3`}></i>
                                    {widget.value}
                                </p>
                            </div>
                        </div>
                    );
                })
            ) : (
                [1,2,3].map( (element, i) => {
                    return (
                        <div className="col-3 d-flex py-4 text-metallic-seaweed" key={i}>
                            <Loadingdata />
                        </div>
                    )
                })
            )}
        </div>
    );
}
