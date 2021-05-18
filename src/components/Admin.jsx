import React, { useState, useEffect } from 'react'

export default function Admin(props) {
    // const [ themes, setThemes ] = useState([]);

    // useEffect(() => {
    //     setThemes(Themes);
    //     getSelectedTheme();
    // },[props.themePage])

    const handlerChange = (e) => {
        document.getElementById("root").classList.value = "";
        document.getElementById("root").classList.add(e.target.value);
        // props.setThemePage({ name: e.target.value })
        localStorage.setItem("theme",e.target.value)
    }

    const getSelectedTheme = () => {
        const selectTheme = document.querySelector(".theme#theme");

        
    }

    return (
        <div>
            <h1>ADMIN</h1>
            <div className="col-12 p-0 m-0 d-flex justify-content-center align-self-center">
                <select name="theme" id="theme" onChange={handlerChange} className="theme form-control text-center col-3 p-0">
                   
                </select>
            </div>
        </div>
    )
}
