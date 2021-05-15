import React from 'react'
import { Link } from 'react-router-dom'
import { closeSubMenues } from '../../services'
import { urlbase } from '../../services/getInfoPage'

export default function About(props) {

    const ourteam = [
        {
            fullname: 'Eddwar Snowdeen',
            socialnetworks: [
                {
                    name: 'facebook',
                    url: 'https://www.facebook.com/Imsnowdeen'
                },
                {
                    name: 'instagram',
                    url: 'https://www.instagram.com/EsnowdeenOk'
                }
            ],
            workarea: 'programacion',
            comment: 'Es la mejor empresa en la que tuve la oportunidad de trabajar.'
        },
        {
            fullname: 'Joldan Berfolt',
            socialnetworks: [
                {
                    name: 'facebook',
                    url: 'https://www.facebook.com/Imberfolt'
                },
                {
                    name: 'instagram',
                    url: 'https://www.instagram.com/JbelfortOk'
                }
            ],
            workarea: 'ventas',
            comment: 'Estoy muy agradecido con e-commerce por haberme enseñado tanto, las mejores estrategias de ventas las e desarrollado aqui.'
        },
        {
            fullname: 'Jhon Doe',
            socialnetworks: [
                {
                    name: 'facebook',
                    url: 'https://www.facebook.com/Imdoe'
                },
                {
                    name: 'instagram',
                    url: 'https://www.instagram.com/JdoeOk'
                }
            ],
            workarea: 'rrhh',
            comment: 'Lo que mas adoro es el grupo de trabajo, siento como si fueramos una familia.'
        },
    ]

    return (
        <section
            className='container-fluid about bg-color-main py-5'
            onClick={closeSubMenues}
            style={{minHeight: '90vh'}}
        >
            <div className="whoweare col-8 p-5 mx-auto my-5 bg-white border rounded-lg position-relative">
                <h1 className='display-3 bg-main-contrast-2 position-absolute font-weight-bolder'
                    style={{
                        top: `${props.width < 768 ? '-23px' : '-50px'}`,
                        left: '15px',
                        textShadow: '1px 1px 3px black',
                        fontSize: `${props.width < 768 ? '2rem' : '4rem'}`,
                        background: 'linear-gradient(180deg, var(--bg-main-sombra-1) 40%, white 60%)'
                    }}
                >
                    Quienes somos ?
                </h1>
                <p className='text-muted'>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae voluptatum sit, possimus, odio iure itaque ipsa, suscipit vel laborum perferendis repellat beatae rem voluptas? Quas, commodi! Pariatur nam quaerat laudantium?
                    <br/>
                    <br/>
                    Accusamus animi adipisci reiciendis exercitationem accusantium eveniet in saepe rem ipsum vitae delectus voluptates, sint at dolores repellat aliquid deleniti architecto sequi ex quasi unde cumque reprehenderit sed. Ipsa, deserunt.
                    <br/>
                    Hic molestias est impedit, amet cupiditate vitae praesentium perferendis enim inventore nobis, mollitia deserunt, dolorum minus. Voluptates harum repudiandae provident odio eligendi. Magnam illo repellendus quaerat quo totam, nihil quidem?
                    <br/>
                    Vitae ex officiis id, commodi, molestias praesentium enim eligendi fugiat nam quisquam quia, error itaque et hic nulla fugit! Delectus sequi aspernatur placeat excepturi eum impedit alias inventore beatae molestiae.
                    <br/>
                    <br/>
                    Illum hic magni optio, quae dolorum vel non asperiores itaque qui eligendi, ducimus atque esse maxime? Provident hic veniam deleniti. Aliquid possimus quibusdam laboriosam tempore nam. Odit non impedit consectetur.
                </p>
            </div>
            <div className="ourteam col-10 col-lg-12 p-2 p-md-5 mx-auto my-5 bg-main-sombra-2 border rounded-lg">
                <h1
                    className='display-4 col-12 p-0 bg-main-contrast-1 text-center font-weight-bold'
                    style={{
                        textShadow: '1px 1px 3px var(--bg-main-sombra-4)',
                        fontSize: `${props.width < 768 ? '2rem' : '4rem'}`,
                    }}
                >
                    Nuestro equipo
                </h1>
                <div className="employe d-flex flex-wrap justify-content-around mt-5">
                    {
                        ourteam.map( employe => {
                            return (
                                <div className='col-8 col-sm-5 col-lg-3 p-3 pt-5 mb-3 d-flex flex-column align-items-center justify-content-around bg-main-sombra-3 rounded-lg shadow-lg'>
                                    <div className="dataemplye w-100 bg-main-sombra-2 border rounded-pill text-center pt-4 pb-3 px-4 position-relative">
                                        <img
                                            className='position-absolute'
                                            src={urlbase + '/images/avatars/avatardefault.png'}
                                            alt={`foto de ${employe.fullname}`}
                                            style={{width: '66px', top: '-10%', left: '50%', transform: 'translate(-50%,-50%)'}}
                                        />
                                        <p className='font-weight-bold mb-0'>
                                            {employe.fullname}
                                        </p>
                                        <p className='font-weight-lighter mb-0 text-capitalize'>
                                            {employe.workarea}
                                        </p>
                                    </div>
                                    <cite className='text-center'>
                                        "{employe.comment}"
                                    </cite>
                                    <div className="socialnetworks">
                                        {
                                            employe.socialnetworks.map( sn => {
                                                return (
                                                    <Link to={sn.url}>
                                                        <i className={`fab fa-${sn.name} fa-2x`}></i>
                                                    </Link>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}
