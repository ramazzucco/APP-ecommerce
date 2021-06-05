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
                            className={`widget d-flex justify-content-start align-items-center border-${widget.type} rounded-lg py-3 pl-5 pl-sm-3 pl-md-4 pr-4
                                text-champagne element-sidebar-up mb-3 mb-md-0`
                            }
                        >
                            <i className={`fas ${widget.icon} text-${widget.type} fa-3x`}></i>
                            <div className='d-flex flex-column pl-5 pl-sm-3'>
                                <p className="title mb-1">{widget.text}</p>
                                <p className='h5 mb-0'>{widget.value}</p>
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
