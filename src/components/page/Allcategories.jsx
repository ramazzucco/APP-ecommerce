import React from "react";
import { urlbase } from "../../services/getInfoPage";
import { closeSubMenues } from "../../services";
import { Link } from "react-router-dom";

export default function Allcategories(props) {
    return (
        <section
            className="container-fluid about bg-color-main py-5"
            onClick={closeSubMenues}
        >
            {props.categories.map((category) => {
                return (
                    <div className="d-flex col-10 col-sm-8 p-3 mx-auto my-5 shadow-lg bg-white rounded">
                        <Link
                            to={`/page/${category.name}`}
                            className='d-flex col-12 p-0'
                        >
                            <div className="image d-flex justify-content-center col-3 p-0">
                                <img
                                    src={urlbase + `/images/${category.name}.png`}
                                    alt={category.name + ".png"}
                                />
                            </div>
                            <div className='category d-flex justify-content-center align-items-center col-9 p-0'>
                                <p className='h2 text-capitalize'>
                                    {category.name}
                                </p>
                            </div>
                        </Link>
                    </div>
                );
            })}
        </section>
    );
}
