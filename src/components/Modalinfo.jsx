import React from "react";
import { qS } from '../services';

export default function Modalinfo(props) {

    const closeModal = () => {

        qS('.container-modalinfo').classList.toggle('d-none');

        const div = qS('.modal-info div');

        div.classList.value = '';
        div.setAttribute('style','');

        qS('.modal-info header').classList.value = '';
        qS('.modal-info header i').classList.value = '';
        qS('.modal-info header p').classList.value = '';
        qS('.modal-info header p').innerHTML = '';

        qS('.modal-info section').classList.value = '';
        qS('.modal-info section p').classList.value = '';
        qS('.modal-info section p').innerHTML = '';
        qS('.modal-info section div').classList.value = '';
        qS('.modal-info section button').classList.value = '';

    }

    return (
        <div
            className="container-modalinfo d-none"
            style={{
                minHeight: document.getElementById('root').clientHeight,
                minWidth: document.getElementById('root').clientWidth,
                position: 'absolute',
                zIndex: 5
            }}
        >
            <div
                className={`modal-info w-100 d-flex justify-content-center align-items-center position-sticky`}
                style={{
                    top: '50%',
                    transform: `translate('0%',-50%)`,
                    zIndex: '5'
                }}
            >
                <div
                    className=''
                    style={{}}
                >
                    <header className=''>
                        <i className=''/>
                        <p className=''></p>
                    </header>
                    <section className=''>
                        <p className=''></p>
                        <div className=''>
                            <button
                                className=''
                                onClick={closeModal}
                            >
                                Cerrar
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
