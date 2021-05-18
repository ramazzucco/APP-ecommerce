import React from 'react'
import { closeSubMenues } from '../../services'

export default function Faq(props) {

    const showFaq = (item) => {
        const itemfaq = document.querySelector(`.${item} .content`);
        const arrow = document.querySelector(`.${item} .header i`);

            itemfaq.className.includes('d-none')
                ? itemfaq.classList.replace('d-none','d-flex')
                : itemfaq.classList.replace('d-flex','d-none');

            arrow.className.includes('fa-chevron-up')
                ? arrow.classList.replace('fa-chevron-up','fa-chevron-down')
                : arrow.classList.replace('fa-chevron-down','fa-chevron-up');

    }

    const faqs = [
        {
            className:{
                faq: 'tycusuarios rounded-lg',
                header: 'header d-flex p-3 bg-white border pointer',
                title: 'title',
                content: 'content d-none bg-color-main p-5 border-left border-right'
            },
            title: 'Terminos y condiciones de usuario.',
            content: <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex dicta recusandae porro deleniti impedit vel facere consequatur, illum quae inventore autem eum maxime fugit quo quis hic, dolorum earum soluta?
            Repudiandae voluptatem non iusto. Consequatur tempore dolore saepe hic dolor at dolorum similique. Accusamus repellendus aliquid eum, qui voluptatem assumenda consectetur dolores modi expedita, cupiditate enim dolore ea perspiciatis natus?
            <br/><br/>
            In quam tempora voluptates, nemo eligendi nisi iste! At eum quis corrupti facilis nihil alias. Dicta veritatis asperiores accusantium, iusto animi eveniet odio neque eaque, repellendus qui autem repellat accusamus?
            Minus, accusantium! Tenetur labore molestiae molestias similique ducimus sed autem voluptatum? Enim sed adipisci tempora eligendi facere? Id voluptatibus porro odit maxime eos laudantium? Beatae animi fugit voluptatum laboriosam libero!
            Nobis natus quisquam ipsa fugiat iure aut quaerat sequi incidunt eos labore voluptates atque magnam esse modi, assumenda eaque quibusdam architecto iusto! Aspernatur amet animi officiis nam magni? Voluptates, porro?</p>,
            onclick:() => showFaq('tycusuarios')
        },
        {
            className:{
                faq: 'condicionesdeusopagina rounded-lg',
                header: 'header d-flex p-3 bg-white border pointer',
                title: 'title',
                content: 'content d-none bg-color-main p-5 border-left border-right'
            },
            title: 'Condiciones de uso de la pagina.',
            content: <p>In quam tempora voluptates, nemo eligendi nisi iste! At eum quis corrupti facilis nihil alias. Dicta veritatis asperiores accusantium, iusto animi eveniet odio neque eaque, repellendus qui autem repellat accusamus?
            Minus, accusantium! Tenetur labore molestiae molestias similique ducimus sed autem voluptatum? Enim sed adipisci tempora eligendi facere? Id voluptatibus porro odit maxime eos laudantium? Beatae animi fugit voluptatum laboriosam libero!
            <br/><br/>
            Nobis natus quisquam ipsa fugiat iure aut quaerat sequi incidunt eos labore voluptates atque magnam esse modi, assumenda eaque quibusdam architecto iusto! Aspernatur amet animi officiis nam magni? Voluptates, porro?In quam tempora voluptates, nemo eligendi nisi iste! At eum quis corrupti facilis nihil alias. Dicta veritatis asperiores accusantium, iusto animi eveniet odio neque eaque, repellendus qui autem repellat accusamus?
            Minus, accusantium! Tenetur labore molestiae molestias similique ducimus sed autem voluptatum? Enim sed adipisci tempora eligendi facere? Id voluptatibus porro odit maxime eos laudantium? Beatae animi fugit voluptatum laboriosam libero!
            <br/><br/>
            Nobis natus quisquam ipsa fugiat iure aut quaerat sequi incidunt eos labore voluptates atque magnam esse modi, assumenda eaque quibusdam architecto iusto! Aspernatur amet animi officiis nam magni? Voluptates, porro?</p>,
            onclick:() => showFaq('condicionesdeusopagina')
        },
        {
            className:{
                faq: 'crypto rounded-lg',
                header: 'header d-flex p-3 bg-white border pointer',
                title: 'title',
                content: 'content d-none bg-color-main p-5 border-left border-right'
            },
            title: 'Politicas de pago con crypto monedas.',
            content: <p>In quam tempora voluptates, nemo eligendi nisi iste! At eum quis corrupti facilis nihil alias. Dicta veritatis asperiores accusantium, iusto animi eveniet odio neque eaque, repellendus qui autem repellat accusamus?
            Minus, accusantium! Tenetur labore molestiae molestias similique ducimus sed autem voluptatum? Enim sed adipisci tempora eligendi facere? Id voluptatibus porro odit maxime eos laudantium? Beatae animi fugit voluptatum laboriosam libero!
            <br/><br/>
            Nobis natus quisquam ipsa fugiat iure aut quaerat sequi incidunt eos labore voluptates atque magnam esse modi, assumenda eaque quibusdam architecto iusto! Aspernatur amet animi officiis nam magni? Voluptates, porro?In quam tempora voluptates, nemo eligendi nisi iste! At eum quis corrupti facilis nihil alias. Dicta veritatis asperiores accusantium, iusto animi eveniet odio neque eaque, repellendus qui autem repellat accusamus?
            Minus, accusantium! Tenetur labore molestiae molestias similique ducimus sed autem voluptatum? Enim sed adipisci tempora eligendi facere? Id voluptatibus porro odit maxime eos laudantium? Beatae animi fugit voluptatum laboriosam libero!Nobis natus quisquam ipsa fugiat iure aut quaerat sequi incidunt eos labore voluptates atque magnam esse modi, assumenda eaque quibusdam architecto iusto! Aspernatur amet animi officiis nam magni? Voluptates, porro?In quam tempora voluptates, nemo eligendi nisi iste! At eum quis corrupti facilis nihil alias. Dicta veritatis asperiores accusantium, iusto animi eveniet odio neque eaque, repellendus qui autem repellat accusamus?
            Minus, accusantium! Tenetur labore molestiae molestias similique ducimus sed autem voluptatum? Enim sed adipisci tempora eligendi facere? Id voluptatibus porro odit maxime eos laudantium? Beatae animi fugit voluptatum laboriosam libero!
            <br/><br/>
            Nobis natus quisquam ipsa fugiat iure aut quaerat sequi incidunt eos labore voluptates atque magnam esse modi, assumenda eaque quibusdam architecto iusto! Aspernatur amet animi officiis nam magni? Voluptates, porro?</p>,
            onclick:() => showFaq('crypto')
        },
        {
            className:{
                faq: 'reclamos rounded-lg',
                header: 'header d-flex p-3 bg-white border pointer',
                title: 'title',
                content: 'content d-none bg-color-main p-5 border-left border-right'
            },
            title: 'Como reclamar por un producto no entregado. ?',
            content: <p>In quam tempora voluptates, nemo eligendi nisi iste! At eum quis corrupti facilis nihil alias. Dicta veritatis asperiores accusantium, iusto animi eveniet odio neque eaque, repellendus qui autem repellat accusamus?
            Minus, accusantium! Tenetur labore molestiae molestias similique ducimus sed autem voluptatum? Enim sed adipisci tempora eligendi facere? Id voluptatibus porro odit maxime eos laudantium? Beatae animi fugit voluptatum laboriosam libero!
            <br/><br/>
            Nobis natus quisquam ipsa fugiat iure aut quaerat sequi incidunt eos labore voluptates atque magnam esse modi, assumenda eaque quibusdam architecto iusto! Aspernatur amet animi officiis nam magni? Voluptates, porro?In quam tempora voluptates, nemo eligendi nisi iste! At eum quis corrupti facilis nihil alias. Dicta veritatis asperiores accusantium, iusto animi eveniet odio neque eaque, repellendus qui autem repellat accusamus?
            Minus, accusantium! Tenetur labore molestiae molestias similique ducimus sed autem voluptatum? Enim sed adipisci tempora eligendi facere? Id voluptatibus porro odit maxime eos laudantium? Beatae animi fugit voluptatum laboriosam libero!
            <br/><br/>
            Nobis natus quisquam ipsa fugiat iure aut quaerat sequi incidunt eos labore voluptates atque magnam esse modi, assumenda eaque quibusdam architecto iusto! Aspernatur amet animi officiis nam magni? Voluptates, porro?</p>,
            onclick:() => showFaq('reclamos')
        }
    ]

    return (
        <section
            className='container-fluid about bg-color-main py-5'
            onClick={closeSubMenues}
        >
            <div className="faq col-12 col-md-10 col-lg-8 p-0 mx-auto my-5 shadow-lg">
                {
                    faqs.map( (faq, i) => {
                        return (
                            <div className={faq.className.faq} key={i}>
                                <div
                                    className={faq.className.header}
                                    onClick={faq.onclick}
                                >
                                    <h6 className={faq.className.title}>
                                        {faq.title}
                                    </h6>
                                    <i className="fa fa-chevron-up float-right ml-auto"></i>
                                </div>
                                <div className={faq.className.content}>
                                    {faq.content}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}
