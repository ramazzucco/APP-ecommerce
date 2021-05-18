import React, { useEffect, useState } from "react";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import { datainfocards as datainfo, generaldataproductcard } from "../../datacomponents/home";
import { urlbase } from "../../services/getInfoPage";
import { closeSubMenues } from "../../services";

// Components.
import Infocard from "../Infocard";
import Slidercard from "./Slidercard";
import Loadingdata from '../Loadingdata';

export default function Home(props) {
    const [ cardsPerSlide, setCardsPerSlide ] = useState(0)

    const dataproductpromotions = props.products.promotions;
    const datainfocards = datainfo;
    const productwithdiscount = props.products.allproducts
        ? props.products.allproducts.filter( product => product.discount > 0) : "";

    useEffect(() => {
        props.setPath(window.location.pathname)
        setCardsPerSlide(props.width / 300);
    },[props])

    const datacardproductmorevisited = {
        ...generaldataproductcard,
        cardID: 'morevisited',
        products: props.products.morevisited,
        containercarousel: {
            classname: "morevisited",
            style: { margin: "150px 0" }
        },
        title: {
            classname: "col-12 text-capitalize text-center bg-main-contrast-5 my-5",
            content: "productos mas vistos"
        },
    };

    datacardproductmorevisited.carouselprovider.totalslides = props.products.morevisited ? props.products.morevisited.length : 0;
    datacardproductmorevisited.carouselprovider.visibleslides = cardsPerSlide;

    const datacardproductwithdiscount = {
        ...generaldataproductcard,
        cardID: 'productwithdiscount',
        products: productwithdiscount,
        containercarousel: {
            classname: "productwithdiscount",
            style: { margin: "150px 0" }
        },
        title: {
            classname: "col-12 text-capitalize text-center bg-main-contrast-5 my-5",
            content: "productos con descuento"
        },
    };

    datacardproductwithdiscount.carouselprovider.totalslides = productwithdiscount ? productwithdiscount.length : 0;
    datacardproductwithdiscount.carouselprovider.visibleslides = cardsPerSlide;

    return (
        <section className="home bg-color-main" onClick={closeSubMenues}>

            <CarouselProvider
                className="overflow-hidden mb-5"
                hasMasterSpinner={true}
                isPlaying={true}
                totalSlides={dataproductpromotions ? dataproductpromotions.length : 0}
            >
                <Slider>
                    {
                        dataproductpromotions
                            ? dataproductpromotions.map( (promo, i) => {
                                return (
                                    <Slide index={i} key={i} className="list-unstyled">
                                        <img
                                            src={urlbase + `/images/${promo.image}`}
                                            width={`${props.width}px`}
                                            height={`${props.width < 768 ? '250px' : '500px'}`}
                                            alt=""
                                        />
                                    </Slide>
                                )
                            })
                            : <Loadingdata />
                    }
                </Slider>
                <div
                    className="buttonsSlide w-100 d-flex justify-content-end position-absolute"
                    style={{top: `${props.width < 768 ? '70%' : '80%'}`}}
                >
                    <ButtonBack className="btn ">
                        <i className="fas fa-arrow-circle-left fa-2x text-color-main"></i>
                    </ButtonBack>
                    <ButtonNext className="btn  mx-3">
                        <i className="fas fa-arrow-circle-right fa-2x text-color-main"></i>
                    </ButtonNext>
                </div>
            </CarouselProvider>

            <div className="paymentsmethods d-flex justify-content-around flex-wrap text-center">
                <h2 className="col-12 text-capitalize text-center bg-main-contrast-5 mb-5">
                    nuestros metodos de pago
                </h2>
                <Infocard datainfocards={datainfocards} />
            </div>

            <hr/>

            <Slidercard
                datacard={datacardproductmorevisited}
                items={props.items}
                setItems={props.setItems}
                user={props.user}
            />

            <div className="banner" style={{margin: "100px 0"}}>
                <img
                    className="w-100"
                    style={{minHeight: "200px"}}
                    src={urlbase + "/images/Samsung-S8-banner.jpg"}
                    alt="banner, samsungS8"
                />
            </div>

            <Slidercard
                datacard={datacardproductwithdiscount}
                items={props.items}
                setItems={props.setItems}
                user={props.user}
                favourites={props.favourites}
                setFavourites={props.setFavourites}
            />

            <hr className="mb-0 bg-transparent border-0"/>

        </section>
    );
}
