import React from "react";
import { urlbase } from '../../../services/getInfoPage';

// Components.
import Loadingdata from "../../Loadingdata";

export default function Messages(props) {

    const userswhithmessages = [...new Set(props.userswhithmessages)].filter( user => user.status !== 2)

    return (
        <div className="messages col-12 p-3 element-up">
            <header
                className="d-flex justify-content-between align-items-center pl-2 pb-2 mb-1 text-left text-metallic-seaweed"
                style={{ borderBottom: "1px solid var(--metallic-seaweed)" }}
            >
                Mensajes
                <i class="fas fa-sync-alt" onClick={props.refreshMessages}></i>
            </header>
            <section className="p-3">
                {
                userswhithmessages.length ?
                    userswhithmessages.map((user, i) => {
                        return (
                            <div className="user d-flex align-items-center my-2" key={i}>
                                <div
                                    className="image rounded-circle overflow-hidden d-flex justify-content-center align-items-center"
                                    style={{ width: "33px", height: "33px" }}
                                >
                                    <div className="incommingmessage bg-success rounded-circle">
                                        <p className='mb-0'></p>
                                    </div>
                                    <img
                                        src={`${urlbase}/images/avatars/${user.avatar}`}
                                        alt={`${user.first_name} ${user.last_name}`}
                                        width="44px"
                                        height="44px"
                                        style={{
                                            objectFit: "contain",
                                            borderRadius: "50%",
                                        }}
                                    />
                                </div>
                                <div
                                    className="info d-flex flex-column align-items-start"
                                    style={{ fontSize: "1rem" }}
                                >
                                    <p className="pl-2 text-metallic-seaweed mb-0">
                                        {`${user.first_name} ${user.last_name}`}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                    : <div className="d-flex py-4 text-metallic-seaweed">
                        <Loadingdata />
                    </div>
                }
            </section>
        </div>
    );
}
